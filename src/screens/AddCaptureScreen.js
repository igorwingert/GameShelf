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
import { addCapture } from '../database/database';
import { processImage, saveImageToAppFolder } from '../services/imageService';

export default function AddCaptureScreen({ route, navigation }) {
  const { gameId, image, defaultCaption = '' } = route.params;
  const game = games.find((item) => item.id === gameId);
  const insets = useSafeAreaInsets();

  const [rotation, setRotation] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [preview, setPreview] = useState(null);
  // Última imagem já carregada na tela: fica visível enquanto a nova versão carrega (evita piscar).
  const [shownUri, setShownUri] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [caption, setCaption] = useState(defaultCaption);

  // Toda vez que o usuário gira ou espelha, reprocessa a imagem original
  // com o expo-image-manipulator (redimensiona, gira, espelha e comprime).
  useEffect(() => {
    let isActive = true;

    processImage(image, { rotation, flipped })
      .then((result) => {
        if (isActive) {
          setPreview(result);
        }
      })
      .catch(() => {
        if (isActive) {
          Alert.alert('Erro', 'Não foi possível processar a imagem.');
        }
      })
      .finally(() => {
        if (isActive) {
          setIsProcessing(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [image, rotation, flipped]);

  function rotate(degrees) {
    setIsProcessing(true);
    setRotation((current) => (current + degrees + 360) % 360);
  }

  function toggleFlip() {
    setIsProcessing(true);
    setFlipped((current) => !current);
  }

  async function handleSave() {
    if (!preview) {
      return;
    }

    setIsSaving(true);
    try {
      const savedUri = await saveImageToAppFolder(preview.uri, 'capturas');
      await addCapture({ gameId, uri: savedUri, legenda: caption.trim() });
      navigation.goBack();
    } catch (error) {
      console.warn(error);
      Alert.alert('Erro', 'Não foi possível salvar a captura.');
      setIsSaving(false);
    }
  }

  const aspectRatio = preview ? preview.width / preview.height : 16 / 9;

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
        {game && <Text style={styles.gameName}>{game.name}</Text>}

        <View style={[styles.previewBox, { aspectRatio }]}>
          {shownUri && <Image source={{ uri: shownUri }} style={styles.preview} fadeDuration={0} />}
          {preview && (
            <Image
              key={preview.uri}
              source={{ uri: preview.uri }}
              style={[styles.preview, styles.previewTop]}
              fadeDuration={0}
              onLoad={() => setShownUri(preview.uri)}
            />
          )}
          {(isProcessing || (preview && preview.uri !== shownUri)) && (
            <View style={styles.processing}>
              <ActivityIndicator color="#A78BFA" size="large" />
            </View>
          )}
        </View>

        <View style={styles.tools}>
          <ToolButton label="↺ Girar" onPress={() => rotate(-90)} disabled={isProcessing} />
          <ToolButton label="↻ Girar" onPress={() => rotate(90)} disabled={isProcessing} />
          <ToolButton
            label="⇋ Espelhar"
            onPress={toggleFlip}
            disabled={isProcessing}
          />
        </View>

        {preview && (
          <Text style={styles.info}>
            {preview.width} × {preview.height}px · JPEG comprimido
          </Text>
        )}

        <View style={styles.field}>
          <Text style={styles.label}>Legenda</Text>
          <TextInput
            accessibilityLabel="Legenda da captura"
            value={caption}
            onChangeText={setCaption}
            placeholder="Ex.: Derrotei o chefe final!"
            placeholderTextColor="#778197"
            maxLength={120}
            style={styles.input}
          />
        </View>

        <Pressable
          accessibilityRole="button"
          disabled={isProcessing || isSaving}
          onPress={handleSave}
          style={({ pressed }) => [
            styles.saveButton,
            (pressed || isProcessing || isSaving) && styles.pressed,
          ]}>
          {isSaving ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.saveButtonText}>Salvar captura</Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
}

function ToolButton({ label, onPress, disabled }) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.toolButton, (pressed || disabled) && styles.pressed]}>
      <Text style={styles.toolButtonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0B0D12',
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
  gameName: {
    color: '#9C7CF7',
    fontSize: 15,
    fontWeight: '600',
  },
  previewBox: {
    width: '100%',
    maxHeight: 420,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#1D2330',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewTop: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  preview: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  processing: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(11, 13, 18, 0.5)',
  },
  tools: {
    flexDirection: 'row',
    gap: 10,
  },
  toolButton: {
    flex: 1,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#1D2330',
  },
  toolButtonText: {
    color: '#F2F3F5',
    fontSize: 15,
    fontWeight: '600',
  },
  info: {
    color: '#858D9B',
    fontSize: 13,
    textAlign: 'center',
  },
  field: {
    gap: 8,
  },
  label: {
    color: '#858D9B',
    fontSize: 14,
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
  saveButton: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#8B5CF6',
  },
  pressed: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
