# GameShelf

GameShelf é um catálogo acadêmico de jogos desenvolvido com React Native e Expo SDK 57. O aplicativo permite consultar oito jogos locais, pesquisar pelo nome, abrir seus detalhes, gerenciar favoritos em memória e editar um perfil local.

## Executar no Expo Go

```bash
npm install
npx expo start --go --clear
```

Abra o QR code no Expo Go compatível com o SDK 57. O computador e o celular devem estar na mesma rede local.

## Funcionalidades

- tela inicial com acesso às principais áreas;
- catálogo local renderizado com `FlatList`;
- pesquisa de jogos pelo nome;
- detalhes completos do jogo em `ScrollView`;
- favoritos compartilhados com React Context;
- perfil local com modos de visualização e edição;
- navegação Stack com React Navigation.

Os favoritos e os dados editados do perfil ficam apenas na memória. Eles voltam aos valores iniciais quando o aplicativo é reiniciado.

## Navegação

A entrada do aplicativo segue o fluxo `index.js` → `App.js` → `src/navigation/AppNavigator.js`.

O `AppNavigator.js` declara cinco rotas com `createNativeStackNavigator`:

- `Home`: início do aplicativo;
- `Games`: catálogo e pesquisa;
- `Details`: informações do jogo selecionado;
- `Favorites`: jogos salvos;
- `Profile`: perfil editável do usuário.

## Estrutura

```text
App.js
index.js
src/
  components/
    GameCard.js
  context/
    FavoritesContext.js
  data/
    games.js
  navigation/
    AppNavigator.js
  screens/
    HomeScreen.js
    GamesScreen.js
    DetailsScreen.js
    FavoritesScreen.js
    ProfileScreen.js
```

## Verificação

```bash
npx expo lint
npx tsc --noEmit
npx expo install --check
npx expo export --platform all
```

## Teste manual

1. Abra o app e entre em **Explorar jogos**.
2. Pesquise um jogo pelo nome e limpe a busca.
3. Abra os detalhes de um jogo e adicione-o aos favoritos.
4. Volte à Home e confirme o jogo em **Meus favoritos**.
5. Abra novamente os detalhes e remova o favorito.
6. Entre em **Perfil**, edite os campos e salve as alterações.
7. Verifique o retorno pelo cabeçalho e, no Android, pelo botão ou gesto do sistema.
