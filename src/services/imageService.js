import { Directory, File, Paths } from 'expo-file-system';
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

const MAX_IMAGE_WIDTH = 1280;

/**
 * Abre a câmera ou a galeria e retorna a imagem escolhida ({ uri, width, height })
 * ou null se o usuário cancelar ou negar a permissão.
 * @param {'camera' | 'library'} source
 * @param {{ allowsEditing?: boolean, aspect?: [number, number] }} [options]
 */
export async function pickImage(source, options = {}) {
  const permission =
    source === 'camera'
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    Alert.alert(
      'Permissão necessária',
      source === 'camera'
        ? 'Permita o acesso à câmera nas configurações do aparelho para tirar fotos.'
        : 'Permita o acesso à galeria nas configurações do aparelho para escolher imagens.'
    );
    return null;
  }

  const pickerOptions = {
    mediaTypes: ['images'],
    allowsEditing: options.allowsEditing ?? false,
    aspect: options.aspect,
    quality: 1,
  };

  const result =
    source === 'camera'
      ? await ImagePicker.launchCameraAsync(pickerOptions)
      : await ImagePicker.launchImageLibraryAsync(pickerOptions);

  if (result.canceled || !result.assets?.length) {
    return null;
  }

  const { uri, width, height } = result.assets[0];
  return { uri, width, height };
}

/**
 * Aplica as manipulações na imagem original: redimensiona (se for maior que o limite),
 * gira, espelha e comprime em JPEG. Sempre parte da imagem original para não perder
 * qualidade a cada ajuste. Retorna a nova imagem ({ uri, width, height }) em cache.
 * @param {{ uri: string, width: number }} image
 * @param {{ rotation?: number, flipped?: boolean, maxWidth?: number }} [edits]
 */
export async function processImage(image, edits = {}) {
  const maxWidth = edits.maxWidth ?? MAX_IMAGE_WIDTH;
  const context = ImageManipulator.manipulate(image.uri);

  if (image.width > maxWidth) {
    context.resize({ width: maxWidth });
  }

  if (edits.rotation) {
    context.rotate(edits.rotation);
  }

  if (edits.flipped) {
    context.flip('horizontal');
  }

  const rendered = await context.renderAsync();
  const result = await rendered.saveAsync({ compress: 0.7, format: SaveFormat.JPEG });

  return { uri: result.uri, width: result.width, height: result.height };
}

/**
 * Copia a imagem para uma pasta permanente do app (o cache pode ser limpo pelo sistema)
 * e retorna o novo caminho, que é o que guardamos no banco/AsyncStorage.
 * @param {string} uri
 * @param {string} folderName
 */
export async function saveImageToAppFolder(uri, folderName) {
  const folder = new Directory(Paths.document, folderName);
  folder.create({ intermediates: true, idempotent: true });

  const destination = new File(folder, `${Date.now()}.jpg`);
  await new File(uri).copy(destination);

  return destination.uri;
}

// Remove do aparelho uma imagem salva pelo app (ignora se ela já não existir).
export function deleteImageFile(uri) {
  if (!uri) {
    return;
  }

  try {
    const file = new File(uri);
    if (file.exists) {
      file.delete();
    }
  } catch (error) {
    console.warn('Não foi possível apagar a imagem:', error);
  }
}

// Mostra as opções "Câmera" e "Galeria" e chama onSelect com a escolha.
// (No Android o Alert aceita no máximo 3 botões.)
export function askImageSource(onSelect) {
  Alert.alert('Adicionar imagem', 'De onde você quer pegar a imagem?', [
    { text: 'Cancelar', style: 'cancel' },
    { text: 'Galeria', onPress: () => onSelect('library') },
    { text: 'Câmera', onPress: () => onSelect('camera') },
  ]);
}
