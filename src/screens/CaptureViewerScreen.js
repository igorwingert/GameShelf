import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import games from '../data/games';
import { deleteCapture, getCaptureById, updateCaptureCaption } from '../database/database';
import { deleteImageFile } from '../services/imageService';

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function CaptureViewerScreen({ route, navigation }) {
  const { captureId } = route.params;
  const insets = useSafeAreaInsets();
  const [capture, setCapture] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const [isEditing, setIsEditing] = useState(false);
  const [caption, setCaption] = useState('');

  useEffect(() => {
    getCaptureById(captureId).then((row) => {
      setCapture(row);
      setCaption(row?.legenda ?? '');
      if (row) {
        Image.getSize(row.uri, (width, height) => setAspectRatio(width / height));
      }
    });
  }, [captureId]);

  if (!capture) {
    return (
      <View style={[styles.screen, styles.center]}>
        <ActivityIndicator color="#A78BFA" />
      </View>
    );
  }

  const game = games.find((item) => item.id === capture.game_id);

  async function handleSaveCaption() {
    await updateCaptureCaption(capture.id, caption.trim());
    setCapture({ ...capture, legenda: caption.trim() });
    setIsEditing(false);
  }

  function handleDelete() {
    Alert.alert('Excluir captura', 'Essa foto será apagada do aparelho. Continuar?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await deleteCapture(capture.id);
          deleteImageFile(capture.uri);
          navigation.goBack();
        },
      },
    ]);
  }

  return (
    <ScrollView
      style={styles.screen}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[
        styles.container,
        {
          paddingBottom: insets.bottom + 20,
          paddingLeft: insets.left + 16,
          paddingRight: insets.right + 16,
        },
      ]}>
      <View style={styles.content}>
        <Image source={{ uri: capture.uri }} style={[styles.image, { aspectRatio }]} />

        <View style={styles.meta}>
          <Text style={styles.gameName}>{game?.name ?? 'Jogo'}</Text>
          <Text style={styles.date}>{formatDate(capture.criado_em)}</Text>
        </View>

        {isEditing ? (
          <View style={styles.editBox}>
            <TextInput
              accessibilityLabel="Legenda da captura"
              value={caption}
              onChangeText={setCaption}
              placeholder="Escreva uma legenda"
              placeholderTextColor="#778197"
              maxLength={120}
              autoFocus
              style={styles.input}
            />
            <Pressable
              accessibilityRole="button"
              onPress={handleSaveCaption}
              style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
              <Text style={styles.primaryButtonText}>Salvar legenda</Text>
            </Pressable>
          </View>
        ) : (
          <Text style={[styles.caption, !capture.legenda && styles.captionEmpty]}>
            {capture.legenda || 'Sem legenda'}
          </Text>
        )}

        <View style={styles.actions}>
          {!isEditing && (
            <Pressable
              accessibilityRole="button"
              onPress={() => setIsEditing(true)}
              style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
              <Text style={styles.secondaryButtonText}>Editar legenda</Text>
            </Pressable>
          )}
          <Pressable
            accessibilityRole="button"
            onPress={handleDelete}
            style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
            <Text style={styles.deleteText}>Excluir</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0B0D12',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    paddingTop: 12,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 480,
    gap: 16,
  },
  image: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#1D2330',
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gameName: {
    color: '#9C7CF7',
    fontSize: 15,
    fontWeight: '600',
  },
  date: {
    color: '#858D9B',
    fontSize: 14,
  },
  caption: {
    color: '#F2F3F5',
    fontSize: 18,
    lineHeight: 26,
  },
  captionEmpty: {
    color: '#858D9B',
    fontStyle: 'italic',
  },
  editBox: {
    gap: 10,
  },
  input: {
    minHeight: 52,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#303640',
    backgroundColor: '#151922',
    color: '#F2F3F5',
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#8B5CF6',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    flex: 1,
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#303640',
  },
  secondaryButtonText: {
    color: '#BFAAFF',
    fontSize: 15,
    fontWeight: '600',
  },
  deleteText: {
    color: '#F28B82',
    fontSize: 15,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.75,
  },
});
