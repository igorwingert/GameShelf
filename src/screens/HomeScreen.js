import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFavorites } from '../context/FavoritesContext';
import games from '../data/games';
import { getAllCaptures, getAllReviews } from '../database/database';
import { STORAGE_KEYS, loadData } from '../storage/storage';

function getInitials(name) {
  const initials = (name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
  return initials || 'GS';
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { favorites } = useFavorites();
  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [captures, setCaptures] = useState([]);

  // Atualiza o painel sempre que a Home volta a aparecer
  // (perfil do AsyncStorage, avaliações e capturas do SQLite).
  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      Promise.all([loadData(STORAGE_KEYS.profile, null), getAllReviews(), getAllCaptures()]).then(
        ([savedProfile, savedReviews, savedCaptures]) => {
          if (isActive) {
            setProfile(savedProfile);
            setReviews(savedReviews);
            setCaptures(savedCaptures);
          }
        }
      );
      return () => {
        isActive = false;
      };
    }, [])
  );

  const name = profile?.name || 'Jogador';
  const finishedCount = reviews.filter((review) => review.status === 'zerado').length;
  const playingIds = reviews
    .filter((review) => review.status === 'jogando')
    .map((review) => review.game_id);
  const playingGames = games.filter((game) => playingIds.includes(game.id));
  const shelfGames = playingGames.length > 0 ? playingGames : games;

  const stats = [
    { label: 'Favoritos', value: favorites.length, route: 'Favorites' },
    { label: 'Zerados', value: finishedCount, route: 'Games' },
    { label: 'Capturas', value: captures.length, route: 'Captures' },
  ];

  function openGame(game) {
    navigation.navigate('Details', { game });
  }

  return (
    <ScrollView
      style={styles.screen}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 32,
      }}>
      {/* Cabeçalho: saudação + avatar (abre o perfil) */}
      <View style={[styles.padded, styles.header]}>
        <View style={styles.headerText}>
          <Text style={styles.greeting}>{getGreeting()},</Text>
          <Text accessibilityRole="header" style={styles.name} numberOfLines={1}>
            {name}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Abrir perfil"
          onPress={() => navigation.navigate('Profile')}
          style={({ pressed }) => pressed && styles.pressed}>
          {profile?.photoUri ? (
            <Image source={{ uri: profile.photoUri }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarFallback]}>
              <Text style={styles.avatarInitials}>{getInitials(profile?.name)}</Text>
            </View>
          )}
        </Pressable>
      </View>

      {/* Chamada principal */}
      <Pressable
        accessibilityRole="button"
        onPress={() => navigation.navigate('Games')}
        style={({ pressed }) => [styles.padded, styles.heroWrapper, pressed && styles.pressed]}>
        <View style={styles.hero}>
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>O que vamos jogar hoje?</Text>
            <Text style={styles.heroSubtitle}>Explore o catálogo completo</Text>
          </View>
          <View style={styles.heroArrow}>
            <Text style={styles.heroArrowText}>→</Text>
          </View>
        </View>
      </Pressable>

      {/* Números da biblioteca */}
      <View style={[styles.padded, styles.stats]}>
        {stats.map((stat) => (
          <Pressable
            key={stat.label}
            accessibilityRole="button"
            accessibilityLabel={`${stat.label}: ${stat.value}`}
            onPress={() => navigation.navigate(stat.route)}
            style={({ pressed }) => [styles.statCard, pressed && styles.pressed]}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* Prateleira de jogos */}
      <View style={styles.section}>
        <View style={[styles.padded, styles.sectionHeader]}>
          <Text style={styles.sectionTitle}>
            {playingGames.length > 0 ? 'Continue jogando' : 'Em destaque'}
          </Text>
          <Pressable accessibilityRole="button" hitSlop={8} onPress={() => navigation.navigate('Games')}>
            <Text style={styles.link}>Ver todos</Text>
          </Pressable>
        </View>
        <FlatList
          horizontal
          data={shelfGames}
          keyExtractor={(game) => game.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.shelf}
          renderItem={({ item }) => (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Ver detalhes de ${item.name}`}
              onPress={() => openGame(item)}
              style={({ pressed }) => [styles.gameCard, pressed && styles.pressed]}>
              <Image source={item.image} style={styles.gameImage} />
              <Text style={styles.gameName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.gameGenre} numberOfLines={1}>
                {item.genre}
              </Text>
            </Pressable>
          )}
        />
      </View>

      {/* Últimas capturas (só aparece se houver alguma) */}
      {captures.length > 0 && (
        <View style={styles.section}>
          <View style={[styles.padded, styles.sectionHeader]}>
            <Text style={styles.sectionTitle}>Capturas recentes</Text>
            <Pressable
              accessibilityRole="button"
              hitSlop={8}
              onPress={() => navigation.navigate('Captures')}>
              <Text style={styles.link}>Ver todas</Text>
            </Pressable>
          </View>
          <FlatList
            horizontal
            data={captures.slice(0, 8)}
            keyExtractor={(capture) => String(capture.id)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.shelf}
            renderItem={({ item }) => (
              <Pressable
                accessibilityRole="imagebutton"
                accessibilityLabel={item.legenda || 'Captura'}
                onPress={() => navigation.navigate('CaptureViewer', { captureId: item.id })}
                style={({ pressed }) => pressed && styles.pressed}>
                <Image source={{ uri: item.uri }} style={styles.captureImage} />
              </Pressable>
            )}
          />
        </View>
      )}
    </ScrollView>
  );
}

const PADDING = 20;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0B0D12',
  },
  padded: {
    paddingHorizontal: PADDING,
  },
  pressed: {
    opacity: 0.75,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    color: '#858D9B',
    fontSize: 15,
  },
  name: {
    color: '#F2F3F5',
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '800',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#1D2330',
  },
  avatarFallback: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#303640',
  },
  avatarInitials: {
    color: '#A78BFA',
    fontSize: 18,
    fontWeight: '800',
  },
  heroWrapper: {
    marginBottom: 16,
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#8B5CF6',
  },
  heroText: {
    flex: 1,
    gap: 4,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '800',
  },
  heroSubtitle: {
    color: '#E9E3FF',
    fontSize: 14,
  },
  heroArrow: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },
  heroArrowText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  stats: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    gap: 2,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#151922',
  },
  statValue: {
    color: '#F2F3F5',
    fontSize: 24,
    fontWeight: '800',
  },
  statLabel: {
    color: '#858D9B',
    fontSize: 13,
  },
  section: {
    gap: 12,
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#F2F3F5',
    fontSize: 18,
    fontWeight: '700',
  },
  link: {
    color: '#A78BFA',
    fontSize: 14,
    fontWeight: '600',
  },
  shelf: {
    paddingHorizontal: PADDING,
    gap: 12,
  },
  gameCard: {
    width: 220,
    gap: 4,
  },
  gameImage: {
    width: 220,
    height: 103,
    borderRadius: 10,
    marginBottom: 4,
    backgroundColor: '#1D2330',
  },
  gameName: {
    color: '#F2F3F5',
    fontSize: 15,
    fontWeight: '600',
  },
  gameGenre: {
    color: '#858D9B',
    fontSize: 13,
  },
  captureImage: {
    width: 150,
    height: 94,
    borderRadius: 10,
    backgroundColor: '#1D2330',
  },
});
