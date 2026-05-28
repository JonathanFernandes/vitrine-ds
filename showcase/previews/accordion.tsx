import { Accordion, type ThemeName, useTheme } from '@vitrine-ds/react-native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const THEMES: ThemeName[] = ['neutral', 'leblon', 'red', 'green'];

const SAMPLE_ITEMS = [
  { badgeLabel: '1°', label: 'Abra o app e faça login' },
  { badgeLabel: '2°', label: 'Acesse a seção de benefícios' },
  { badgeLabel: '3°', label: 'Ative o cupom desejado' },
  { badgeLabel: '4°', label: 'Apresente o QR Code na loja' },
];

export default function AccordionPreviewScreen() {
  const insets = useSafeAreaInsets();
  const { themeName, setTheme } = useTheme();

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 },
      ]}
    >
      <Text style={styles.heading}>Accordion</Text>
      <Text style={styles.sub}>Preview — `specs/component-spec/accordion.md` · Figma `7922:5670`</Text>

      <Text style={styles.sectionLabel}>Tema</Text>
      <View style={styles.themeRow}>
        {THEMES.map((name) => (
          <Pressable
            key={name}
            onPress={() => setTheme(name)}
            style={[styles.themeChip, themeName === name && styles.themeChipActive]}
          >
            <Text style={[styles.themeChipText, themeName === name && styles.themeChipTextActive]}>
              {name}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Type = dark (interativo)</Text>
      <View style={styles.block}>
        <Accordion
          type="dark"
          title="Como funciona o benefício"
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          defaultExpanded={false}
        />
      </View>

      <View style={styles.block}>
        <Accordion
          type="dark"
          title="Passo a passo"
          items={SAMPLE_ITEMS}
          defaultExpanded
        />
      </View>

      <Text style={styles.sectionLabel}>Variantes Figma (action fixo)</Text>
      <View style={styles.block}>
        <Accordion type="dark" action="closed" title="Lorem ipsum dolor sit" />
        <Accordion
          type="dark"
          action="open-simple"
          title="Lorem ipsum dolor sit"
          subtitle="Lorem ipsum dolor sit"
        />
        <Accordion
          type="dark"
          action="open-list"
          title="Lorem ipsum dolor sit"
          items={SAMPLE_ITEMS}
        />
      </View>

      <Text style={styles.sectionLabel}>Type = light (fundo escuro)</Text>
      <View style={[styles.block, styles.darkSurface]}>
        <Accordion type="light" action="closed" title="Lorem ipsum dolor sit" />
        <Accordion
          type="light"
          action="open-simple"
          title="Lorem ipsum dolor sit"
          subtitle="Lorem ipsum dolor sit"
        />
        <Accordion
          type="light"
          action="open-list"
          title="Lorem ipsum dolor sit"
          items={SAMPLE_ITEMS}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollContent: { paddingHorizontal: 16, gap: 16 },
  heading: { fontSize: 22, fontWeight: '700', color: '#1a1a1a' },
  sub: { fontSize: 13, color: '#666', marginBottom: 8 },
  sectionLabel: { fontSize: 14, fontWeight: '600', color: '#333', marginTop: 8 },
  themeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  themeChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#e6e6e6',
  },
  themeChipActive: { backgroundColor: '#1b3c7e' },
  themeChipText: { fontSize: 12, color: '#333' },
  themeChipTextActive: { color: '#fafafa' },
  block: { gap: 24, alignItems: 'stretch' },
  darkSurface: {
    backgroundColor: '#1b3c7e',
    padding: 16,
    borderRadius: 8,
    gap: 24,
  },
});
