import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const initialProfile = {
  name: 'Jogador',
  nickname: '@player',
  platform: 'PC',
  favoriteGenre: 'RPG',
  favoriteGame: 'Ainda não definido',
  bio: 'Apaixonado por jogos e novas aventuras.',
};

const profileFields = [
  { key: 'name', label: 'Nome' },
  { key: 'nickname', label: 'Nickname' },
  { key: 'platform', label: 'Plataforma principal' },
  { key: 'favoriteGenre', label: 'Gênero de jogo favorito' },
  { key: 'favoriteGame', label: 'Jogo favorito' },
  { key: 'bio', label: 'Bio curta', multiline: true },
];

function getInitials(name) {
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return initials || 'GS';
}

export default function ProfileScreen() {
  const [profile, setProfile] = useState(initialProfile);
  const [draftProfile, setDraftProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const insets = useSafeAreaInsets();
  const displayedProfile = isEditing ? draftProfile : profile;
  const displayedFields = isEditing
    ? profileFields
    : profileFields.filter((field) => field.key !== 'name' && field.key !== 'nickname');

  function updateDraft(field, value) {
    setDraftProfile((currentDraft) => ({ ...currentDraft, [field]: value }));
  }

  function handleProfileAction() {
    if (isEditing) {
      setProfile(draftProfile);
      setIsEditing(false);
      return;
    }

    setDraftProfile(profile);
    setIsEditing(true);
  }

  return (
    <ScrollView
      style={styles.screen}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[
        styles.container,
        {
          paddingBottom: insets.bottom + 20,
          paddingLeft: insets.left + 20,
          paddingRight: insets.right + 20,
        },
      ]}>
      <View style={styles.content}>
        <View style={[styles.card, styles.identityCard]}>
          <View style={styles.avatar}>
            <Text style={styles.initials}>{getInitials(displayedProfile.name)}</Text>
          </View>
          <Text style={styles.name}>{displayedProfile.name || 'Jogador'}</Text>
          <Text style={styles.nickname}>{displayedProfile.nickname || '@player'}</Text>
        </View>

        <View style={styles.card}>
          <Text accessibilityRole="header" style={styles.sectionTitle}>
            Informações do jogador
          </Text>

          {displayedFields.map((field) => (
            <View key={field.key} style={styles.field}>
              <Text style={styles.label}>{field.label}</Text>
              {isEditing ? (
                <TextInput
                  accessibilityLabel={field.label}
                  value={draftProfile[field.key]}
                  onChangeText={(value) => updateDraft(field.key, value)}
                  multiline={field.multiline}
                  numberOfLines={field.multiline ? 4 : 1}
                  placeholder={`Informe ${field.label.toLowerCase()}`}
                  placeholderTextColor="#778197"
                  selectionColor="#8B5CF6"
                  style={[styles.input, field.multiline && styles.bioInput]}
                />
              ) : (
                <Text style={[styles.value, field.multiline && styles.bio]}>
                  {profile[field.key]}
                </Text>
              )}
            </View>
          ))}
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={handleProfileAction}
          style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}>
          <Text style={styles.actionButtonText}>
            {isEditing ? 'Salvar alterações' : 'Editar perfil'}
          </Text>
        </Pressable>

        <View style={[styles.card, styles.aboutCard]}>
          <Text accessibilityRole="header" style={styles.sectionTitle}>
            Sobre o GameShelf
          </Text>
          <Text style={styles.description}>
            GameShelf foi desenvolvido como trabalho acadêmico da disciplina de Desenvolvimento de Aplicações para Dispositivos Móveis.
          </Text>
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
    paddingTop: 18,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 480,
    gap: 24,
  },
  card: {
    gap: 16,
  },
  identityCard: {
    alignItems: 'center',
    gap: 8,
    paddingBottom: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#252A33',
  },
  avatar: {
    minWidth: 72,
    minHeight: 72,
    marginBottom: 4,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#1D2330',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: '#9C7CF7',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '800',
  },
  name: {
    color: '#F2F3F5',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    textAlign: 'center',
  },
  nickname: {
    color: '#A3AAB8',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  sectionTitle: {
    color: '#F2F3F5',
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '700',
  },
  field: {
    gap: 8,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#20242C',
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
  bio: {
    fontWeight: '400',
  },
  input: {
    minHeight: 52,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#303640',
    backgroundColor: '#151922',
    color: '#F2F3F5',
    fontSize: 16,
    lineHeight: 24,
  },
  bioInput: {
    minHeight: 112,
    textAlignVertical: 'top',
  },
  actionButton: {
    minHeight: 52,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonPressed: {
    opacity: 0.75,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  aboutCard: {
    gap: 12,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#252A33',
  },
  description: {
    color: '#A3AAB8',
    fontSize: 16,
    lineHeight: 26,
  },
});
