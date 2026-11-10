import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { REVIEW_STATUS, getReview, saveReview } from '../database/database';

const STARS = [1, 2, 3, 4, 5];

/**
 * Avaliação pessoal do jogo (nota, status e comentário), salva no SQLite.
 * @param {{ gameId: string, onSaved?: (review: { nota: number, status: string, previousStatus: string | null }) => void }} props
 */
export default function ReviewSection({ gameId, onSaved }) {
  const [nota, setNota] = useState(0);
  const [status, setStatus] = useState('quero_jogar');
  const [comentario, setComentario] = useState('');
  const [savedStatus, setSavedStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState('');

  // Recarrega a avaliação do banco sempre que a tela ganha foco.
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      getReview(gameId).then((review) => {
        if (!isActive) {
          return;
        }
        if (review) {
          setNota(review.nota);
          setStatus(review.status);
          setComentario(review.comentario);
          setSavedStatus(review.status);
        }
        setIsLoading(false);
      });

      return () => {
        isActive = false;
      };
    }, [gameId])
  );

  async function handleSave() {
    await saveReview({ gameId, nota, status, comentario: comentario.trim() });
    const previousStatus = savedStatus;
    setSavedStatus(status);
    setFeedback('Avaliação salva!');
    setTimeout(() => setFeedback(''), 2500);
    onSaved?.({ nota, status, previousStatus });
  }

  if (isLoading) {
    return <ActivityIndicator color="#A78BFA" />;
  }

  return (
    <View style={styles.section}>
      <Text accessibilityRole="header" style={styles.sectionTitle}>
        Minha avaliação
      </Text>

      <View style={styles.stars} accessibilityLabel={`Nota ${nota} de 5`}>
        {STARS.map((star) => (
          <Pressable
            key={star}
            accessibilityRole="button"
            accessibilityLabel={`Dar nota ${star}`}
            hitSlop={6}
            onPress={() => setNota(star === nota ? 0 : star)}>
            <Text style={[styles.star, star <= nota && styles.starActive]}>★</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.statusRow}>
        {REVIEW_STATUS.map((option) => {
          const isSelected = option.value === status;
          return (
            <Pressable
              key={option.value}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              onPress={() => setStatus(option.value)}
              style={[styles.statusChip, isSelected && styles.statusChipSelected]}>
              <Text style={[styles.statusText, isSelected && styles.statusTextSelected]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <TextInput
        accessibilityLabel="Comentário sobre o jogo"
        value={comentario}
        onChangeText={setComentario}
        placeholder="O que você achou do jogo?"
        placeholderTextColor="#778197"
        multiline
        style={styles.input}
      />

      <Pressable
        accessibilityRole="button"
        onPress={handleSave}
        style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}>
        <Text style={styles.saveButtonText}>Salvar avaliação</Text>
      </Pressable>

      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
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
  sectionTitle: {
    color: '#F2F3F5',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
  },
  stars: {
    flexDirection: 'row',
    gap: 8,
  },
  star: {
    fontSize: 34,
    lineHeight: 40,
    color: '#303640',
  },
  starActive: {
    color: '#FACC15',
  },
  statusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#303640',
  },
  statusChipSelected: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  statusText: {
    color: '#A3AAB8',
    fontSize: 14,
    fontWeight: '600',
  },
  statusTextSelected: {
    color: '#FFFFFF',
  },
  input: {
    minHeight: 96,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#303640',
    backgroundColor: '#151922',
    color: '#F2F3F5',
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
  },
  saveButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  pressed: {
    opacity: 0.75,
  },
  saveButtonText: {
    color: '#BFAAFF',
    fontSize: 16,
    fontWeight: '700',
  },
  feedback: {
    color: '#4ADE80',
    fontSize: 14,
    textAlign: 'center',
  },
});
