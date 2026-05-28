import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COMPONENT_REGISTRY, TOTAL_COMPONENT_COUNT } from '@/constants/component-registry';

export default function AllComponentsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 32 },
      ]}
    >
      <Text style={styles.heading}>Todos os componentes</Text>
      <Text style={styles.sub}>
        Catálogo completo exportado por @vitrine-ds/react-native — {TOTAL_COMPONENT_COUNT}{' '}
        componentes com preview interativo.
      </Text>

      <View style={styles.summaryRow}>
        <SummaryPill label="Componentes" value={String(TOTAL_COMPONENT_COUNT)} accent />
      </View>

      <View style={styles.grid}>
        {COMPONENT_REGISTRY.map((item) => (
          <Pressable
            key={item.slug}
            onPress={() =>
              router.push({ pathname: '/[slug]', params: { slug: item.slug } })
            }
            style={styles.card}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={[styles.badge, styles.badgePreview]}>
                  <Text style={[styles.badgeText, styles.badgeTextPreview]}>preview</Text>
                </View>
            </View>
            <Text style={styles.cardExport}>{item.exportName}</Text>
            {item.specFile ? (
              <Text style={styles.cardSpec}>spec: {item.specFile}</Text>
            ) : null}
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

function SummaryPill({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <View style={[styles.pill, accent && styles.pillAccent]}>
      <Text style={[styles.pillValue, accent && styles.pillValueAccent]}>{value}</Text>
      <Text style={[styles.pillLabel, accent && styles.pillLabelAccent]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingHorizontal: 24,
    gap: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  sub: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
    maxWidth: 640,
  },
  summaryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  pill: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    minWidth: 100,
    alignItems: 'center',
    gap: 4,
  },
  pillAccent: {
    backgroundColor: '#1b3c7e',
    borderColor: '#1b3c7e',
  },
  pillValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  pillValueAccent: {
    color: '#fff',
  },
  pillLabel: {
    fontSize: 12,
    color: '#666',
  },
  pillLabelAccent: {
    color: 'rgba(255,255,255,0.85)',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: 280,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    gap: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  cardExport: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'SpaceMono',
  },
  cardSpec: {
    fontSize: 11,
    color: '#1b3c7e',
    marginTop: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgePreview: {
    backgroundColor: '#d4e4ff',
  },
  badgeSoon: {
    backgroundColor: '#eee',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  badgeTextPreview: {
    color: '#1b3c7e',
  },
  badgeTextSoon: {
    color: '#888',
  },
});
