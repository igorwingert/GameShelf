import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { getSteamReviews } from '../services/api';

function formatThousands(value) {
  return value.toLocaleString('pt-BR');
}

/**
 * Avaliações da comunidade da Steam (recomenda / não recomenda), buscadas com Axios.
 * @param {{ game: import('../data/games').Game }} props
 */
export default function CommunityReviewsSection({ game }) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(game.steamAppId ? 'loading' : 'unavailable');
  const [attempt, setAttempt] = useState(0);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (!game.steamAppId) {
      return;
    }

    let isActive = true;

    getSteamReviews(game.steamAppId)
      .then((result) => {
        if (isActive) {
          setData(result);
          setStatus(result ? 'success' : 'unavailable');
        }
      })
      .catch((error) => {
        console.warn('Erro ao buscar avaliações da Steam:', error.message);
        if (isActive) {
          setStatus('error');
        }
      });

    return () => {
      isActive = false;
    };
  }, [game.steamAppId, attempt]);

  function handleRetry() {
    setStatus('loading');
    setAttempt((current) => current + 1);
  }

  return (
    <View style={styles.section}>
      <Text accessibilityRole="header" style={styles.sectionTitle}>
        O que a comunidade diz
      </Text>

      {status === 'loading' && (
        <View style={styles.row}>
          <ActivityIndicator color="#A78BFA" />
          <Text style={styles.muted}>Buscando avaliações na Steam...</Text>
        </View>
      )}

      {status === 'unavailable' && (
        <Text style={styles.muted}>Este jogo não tem avaliações na Steam.</Text>
      )}

      {status === 'error' && (
        <View style={styles.errorBox}>
          <Text style={styles.muted}>Não foi possível carregar as avaliações.</Text>
          <Pressable accessibilityRole="button" onPress={handleRetry} hitSlop={8}>
            <Text style={styles.link}>Tentar novamente</Text>
          </Pressable>
        </View>
      )}

      {status === 'success' && data && (
        <>
          <View style={styles.summary}>
            <View style={styles.summaryHeader}>
              <Text style={styles.summaryLabel}>{data.label}</Text>
              <Text style={styles.summaryPercent}>{data.positivePercent}% 👍</Text>
            </View>
            <View style={styles.bar}>
              <View style={[styles.barFill, { width: `${data.positivePercent}%` }]} />
            </View>
            <Text style={styles.muted}>{formatThousands(data.total)} avaliações na Steam</Text>
          </View>

          {data.reviews.map((review) => {
            const isExpanded = expandedId === review.id;
            return (
              <Pressable
                key={review.id}
                accessibilityRole="button"
                accessibilityHint={isExpanded ? 'Recolher avaliação' : 'Ler avaliação completa'}
                onPress={() => setExpandedId(isExpanded ? null : review.id)}
                style={({ pressed }) => [styles.review, pressed && styles.pressed]}>
                <View style={styles.reviewHeader}>
                  <Text
                    style={[
                      styles.verdict,
                      review.recommended ? styles.recommended : styles.notRecommended,
                    ]}>
                    {review.recommended ? '👍 Recomenda' : '👎 Não recomenda'}
                  </Text>
                  <Text style={styles.hours}>{review.hours} h jogadas</Text>
                </View>
                <Text style={styles.reviewText} numberOfLines={isExpanded ? undefined : 4}>
                  {review.text}
                </Text>
                <Text style={styles.readMore}>{isExpanded ? 'Mostrar menos' : 'Ler mais'}</Text>
              </Pressable>
            );
          })}

          <Text style={styles.source}>Dados: Steam · avaliações em inglês</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  muted: {
    color: '#858D9B',
    fontSize: 14,
    lineHeight: 20,
  },
  errorBox: {
    gap: 8,
  },
  link: {
    color: '#A78BFA',
    fontSize: 15,
    fontWeight: '600',
  },
  summary: {
    gap: 8,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#151922',
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    color: '#66C0F4',
    fontSize: 17,
    fontWeight: '700',
  },
  summaryPercent: {
    color: '#F2F3F5',
    fontSize: 15,
    fontWeight: '700',
  },
  bar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7F1D1D',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#4ADE80',
  },
  review: {
    gap: 8,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#252A33',
  },
  pressed: {
    opacity: 0.75,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verdict: {
    fontSize: 15,
    fontWeight: '700',
  },
  recommended: {
    color: '#4ADE80',
  },
  notRecommended: {
    color: '#F87171',
  },
  hours: {
    color: '#858D9B',
    fontSize: 13,
  },
  reviewText: {
    color: '#D1D5DB',
    fontSize: 14,
    lineHeight: 21,
  },
  readMore: {
    color: '#A78BFA',
    fontSize: 13,
    fontWeight: '600',
  },
  source: {
    color: '#6B7280',
    fontSize: 12,
    textAlign: 'center',
  },
});
