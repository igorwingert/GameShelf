import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import games from '../data/games';
import { getAllCaptures, getCaptures } from '../database/database';
import { startCaptureFlow } from '../services/captureFlow';

function findGame(gameId) {
  return games.find((game) => game.id === gameId);
}

// Galeria de capturas: de um jogo (quando recebe gameId) ou de todos os jogos.
export default function CapturesScreen({ route, navigation }) {
  const gameId = route.params?.gameId;
  const game = gameId ? findGame(gameId) : null;
  const insets = useSafeAreaInsets();
  const [captures, setCaptures] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const query = gameId ? getCaptures(gameId) : getAllCaptures();
      query.then((rows) => {
        if (isActive) {
          setCaptures(rows);
        }
      });
      return () => {
        isActive = false;
      };
    }, [gameId])
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={captures}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={[
          styles.list,
          {
            paddingBottom: insets.bottom + 20,
            paddingLeft: insets.left + 16,
            paddingRight: insets.right + 16,
          },
        ]}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>{game ? game.name : 'Todas as capturas'}</Text>
            <Text style={styles.subtitle}>
              {captures.length} {captures.length === 1 ? 'captura' : 'capturas'}
            </Text>
            {game && (
              <Pressable
                accessibilityRole="button"
                onPress={() => startCaptureFlow(navigation, game)}
                style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}>
                <Text style={styles.addButtonText}>+ Adicionar captura</Text>
              </Pressable>
            )}
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>
            {game
              ? 'Nenhuma captura deste jogo ainda.'
              : 'Nenhuma captura ainda. Abra os detalhes de um jogo para registrar a primeira.'}
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="imagebutton"
            accessibilityLabel={item.legenda || 'Captura'}
            onPress={() => navigation.navigate('CaptureViewer', { captureId: item.id })}
            style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            {!game && (
              <Text style={styles.itemGame} numberOfLines={1}>
                {findGame(item.game_id)?.name ?? 'Jogo'}
              </Text>
            )}
            {item.legenda ? (
              <Text style={styles.caption} numberOfLines={2}>
                {item.legenda}
              </Text>
            ) : null}
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0B0D12',
  },
  list: {
    paddingTop: 12,
    gap: 12,
  },
  row: {
    gap: 12,
  },
  header: {
    gap: 6,
    marginBottom: 4,
  },
  title: {
    color: '#F2F3F5',
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    color: '#858D9B',
    fontSize: 14,
  },
  addButton: {
    marginTop: 8,
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#8B5CF6',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  empty: {
    color: '#858D9B',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 24,
  },
  item: {
    flex: 1,
    maxWidth: '50%',
    gap: 6,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 10,
    borderRadius: 8,
    backgroundColor: '#1D2330',
  },
  itemGame: {
    color: '#9C7CF7',
    fontSize: 12,
    fontWeight: '600',
  },
  caption: {
    color: '#A3AAB8',
    fontSize: 13,
    lineHeight: 18,
  },
  pressed: {
    opacity: 0.75,
  },
});
