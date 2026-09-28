/**
 * @typedef {Object} Game
 * @property {string} id
 * @property {string} name
 * @property {string} genre
 * @property {number} year
 * @property {string} developer
 * @property {string[]} platforms
 * @property {string} description
 * @property {import('react-native').ImageSourcePropType} image
 */

// O ano corresponde ao lançamento original da edição descrita.
// As plataformas listam as principais versões, sem incluir serviços de nuvem.
// Os requires estáticos incluem as imagens no app para uso offline.
/** @type {Game[]} */
const games = [
  {
    id: 'red-dead-redemption-2',
    name: 'Red Dead Redemption 2',
    genre: 'Ação e aventura',
    year: 2018,
    developer: 'Rockstar Games',
    platforms: ['PC', 'PlayStation 4', 'Xbox One'],
    description:
      'Explore o Velho Oeste como Arthur Morgan, um fora da lei dividido entre a lealdade à sua gangue e as mudanças de um mundo em transformação.',
    image: require('../../assets/images/games/red-dead-redemption-2.jpg'),
  },
  {
    id: 'dark-souls-iii',
    name: 'Dark Souls III',
    genre: 'RPG de ação',
    year: 2016,
    developer: 'FromSoftware',
    platforms: ['PC', 'PlayStation 4', 'Xbox One'],
    description:
      'Atravesse o reino em ruínas de Lothric, descubra caminhos interligados e enfrente inimigos desafiadores em uma jornada de fantasia sombria.',
    image: require('../../assets/images/games/dark-souls-iii.jpg'),
  },
  {
    id: 'stardew-valley',
    name: 'Stardew Valley',
    genre: 'Simulação e RPG',
    year: 2016,
    developer: 'ConcernedApe',
    platforms: ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch', 'Android', 'iOS'],
    description:
      'Transforme uma fazenda herdada em um novo lar. Cultive alimentos, cuide de animais, explore minas e faça amizades com os moradores da vila.',
    image: require('../../assets/images/games/stardew-valley.jpg'),
  },
  {
    id: 'grand-theft-auto-v',
    name: 'Grand Theft Auto V',
    genre: 'Ação e aventura',
    year: 2013,
    developer: 'Rockstar North',
    platforms: [
      'PC',
      'PlayStation 3',
      'PlayStation 4',
      'PlayStation 5',
      'Xbox 360',
      'Xbox One',
      'Xbox Series X|S',
    ],
    description:
      'Acompanhe Michael, Franklin e Trevor em histórias que se cruzam em Los Santos. Explore a cidade e participe de missões e grandes assaltos.',
    image: require('../../assets/images/games/grand-theft-auto-v.jpg'),
  },
  {
    id: 'baldurs-gate-3',
    name: "Baldur's Gate 3",
    genre: 'RPG',
    year: 2023,
    developer: 'Larian Studios',
    platforms: ['PC', 'macOS', 'PlayStation 5', 'Xbox Series X|S'],
    description:
      'Reúna um grupo de aventureiros em uma história inspirada em Dungeons & Dragons. Suas escolhas e estratégias em combates por turnos moldam a jornada.',
    image: require('../../assets/images/games/baldurs-gate-3.jpg'),
  },
  {
    id: 'hogwarts-legacy',
    name: 'Hogwarts Legacy',
    genre: 'RPG de ação',
    year: 2023,
    developer: 'Avalanche Software',
    platforms: ['PC', 'PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox Series X|S', 'Nintendo Switch'],
    description:
      'Viva como estudante de Hogwarts no século XIX. Aprenda feitiços, explore o castelo e seus arredores e investigue os mistérios de uma magia antiga.',
    image: require('../../assets/images/games/hogwarts-legacy.jpg'),
  },
  {
    id: 'resident-evil-4',
    name: 'Resident Evil 4',
    genre: 'Terror e sobrevivência',
    year: 2023,
    developer: 'Capcom',
    platforms: ['PC', 'PlayStation 4', 'PlayStation 5', 'Xbox Series X|S', 'macOS', 'iOS'],
    description:
      'No remake de 2023, Leon S. Kennedy procura a filha do presidente em uma vila isolada. Gerencie recursos e enfrente ameaças em uma missão de resgate.',
    image: require('../../assets/images/games/resident-evil-4.jpg'),
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    genre: 'Sandbox e sobrevivência',
    year: 2011,
    developer: 'Mojang Studios',
    platforms: ['PC', 'PlayStation 4', 'PlayStation 5', 'Xbox One', 'Nintendo Switch', 'Android', 'iOS'],
    description:
      'Explore mundos feitos de blocos, colete recursos e construa livremente. Escolha entre os desafios do modo Sobrevivência e a liberdade do modo Criativo.',
    image: require('../../assets/images/games/minecraft.jpg'),
  },
];

export default games;
