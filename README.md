# GameShelf

GameShelf é um aplicativo de catálogo de jogos feito com React Native e Expo.

O projeto foi criado para o Trabalho Prático 1 da disciplina de Desenvolvimento de Aplicações para Dispositivos Móveis.

O usuário pode ver jogos, pesquisar pelo nome, abrir detalhes, salvar favoritos e editar o perfil.

## Funcionalidades

- Tela inicial
- Catálogo com oito jogos
- Pesquisa pelo nome
- Detalhes dos jogos
- Lista de favoritos
- Perfil editável
- Navegação entre telas

Os jogos são locais. O projeto não usa API ou banco de dados.

Os favoritos e os dados do perfil ficam salvos apenas enquanto o aplicativo está aberto. Ao reiniciar o aplicativo, eles voltam ao estado inicial.

## Tecnologias

- React Native
- Expo SDK 57
- JavaScript
- React Navigation
- React Context
- StyleSheet
- Flexbox

## Como executar

É necessário ter o Node.js e o Expo Go instalados.

Instale as dependências:

```bash
npm install
```

Inicie o projeto:

```bash
npx expo start --go --clear
```

Abra o Expo Go no celular e leia o QR Code mostrado no terminal.

O computador e o celular devem estar na mesma rede.

## Telas

O aplicativo possui cinco telas:

- `Home`: tela inicial
- `Games`: catálogo e pesquisa
- `Details`: dados do jogo escolhido
- `Favorites`: jogos salvos
- `Profile`: dados do usuário

As rotas estão em `src/navigation/AppNavigator.js`.

## Estrutura do projeto

```text
GameShelf/
├── assets/
├── src/
│   ├── components/
│   │   └── GameCard.js
│   ├── context/
│   │   └── FavoritesContext.js
│   ├── data/
│   │   └── games.js
│   ├── navigation/
│   │   └── AppNavigator.js
│   └── screens/
│       ├── HomeScreen.js
│       ├── GamesScreen.js
│       ├── DetailsScreen.js
│       ├── FavoritesScreen.js
│       └── ProfileScreen.js
├── App.js
├── index.js
└── package.json
```

## Conceitos usados

### Componentes funcionais

Todas as telas e o `GameCard` são componentes funcionais.

### Props

O `GameCard` recebe o jogo e a função do botão por Props. Assim, o mesmo componente pode mostrar jogos diferentes.

### State

O `useState` é usado em três partes:

- texto da pesquisa
- dados do perfil
- lista de favoritos

### Context

O `FavoritesContext` compartilha os favoritos entre Details e Favorites.

### Navegação

O projeto usa React Navigation com Stack Navigation.

Quando o usuário escolhe um jogo, o objeto do jogo é enviado para Details:

```javascript
navigation.navigate('Details', { game });
```

A tela Details recebe o objeto desta forma:

```javascript
const { game } = route.params;
```

### Lista de jogos

Games e Favorites usam `FlatList`. Cada item da lista usa o componente `GameCard`.

### Pesquisa

Games usa `TextInput` e `useState`. A lista mostra apenas os jogos que contêm o texto pesquisado.

### Perfil

O perfil possui dois modos:

- visualização
- edição

No modo de edição, os dados aparecem em campos `TextInput`. O botão salva os valores no State local.

## Componentes do React Native

| Componente | Uso no projeto |
|---|---|
| `View` | Organiza os elementos |
| `Text` | Mostra títulos e informações |
| `Image` | Mostra a logo e as imagens dos jogos |
| `Pressable` | Cria os botões |
| `ScrollView` | Permite rolar Home, Details e Profile |
| `TextInput` | Pesquisa e edição do perfil |
| `FlatList` | Mostra jogos e favoritos |
| `StyleSheet` | Define os estilos |
| Flexbox | Organiza o layout |

## Jogos do catálogo

- Red Dead Redemption 2
- Dark Souls III
- Stardew Valley
- Grand Theft Auto V
- Baldur's Gate 3
- Hogwarts Legacy
- Resident Evil 4
- Minecraft

Cada jogo possui:

- nome
- gênero
- ano
- desenvolvedora
- plataformas
- descrição
- imagem

## Requisitos atendidos

| Requisito | Situação |
|---|---|
| React Native com Expo | Atendido |
| Expo Go | Atendido |
| Componentes funcionais | Atendido |
| Props | Atendido |
| State e useState | Atendido |
| React Context | Atendido |
| View, Text e Image | Atendido |
| Pressable e TextInput | Atendido |
| ScrollView | Atendido |
| StyleSheet e Flexbox | Atendido |
| FlatList | Atendido |
| React Navigation | Atendido |
| Estrutura organizada | Atendido |

## Como testar

1. Abra o aplicativo.
2. Toque em **Pesquisar jogos**.
3. Pesquise um jogo e depois limpe o campo.
4. Toque em **Ver detalhes**.
5. Adicione o jogo aos favoritos.
6. Volte para Home e abra **Favoritos**.
7. Confirme que o jogo aparece na lista.
8. Abra **Perfil**.
9. Toque em **Editar perfil**, altere um campo e salve.

## Verificação do projeto

```bash
npx expo lint
npx tsc --noEmit
npx expo install --check
npx expo export --platform all
```
