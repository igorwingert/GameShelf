import { askImageSource, pickImage } from './imageService';

/**
 * Fluxo para registrar uma nova captura de um jogo:
 * pergunta Câmera/Galeria, abre o seletor e leva para a tela de edição.
 * @param {any} navigation
 * @param {import('../data/games').Game} game
 * @param {string} [defaultCaption]
 */
export function startCaptureFlow(navigation, game, defaultCaption = '') {
  askImageSource(async (source) => {
    const image = await pickImage(source);
    if (image) {
      navigation.navigate('AddCapture', { gameId: game.id, image, defaultCaption });
    }
  });
}
