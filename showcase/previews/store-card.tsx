import {
  StoreCard,
  type ThemeName,
  useTheme,
} from '@vitrine-ds/react-native';
import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const THEMES: ThemeName[] = ['neutral', 'leblon', 'red', 'green'];

export default function StoreCardPreviewScreen() {
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
      <Text style={styles.heading}>Store Card</Text>
      <Text style={styles.sub}>
        Preview com assets do Figma (`Icons/store-card/`)
      </Text>

      <Text style={styles.sectionLabel}>Tema</Text>
      <View style={styles.themeRow}>
        {THEMES.map((name) => (
          <Pressable
            key={name}
            onPress={() => setTheme(name)}
            style={[
              styles.themeChip,
              themeName === name && styles.themeChipActive,
            ]}
          >
            <Text
              style={[
                styles.themeChipText,
                themeName === name && styles.themeChipTextActive,
              ]}
            >
              {name}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Fluxo = Restaurante</Text>
      <View style={styles.cardWrap}>
        <StoreCard
          fluxo="restaurante"
          title="Abbraccio"
          subtitle="Alimentação / Restaurantes"
          locationLabel="Piso L1"
          onLocationPress={() => {}}
          onWhatsAppPress={() => {}}
          onCallPress={() => {}}
          actions={[
            { id: 'menu', label: 'Cardápio digital', onPress: () => {} },
            { id: 'queue', label: 'Fila online', onPress: () => {} },
            { id: 'reserve', label: 'Reservar mesa', onPress: () => {} },
            { id: 'benefits', label: 'Benefícios', onPress: () => {} },
          ]}
        />
      </View>

      <Text style={styles.sectionLabel}>Fluxo = Lojas (2 botões)</Text>
      <View style={styles.cardWrap}>
        <StoreCard
          fluxo="lojas"
          title="Adidas"
          subtitle="Vestuário / Vestuário Unissex"
          locationLabel="Piso L1"
          onLocationPress={() => {}}
          onWhatsAppPress={() => {}}
          onCallPress={() => {}}
          actions={[
            { id: 'benefits', label: 'Benefícios', onPress: () => {} },
            { id: 'shop', label: 'Compra online', onPress: () => {} },
          ]}
        />
      </View>

      <Text style={styles.sectionLabel}>Fluxo = Lojas (1 botão — fill)</Text>
      <View style={styles.cardWrap}>
        <StoreCard
          fluxo="lojas"
          title="Abbraccio"
          subtitle="Alimentação / Restaurantes ou mais ..."
          locationLabel="Piso L1"
          onLocationPress={() => {}}
          onCallPress={() => {}}
          actions={[
            { id: 'benefits', label: 'Benefícios', onPress: () => {} },
          ]}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  sub: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#414958',
    marginTop: 8,
  },
  themeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  themeChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#E6E6E6',
  },
  themeChipActive: {
    backgroundColor: '#1B3C7E',
  },
  themeChipText: {
    fontSize: 12,
    color: '#333333',
    textTransform: 'capitalize',
  },
  themeChipTextActive: {
    color: '#FFFFFF',
  },
  cardWrap: {
    alignItems: 'center',
  },
});
