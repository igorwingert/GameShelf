import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

/**
 * @param {{ game: import('../data/games').Game, onPress?: (game: import('../data/games').Game) => void }} props
 */
export default function GameCard({ game, onPress }) {
  const isDisabled = !onPress;

  return (
    <View style={styles.card}>
      <Image source={game.image} style={styles.image} accessibilityLabel={`Imagem de ${game.name}`} />

      <View style={styles.content}>
        <Text style={styles.name}>{game.name}</Text>

        <View style={styles.metadata}>
          <Text style={styles.genre}>{game.genre}</Text>
          <Text style={styles.year}>{game.year}</Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Ver detalhes de ${game.name}`}
          accessibilityState={{ disabled: isDisabled }}
          disabled={isDisabled}
          onPress={() => onPress?.(game)}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            isDisabled && styles.buttonDisabled,
          ]}>
          <Text style={styles.buttonText}>Ver detalhes</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    backgroundColor: '#151922',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 'auto',
    aspectRatio: 460 / 215,
    resizeMode: 'contain',
    backgroundColor: '#1D2330',
  },
  content: {
    padding: 14,
    gap: 8,
  },
  name: {
    color: '#F2F3F5',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
  },
  metadata: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  genre: {
    color: '#A3AAB8',
    fontSize: 14,
    lineHeight: 22,
    flexShrink: 1,
  },
  year: {
    color: '#858D9B',
    fontSize: 14,
    lineHeight: 22,
  },
  button: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 2,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
});
