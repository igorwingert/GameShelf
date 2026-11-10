import { useEffect, useState } from 'react';
import { ActivityIndicator, Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { getGamePrices } from '../services/api';

function formatUSD(value) {
  return `US$ ${value.toFixed(2)}`;
}

/**
 * Mostra os preços atuais do jogo em lojas de PC, buscados na API da CheapShark com Axios.
 * @param {{ game: import('../data/games').Game }} props
 */
export default function PriceSection({ game }) {
  const [prices, setPrices] = useState(null);
  const [status, setStatus] = useState(game.steamAppId ? 'loading' : 'unavailable');
  const [attempt, setAttempt] = useState(0);

  // Busca os preços ao abrir a tela (e de novo quando o usuário toca em "Tentar novamente").
  useEffect(() => {
    if (!game.steamAppId) {
      return;
    }

    let isActive = true;

    getGamePrices(game.steamAppId)
      .then((result) => {
        if (isActive) {
          setPrices(result);
          setStatus(result && result.offers.length > 0 ? 'success' : 'unavailable');
        }
      })
      .catch((error) => {
        console.warn('Erro ao buscar preços:', error.message);
        if (isActive) {
          setStatus('error');
        }
      });

    return () => {
      isActive = false;
    };
  }, [game.steamAppId, attempt]);

  function handleRetry() {
    setStatus('loading');
    setAttempt((current) => current + 1);
  }

  return (
    <View style={styles.section}>
      <Text accessibilityRole="header" style={styles.sectionTitle}>
        Preços no PC
      </Text>

      {status === 'loading' && (
        <View style={styles.row}>
          <ActivityIndicator color="#A78BFA" />
          <Text style={styles.muted}>Buscando ofertas...</Text>
        </View>
      )}

      {status === 'unavailable' && (
        <Text style={styles.muted}>Nenhuma oferta encontrada para este jogo nas lojas de PC.</Text>
      )}

      {status === 'error' && (
        <View style={styles.errorBox}>
          <Text style={styles.muted}>
            Não foi possível carregar os preços. Verifique sua conexão.
          </Text>
          <Pressable accessibilityRole="button" onPress={handleRetry} hitSlop={8}>
            <Text style={styles.link}>Tentar novamente</Text>
          </Pressable>
        </View>
      )}

      {status === 'success' && prices && (
        <>
          <View style={styles.bestOffer}>
            <Text style={styles.label}>Menor preço agora</Text>
            <View style={styles.priceRow}>
              <Text style={styles.bestPrice}>{formatUSD(prices.offers[0].price)}</Text>
              {prices.offers[0].savings > 0 && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>-{prices.offers[0].savings}%</Text>
                </View>
              )}
            </View>
            <Text style={styles.muted}>na {prices.offers[0].store}</Text>
            {prices.lowestEver && (
              <Text style={styles.history}>
                Menor preço histórico: {formatUSD(prices.lowestEver.price)} em{' '}
                {prices.lowestEver.date.toLocaleDateString('pt-BR')}
              </Text>
            )}
          </View>

          {prices.offers.slice(0, 4).map((offer) => (
            <Pressable
              key={offer.dealId}
              accessibilityRole="link"
              accessibilityLabel={`Abrir oferta da ${offer.store}`}
              onPress={() => Linking.openURL(offer.url)}
              style={({ pressed }) => [styles.offer, pressed && styles.pressed]}>
              <Text style={styles.offerStore}>{offer.store}</Text>
              <View style={styles.offerPrices}>
                {offer.savings > 0 && (
                  <Text style={styles.retailPrice}>{formatUSD(offer.retailPrice)}</Text>
                )}
                <Text style={styles.offerPrice}>{formatUSD(offer.price)}</Text>
              </View>
            </Pressable>
          ))}

          <Text style={styles.source}>Dados: CheapShark API · valores em dólar</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: '#252A33',
  },
  sectionTitle: {
    color: '#F2F3F5',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  muted: {
    color: '#858D9B',
    fontSize: 15,
    lineHeight: 22,
  },
  errorBox: {
    gap: 8,
  },
  link: {
    color: '#A78BFA',
    fontSize: 15,
    fontWeight: '600',
  },
  bestOffer: {
    gap: 4,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#151922',
  },
  label: {
    color: '#858D9B',
    fontSize: 14,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bestPrice: {
    color: '#4ADE80',
    fontSize: 28,
    fontWeight: '800',
  },
  discountBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: '#14532D',
  },
  discountText: {
    color: '#86EFAC',
    fontSize: 14,
    fontWeight: '700',
  },
  history: {
    marginTop: 6,
    color: '#A3AAB8',
    fontSize: 13,
  },
  offer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#252A33',
  },
  pressed: {
    opacity: 0.7,
  },
  offerStore: {
    color: '#F2F3F5',
    fontSize: 15,
    fontWeight: '600',
  },
  offerPrices: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  retailPrice: {
    color: '#6B7280',
    fontSize: 13,
    textDecorationLine: 'line-through',
  },
  offerPrice: {
    color: '#F2F3F5',
    fontSize: 15,
    fontWeight: '700',
  },
  source: {
    color: '#6B7280',
    fontSize: 12,
    textAlign: 'center',
  },
});
