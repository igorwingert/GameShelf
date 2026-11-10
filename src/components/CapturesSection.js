import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { getCaptures } from '../database/database';
import { startCaptureFlow } from '../services/captureFlow';

/**
 * Prévia das capturas do jogo na tela de detalhes (últimas fotos + botão de adicionar).
 * @param {{ game: import('../data/games').Game, navigation: any }} props
 */
export default function CapturesSection({ game, navigation }) {
  const [captures, setCaptures] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      getCaptures(game.id).then((rows) => {
        if (isActive) {
          setCaptures(rows);
        }
      });
      return () => {
        isActive = false;
      };
    }, [game.id])
  );

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text accessibilityRole="header" style={styles.sectionTitle}>
          Minhas capturas
        </Text>
        {captures.length > 0 && (
          <Pressable
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => navigation.navigate('Captures', { gameId: game.id })}>
            <Text style={styles.link}>Ver todas ({captures.length})</Text>
          </Pressable>
        )}
      </View>

      {captures.length === 0 ? (
        <Text style={styles.empty}>
          Registre momentos da sua jogatina: tire uma foto da tela ou escolha um print da galeria.
        </Text>
      ) : (
        <FlatList
          horizontal
          data={captures.slice(0, 6)}
          keyExtractor={(item) => String(item.id)}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              accessibilityRole="imagebutton"
              accessibilityLabel={item.legenda || 'Captura'}
              onPress={() => navigation.navigate('CaptureViewer', { captureId: item.id })}>
              <Image source={{ uri: item.uri }} style={styles.thumbnail} />
            </Pressable>
          )}
        />
      )}

      <Pressable
        accessibilityRole="button"
        onPress={() => startCaptureFlow(navigation, game)}
        style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}>
        <Text style={styles.addButtonText}>+ Adicionar captura</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 14,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: '#252A33',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#F2F3F5',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
  },
  link: {
    color: '#A78BFA',
    fontSize: 14,
    fontWeight: '600',
  },
  empty: {
    color: '#858D9B',
    fontSize: 15,
    lineHeight: 22,
  },
  list: {
    gap: 10,
  },
  thumbnail: {
    width: 140,
    height: 90,
    borderRadius: 8,
    backgroundColor: '#1D2330',
  },
  addButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#4B5263',
  },
  pressed: {
    opacity: 0.75,
  },
  addButtonText: {
    color: '#A3AAB8',
    fontSize: 16,
    fontWeight: '600',
  },
});
