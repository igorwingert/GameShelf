```markdown
# GameShelf

O **GameShelf** é uma aplicação mobile desenvolvida em **React Native com Expo** como parte do **Trabalho Prático 1 – Interface Mobile**, da disciplina de **Desenvolvimento de Aplicações para Dispositivos Móveis**.

O objetivo do aplicativo é funcionar como uma biblioteca pessoal de jogos, permitindo que o usuário visualize um catálogo, pesquise jogos, acesse detalhes, adicione títulos aos favoritos e personalize seu perfil.

O projeto foi desenvolvido com foco nos conceitos apresentados em aula, priorizando uma estrutura simples, organizada e adequada para dispositivos móveis.

---

# Sobre o aplicativo

O GameShelf possui as seguintes telas principais:

- **Início**
- **Jogos**
- **Detalhes**
- **Favoritos**
- **Perfil**

O usuário pode navegar entre essas telas, pesquisar jogos pelo nome, consultar informações detalhadas, adicionar ou remover jogos dos favoritos e editar informações do perfil.

Os dados utilizados no catálogo são locais, sem necessidade de API externa ou banco de dados, pois o foco deste trabalho está na construção da interface e na aplicação dos principais conceitos de React Native.

---

# Objetivo do trabalho

O objetivo do Trabalho Prático 1 é desenvolver uma aplicação mobile utilizando **React Native com Expo**, aplicando os principais conceitos trabalhados durante as aulas.

O GameShelf foi desenvolvido buscando atender diretamente a todos os requisitos propostos.

---

# Requisitos do trabalho:

## React Native com Expo

O projeto foi desenvolvido utilizando **React Native com Expo**.

O Expo foi escolhido por facilitar a criação, execução e teste de aplicações React Native durante o desenvolvimento.

A aplicação pode ser executada utilizando:

```bash
npx expo start
```

A partir desse comando, o projeto pode ser aberto diretamente no aplicativo **Expo Go** através do QR Code apresentado no terminal.

---

## Execução no Expo Go

O projeto foi desenvolvido para funcionar corretamente no **Expo Go**.

Durante o desenvolvimento, a aplicação foi testada em dispositivo móvel utilizando o servidor de desenvolvimento do Expo.

Isso permite testar a aplicação em um celular real sem necessidade de gerar um APK durante a fase de desenvolvimento.

---

## Estrutura de projeto organizada

O projeto foi dividido em pastas de acordo com a responsabilidade de cada arquivo.

A principal estrutura utilizada é:

```text
src/
├── components/
├── context/
├── data/
├── navigation/
└── screens/
```

### `components`

Contém componentes reutilizáveis da interface.

Exemplo:

```text
GameCard.js
```

O `GameCard` é utilizado para representar visualmente cada jogo do catálogo.

---

### `context`

Contém o gerenciamento de informações compartilhadas entre diferentes telas.

Exemplo:

```text
FavoritesContext.js
```

Esse contexto é responsável pelo gerenciamento dos jogos favoritos.

---

### `data`

Contém os dados locais utilizados pela aplicação.

Exemplo:

```text
games.js
```

Nesse arquivo estão armazenadas as informações dos jogos exibidos no catálogo.

---

### `navigation`

Contém a configuração da navegação da aplicação.

Exemplo:

```text
AppNavigator.js
```

---

### `screens`

Contém as telas principais do aplicativo.

```text
HomeScreen.js
GamesScreen.js
DetailsScreen.js
FavoritesScreen.js
ProfileScreen.js
```

Essa divisão torna o projeto mais organizado e facilita a manutenção e leitura do código.

---

# Componentes funcionais

Todas as telas e componentes principais do GameShelf foram desenvolvidos utilizando **componentes funcionais**.

Exemplo simplificado:

```javascript
function GameCard() {
  return (
    <View>
      <Text>Jogo</Text>
    </View>
  );
}
```

Os componentes funcionais foram utilizados por serem o padrão atual do React e permitirem a utilização de Hooks como `useState`.

Além disso, a componentização permite dividir a interface em partes menores e reutilizáveis.

---

# Props

As **Props** são utilizadas para passar informações de um componente para outro.

No GameShelf, o componente `GameCard` recebe informações sobre o jogo que será exibido.

Exemplo conceitual:

```javascript
<GameCard
  game={game}
  onPress={handlePress}
/>
```

O componente recebe:

- dados do jogo;
- função executada ao pressionar o botão de detalhes.

Isso permite utilizar o mesmo componente para diferentes jogos sem repetir código.

---

# State

O **State** é utilizado para armazenar informações que podem mudar durante a execução da aplicação.

O GameShelf utiliza `useState` em diferentes situações.

## Pesquisa de jogos

Na tela de jogos, o estado armazena o texto digitado no campo de pesquisa.

```javascript
const [search, setSearch] = useState('');
```

Quando o usuário digita, a lista é filtrada automaticamente.

---

## Perfil

O perfil utiliza estados para armazenar informações editáveis do usuário.

O usuário pode alternar entre o modo de visualização e edição e alterar seus dados.

---

## Favoritos

Os favoritos também são mantidos através de estado, permitindo que a interface seja atualizada imediatamente quando um jogo é adicionado ou removido.

---

# Context API

Além do State local, o projeto utiliza a **Context API do React** para compartilhar a lista de favoritos entre diferentes telas.

Foi criado o arquivo:

```text
FavoritesContext.js
```

O contexto disponibiliza funções como:

- adicionar favorito;
- remover favorito;
- alternar favorito;
- verificar se um jogo está favoritado.

A utilização do Context evita a necessidade de passar essas informações manualmente por várias telas através de Props.

---

# Componentes básicos do React Native

O trabalho solicita a utilização de componentes básicos do React Native.

O GameShelf utiliza os seguintes componentes:

---

## View

O `View` é utilizado como elemento principal de organização da interface.

Ele funciona como um contêiner para outros componentes.

É utilizado em praticamente todas as telas do aplicativo.

---

## Text

O `Text` é utilizado para exibir:

- nomes dos jogos;
- títulos;
- descrições;
- gêneros;
- anos;
- informações do perfil;
- informações do projeto.

---

## Image

O componente `Image` é utilizado para exibir:

- capas e imagens dos jogos;
- elementos visuais da aplicação;
- logo do GameShelf.

As imagens dos jogos estão armazenadas localmente dentro do projeto.

---

## Pressable

O `Pressable` é utilizado para criar elementos interativos.

Exemplos:

- botão para abrir detalhes;
- botão para adicionar aos favoritos;
- botão para editar perfil;
- botões da tela inicial.

Foi escolhido porque permite detectar interações de toque do usuário.

---

## ScrollView

O `ScrollView` é utilizado em telas que podem possuir conteúdo maior que o espaço disponível.

Por exemplo:

- tela de detalhes;
- perfil;
- partes da tela inicial.

Isso permite que o usuário percorra verticalmente o conteúdo quando necessário.

---

# StyleSheet

A estilização da aplicação foi realizada utilizando o `StyleSheet` do React Native.

Exemplo:

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
```

O `StyleSheet` permite separar a estrutura da interface da definição dos estilos e manter o código mais organizado.

---

# Flexbox

O React Native utiliza **Flexbox** como principal sistema de layout.

O GameShelf utiliza propriedades como:

```javascript
flex
flexDirection
justifyContent
alignItems
gap
```

Essas propriedades são utilizadas para organizar:

- textos;
- imagens;
- botões;
- cards;
- informações dos jogos;
- elementos das telas.

O uso de Flexbox permite criar layouts flexíveis e adequados a diferentes tamanhos de tela.

---

# FlatList

A aplicação utiliza `FlatList` para exibir listas de dados.

Ela é utilizada principalmente em:

- catálogo de jogos;
- lista de favoritos.

Exemplo conceitual:

```javascript
<FlatList
  data={games}
  renderItem={({ item }) => (
    <GameCard game={item} />
  )}
  keyExtractor={(item) => item.id}
/>
```

A `FlatList` foi utilizada porque é o componente indicado pelo React Native para renderização eficiente de listas.

Ela permite renderizar os elementos de forma organizada e reutilizar o componente `GameCard`.

---

# Pesquisa de jogos

A tela de jogos possui um campo de pesquisa utilizando `TextInput`.

O texto digitado é armazenado utilizando `useState`.

Os jogos são filtrados através do nome.

Exemplo conceitual:

```javascript
game.name
  .toLowerCase()
  .includes(search.toLowerCase())
```

Dessa forma, a busca funciona independentemente de letras maiúsculas ou minúsculas.

---

# Navegação entre telas

A navegação foi implementada utilizando **React Navigation** com **Native Stack Navigation**.

As principais rotas são:

```text
Home
Games
Details
Favorites
Profile
```

O arquivo responsável pela configuração é:

```text
src/navigation/AppNavigator.js
```

A navegação permite que o usuário transite entre as diferentes telas da aplicação.

---

# Passagem de parâmetros

Quando um jogo é selecionado na lista, seus dados são enviados para a tela de detalhes.

Exemplo:

```javascript
navigation.navigate('Details', {
  game,
});
```

Na tela de detalhes, o objeto é recuperado através de:

```javascript
const { game } = route.params;
```

Isso permite que a mesma tela de detalhes seja utilizada para qualquer jogo do catálogo.

---

# Sistema de favoritos

O usuário pode adicionar e remover jogos dos favoritos através da tela de detalhes.

Os favoritos são compartilhados entre as telas através do `FavoritesContext`.

Na tela de favoritos, os jogos são apresentados utilizando novamente:

- `FlatList`;
- `GameCard`.

Essa reutilização reduz duplicação de código.

Os favoritos são mantidos apenas durante a execução atual do aplicativo.

Não foi implementada persistência permanente nesta versão porque o foco do Trabalho Prático 1 está na construção da interface e nos conceitos básicos trabalhados em aula.

---

# Perfil do usuário

O GameShelf possui uma tela de perfil editável.

O usuário pode visualizar e editar informações como:

- nome;
- nickname;
- plataforma principal;
- gênero de jogo favorito;
- jogo favorito;
- bio.

A edição utiliza:

- `useState`;
- `TextInput`;
- `Pressable`.

O objetivo dessa funcionalidade é demonstrar uma aplicação prática do gerenciamento de estado em uma interface interativa.

---

# 📱 Interface adequada para dispositivos móveis

A interface foi desenvolvida considerando o uso em dispositivos móveis.

Foram utilizados:

- espaçamentos adequados;
- áreas de toque maiores;
- organização vertical;
- imagens responsivas;
- Flexbox;
- listas;
- rolagem;
- hierarquia visual.

O objetivo foi manter a aplicação simples, organizada e fácil de utilizar em telas pequenas.

---

# Jogos disponíveis

O catálogo utiliza dados locais e possui atualmente oito jogos.

Entre eles:

- Red Dead Redemption 2;
- Dark Souls III;
- Stardew Valley;
- Grand Theft Auto V;
- Baldur's Gate 3;
- Hogwarts Legacy;
- Resident Evil 4;
- Minecraft.

Cada jogo possui informações como:

- nome;
- gênero;
- ano;
- desenvolvedora;
- plataformas;
- descrição;
- imagem.

---

# Tecnologias utilizadas

O projeto utiliza principalmente:

- React Native
- Expo
- JavaScript
- React Navigation
- React Context API
- StyleSheet
- Flexbox

---

# Como executar

Primeiramente, é necessário possuir o **Node.js** instalado.

Clone o repositório:

```bash
git clone https://github.com/igorwingert/GameShelf.git
```

Entre na pasta do projeto:

```bash
cd GameShelf
```

Instale as dependências:

```bash
npm install
```

Inicie o Expo:

```bash
npx expo start
```

Depois disso, utilize o aplicativo **Expo Go** no celular para escanear o QR Code apresentado no terminal.

O computador e o celular devem estar conectados à mesma rede para facilitar a comunicação durante o desenvolvimento.

---

# Estrutura resumida

```text
GameShelf/
│
├── assets/
│
├── src/
│   ├── components/
│   │   └── GameCard.js
│   │
│   ├── context/
│   │   └── FavoritesContext.js
│   │
│   ├── data/
│   │   └── games.js
│   │
│   ├── navigation/
│   │   └── AppNavigator.js
│   │
│   └── screens/
│       ├── HomeScreen.js
│       ├── GamesScreen.js
│       ├── DetailsScreen.js
│       ├── FavoritesScreen.js
│       └── ProfileScreen.js
│
├── App.js
├── index.js
├── package.json
└── README.md
```

---

# Relação entre os requisitos e o projeto

| Requisito | Implementação no GameShelf |
|---|---|
| React Native com Expo | Aplicação criada e executada através do Expo |
| Expo Go | Testes realizados em dispositivo móvel |
| Estrutura organizada | Separação em `components`, `context`, `data`, `navigation` e `screens` |
| Componentes funcionais | Todas as telas e componentes principais |
| Props | Dados enviados para `GameCard` |
| State | Pesquisa, perfil e favoritos |
| View | Organização das interfaces |
| Text | Exibição das informações |
| Image | Capas dos jogos e elementos visuais |
| Pressable | Botões e elementos interativos |
| ScrollView | Details, Profile e conteúdos maiores |
| StyleSheet | Estilização das telas |
| Flexbox | Organização dos layouts |
| FlatList | Catálogo de jogos e favoritos |
| React Navigation | Navegação entre as cinco telas |
| Interface mobile | Layout adaptado para dispositivos móveis |

---

# Conclusão

O desenvolvimento do GameShelf permitiu aplicar na prática os principais conceitos abordados durante as aulas de Desenvolvimento de Aplicações para Dispositivos Móveis.

Durante o projeto foram utilizados conceitos como:

- componentização;
- Props;
- State;
- Hooks;
- Context API;
- navegação;
- listas;
- estilização;
- Flexbox;
- organização de projeto.

O resultado é uma aplicação mobile simples e funcional, capaz de demonstrar os conceitos fundamentais de desenvolvimento com React Native e Expo solicitados no Trabalho Prático 1.
```

Eu gostei bastante dessa abordagem para o seu caso porque o README deixa de ser só “como instalar” e vira também uma **evidência de atendimento ao enunciado**.

Uma coisa que eu mudaria depois, quando o Codex terminar a repaginação, é só atualizar os trechos que descrevem o visual caso ele mude bastante. O conteúdo técnico principal continuará válido.