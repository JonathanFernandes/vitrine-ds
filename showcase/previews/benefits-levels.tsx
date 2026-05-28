import {
  BenefitsLevels,
  type BenefitsLevelItem,
  type ThemeName,
  useTheme,
} from '@vitrine-ds/react-native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const THEMES: ThemeName[] = ['neutral', 'leblon', 'red', 'green'];

const LEVEL_1_BENEFITS: BenefitsLevelItem[] = [
  { title: '0% de desconto', caption: 'no estacionamento', enabled: false },
  { title: '1 cupom de sorteio', caption: 'para concorrer a prêmios incríveis', enabled: true },
  { title: 'Compre e ganhe', caption: 'participe de promoções exclusivas', enabled: true },
  { title: 'Brindes', caption: 'exclusivos do Shopping', enabled: false },
  { title: 'Descontos e muito mais!', caption: 'para usar em lojas do Shopping', enabled: true },
];

const LEVEL_2_BENEFITS: BenefitsLevelItem[] = [
  { title: '25% de desconto', caption: 'no estacionamento, todos os dias', enabled: true },
  { title: '5 cupons de sorteio', caption: 'para concorrer a prêmios incríveis', enabled: true },
  { title: 'Compre e ganhe', caption: 'participe de promoções exclusivas', enabled: true },
  { title: 'Brindes', caption: 'exclusivos do Shopping', enabled: true },
  { title: 'Descontos e muito mais!', caption: 'para usar em lojas do Shopping', enabled: true },
];

const LEVEL_3_BENEFITS: BenefitsLevelItem[] = [
  { title: 'Até 5 horas grátis', caption: 'no estacionamento, todos os dias', enabled: true },
  { title: '10 cupons de sorteio', caption: 'para concorrer a prêmios incríveis', enabled: true },
  { title: 'Compre e ganhe', caption: 'participe de promoções exclusivas', enabled: true },
  { title: 'Brindes', caption: 'exclusivos do Shopping', enabled: true },
  { title: 'Descontos e muito mais!', caption: 'para usar em lojas do Shopping', enabled: true },
];

export default function BenefitsLevelsPreviewScreen() {
  const insets = useSafeAreaInsets();
  const { themeName, setTheme } = useTheme();

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 },
      ]}
      horizontal={false}
    >
      <Text style={styles.heading}>Benefits Levels</Text>
      <Text style={styles.sub}>
        Preview — `specs/component-spec/benefits-levels.md` · Figma `7935:14175`
      </Text>

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

      <Text style={styles.sectionLabel}>Level = 1</Text>
      <BenefitsLevels
        level="1"
        showTag
        heading="1 Estrela"
        description="Enviando apenas 1 nota fiscal de qualquer valor, você já será 1 Estrela!"
        benefits={LEVEL_1_BENEFITS}
      />

      <Text style={styles.sectionLabel}>Level = 2</Text>
      <BenefitsLevels
        level="2"
        showTag
        heading="2 Estrelas"
        description="A partir de R$ 12.500,00, com o mínimo de 10 notas fiscais enviadas"
        benefits={LEVEL_2_BENEFITS}
      />

      <Text style={styles.sectionLabel}>Level = 3 (sem badge)</Text>
      <BenefitsLevels
        level="3"
        showTag={false}
        heading="3 Estrelas"
        description="A partir de R$ 25.000,00, com o mínimo de 20 notas fiscais enviadas"
        benefits={LEVEL_3_BENEFITS}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollContent: { paddingHorizontal: 16, gap: 24, alignItems: 'flex-start' },
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
});
