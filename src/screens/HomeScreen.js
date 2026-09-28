import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.container,
        {
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 24,
          paddingLeft: insets.left + 20,
          paddingRight: insets.right + 20,
        },
      ]}>
      <View style={styles.content}>
        <View style={styles.brand}>
          <Image
            source={require('../../assets/images/logo.png')}
            accessibilityLabel="Logo GameShelf"
            style={styles.logo}
          />
          <View style={styles.brandText}>
            <Text accessibilityRole="header" style={styles.title}>
              GameShelf
            </Text>
            <Text style={styles.subtitle}>Seu catálogo pessoal de jogos</Text>
          </View>
        </View>

        <View style={styles.introduction}>
          <Text style={styles.question}>O que você quer jogar hoje?</Text>
          <Text style={styles.description}>Organize seus jogos e salve seus favoritos.</Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('Games')}
            style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
            <Text style={styles.primaryButtonText}>Explorar jogos</Text>
          </Pressable>
        </View>

        <View style={styles.shortcuts}>
          <Text accessibilityRole="header" style={styles.sectionTitle}>
            Acesso rápido
          </Text>

          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('Favorites')}
            style={({ pressed }) => [styles.shortcut, pressed && styles.pressed]}>
            <View style={styles.shortcutText}>
              <Text style={styles.shortcutTitle}>Meus favoritos</Text>
              <Text style={styles.subtitle}>Jogos que você salvou</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('Profile')}
            style={({ pressed }) => [styles.shortcut, pressed && styles.pressed]}>
            <View style={styles.shortcutText}>
              <Text style={styles.shortcutTitle}>Perfil</Text>
              <Text style={styles.subtitle}>Seus dados no GameShelf</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
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
  container: {
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 480,
    gap: 32,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  logo: {
    width: 76,
    height: 76,
    resizeMode: 'contain',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  brandText: {
    flex: 1,
    gap: 2,
  },
  title: {
    color: '#F2F3F5',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
  },
  subtitle: {
    color: '#A3AAB8',
    fontSize: 14,
    lineHeight: 21,
  },
  introduction: {
    gap: 10,
  },
  question: {
    color: '#F2F3F5',
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '700',
  },
  description: {
    color: '#A3AAB8',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  primaryButton: {
    minHeight: 50,
    alignSelf: 'flex-start',
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: 10,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
  },
  shortcuts: {
    gap: 0,
  },
  sectionTitle: {
    color: '#F2F3F5',
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '700',
    marginBottom: 6,
  },
  shortcut: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#252A33',
  },
  shortcutText: {
    flex: 1,
    gap: 2,
  },
  shortcutTitle: {
    color: '#F2F3F5',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  chevron: {
    marginLeft: 16,
    color: '#8B5CF6',
    fontSize: 28,
    lineHeight: 32,
  },
  pressed: {
    opacity: 0.7,
  },
});
