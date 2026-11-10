import axios from 'axios';

// Cliente Axios configurado para a API pública da CheapShark
// (comparador de preços de jogos de PC; não precisa de chave).
// Documentação: https://apidocs.cheapshark.com/
// eslint-disable-next-line import/no-named-as-default-member
const api = axios.create({
  baseURL: 'https://www.cheapshark.com/api/1.0',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    // A CheapShark recusa requisições sem identificação (o padrão do Android é "okhttp").
    'User-Agent': 'GameShelf/1.0 (projeto academico UTFPR)',
  },
});

// Mostra no terminal qual requisição falhou e o que a API respondeu (ajuda a depurar).
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn(
      `[API] ${error.config?.url} → ${error.response?.status ?? error.message}`,
      error.response?.data
    );
    return Promise.reject(error);
  }
);

let storesCache = null;

// Lista de lojas (Steam, GOG, Epic...) para mostrar o nome de cada oferta.
// Se essa chamada falhar, as ofertas aparecem com "Loja <id>" em vez de quebrar a tela.
async function getStores() {
  if (!storesCache) {
    try {
      const response = await api.get('/stores');
      storesCache = {};
      response.data.forEach((store) => {
        storesCache[store.storeID] = store.storeName;
      });
    } catch {
      return {};
    }
  }
  return storesCache;
}

/**
 * Busca as ofertas atuais de um jogo pelo id da Steam.
 * Retorna null se o jogo não for encontrado na CheapShark.
 * @param {string} steamAppId
 */
export async function getGamePrices(steamAppId) {
  // 1) Descobre o id do jogo na CheapShark a partir do id da Steam.
  const searchResponse = await api.get('/games', { params: { steamAppID: steamAppId } });
  const found = searchResponse.data[0];

  if (!found) {
    return null;
  }

  // 2) Busca os detalhes (todas as ofertas + menor preço histórico) e as lojas.
  const [detailsResponse, stores] = await Promise.all([
    api.get('/games', { params: { id: found.gameID } }),
    getStores(),
  ]);

  const { deals, cheapestPriceEver } = detailsResponse.data;

  // 3) Converte o JSON da API para o formato usado na tela.
  const offers = deals
    .map((deal) => ({
      dealId: deal.dealID,
      store: stores[deal.storeID] ?? `Loja ${deal.storeID}`,
      price: Number(deal.price),
      retailPrice: Number(deal.retailPrice),
      savings: Math.round(Number(deal.savings)),
      url: `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`,
    }))
    .sort((a, b) => a.price - b.price);

  return {
    offers,
    lowestEver: cheapestPriceEver
      ? {
          price: Number(cheapestPriceEver.price),
          date: new Date(cheapestPriceEver.date * 1000),
        }
      : null,
  };
}
