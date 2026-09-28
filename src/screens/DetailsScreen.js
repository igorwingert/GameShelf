import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFavorites } from '../context/FavoritesContext';

export default function DetailsScreen({ route }) {
  const { game } = route.params;
  const { isFavorite, toggleFavorite } = useFavorites();
  const isGameFavorite = isFavorite(game.id);
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.scrollContent,
        {
          paddingBottom: insets.bottom + 20,
          paddingLeft: insets.left + 16,
          paddingRight: insets.right + 16,
        },
      ]}>
      <View style={styles.content}>
        <Image
          source={game.image}
          style={styles.image}
          accessibilityLabel={`Imagem de ${game.name}`}
        />

        <View style={styles.heading}>
          <Text style={styles.genre}>{game.genre}</Text>
          <Text accessibilityRole="header" style={styles.title}>
            {game.name}
          </Text>
        </View>

        <View style={styles.information}>
          <View style={styles.informationRow}>
            <View style={styles.informationItem}>
              <Text style={styles.label}>Ano</Text>
              <Text style={styles.value}>{game.year}</Text>
            </View>
            <View style={styles.informationItem}>
              <Text style={styles.label}>Desenvolvedora</Text>
              <Text style={styles.value}>{game.developer}</Text>
            </View>
          </View>

          <View style={styles.platformSection}>
            <Text style={styles.label}>Plataformas</Text>
            <View style={styles.platforms}>
              {game.platforms.map((platform) => (
                <View key={platform} style={styles.platformBadge}>
                  <Text style={styles.platformText}>{platform}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.descriptionSection}>
          <Text accessibilityRole="header" style={styles.sectionTitle}>
            Sobre o jogo
          </Text>
          <Text style={styles.description}>{game.description}</Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: isGameFavorite }}
          onPress={() => toggleFavorite(game)}
          style={({ pressed }) => [
            styles.favoriteButton,
            isGameFavorite && styles.favoriteButtonSelected,
            pressed && styles.favoriteButtonPressed,
          ]}>
          <Text style={[styles.favoriteButtonText, isGameFavorite && styles.favoriteButtonTextSelected]}>
            {isGameFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0B0D12',
  },
  scrollContent: {
    paddingTop: 12,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 480,
    gap: 18,
  },
  image: {
    width: '100%',
    height: 'auto',
    aspectRatio: 460 / 215,
    resizeMode: 'contain',
    borderRadius: 10,
    backgroundColor: '#1D2330',
  },
  heading: {
    gap: 8,
  },
  genre: {
    color: '#9C7CF7',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
  },
  title: {
    color: '#F2F3F5',
    fontSize: 27,
    lineHeight: 34,
    fontWeight: '700',
  },
  information: {
    gap: 14,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#252A33',
  },
  informationRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  informationItem: {
    flexBasis: 140,
    minWidth: 0,
    flexGrow: 1,
    flexShrink: 1,
    gap: 8,
  },
  label: {
    color: '#858D9B',
    fontSize: 14,
    lineHeight: 22,
  },
  value: {
    color: '#F2F3F5',
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '600',
  },
  platformSection: {
    gap: 8,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#20242C',
  },
  platforms: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  platformBadge: {
    maxWidth: '100%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#1D2330',
  },
  platformText: {
    color: '#A3AAB8',
    fontSize: 14,
    lineHeight: 22,
  },
  descriptionSection: {
    gap: 12,
  },
  sectionTitle: {
    color: '#F2F3F5',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
  },
  description: {
    color: '#A3AAB8',
    fontSize: 16,
    lineHeight: 26,
  },
  favoriteButton: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8B5CF6',
    backgroundColor: '#8B5CF6',
  },
  favoriteButtonSelected: {
    backgroundColor: 'transparent',
  },
  favoriteButtonPressed: {
    opacity: 0.75,
  },
  favoriteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  favoriteButtonTextSelected: {
    color: '#BFAAFF',
  },
});
