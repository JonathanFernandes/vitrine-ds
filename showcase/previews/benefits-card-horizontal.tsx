import {
  BenefitsCardHorizontal,
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

const SAMPLE_IMAGE = {
  uri: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&q=80',
};

const THEMES: ThemeName[] = ['neutral', 'leblon', 'red', 'green'];

export default function CardPreviewScreen() {
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
      <Text style={styles.heading}>Benefits Card (horizontal)</Text>
      <Text style={styles.sub}>
        Preview alinhado à spec `specs/component-spec/benefits-card-horizontal.md`
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

      <Text style={styles.sectionLabel}>Estados</Text>

      <View style={styles.cardWrap}>
        <BenefitsCardHorizontal
          status="default"
          categoryLabel="Sorteio"
          storeName="Abbraccio"
          description="Ganhe 20% de desconto"
          expirationText="Vence 12/06 às 22h30"
          productImageSource={SAMPLE_IMAGE}
          onActivatePress={() => {}}
        />
      </View>

      <View style={styles.cardWrap}>
        <BenefitsCardHorizontal
          status="locked"
          categoryLabel="Sorteio"
          storeName="Abbraccio"
          description="Ganhe 20% de desconto"
          expirationText="Vence 12/06 às 22h30"
          productImageSource={SAMPLE_IMAGE}
        />
      </View>

      <View style={styles.cardWrap}>
        <BenefitsCardHorizontal
          status="used"
          categoryLabel="Sorteio"
          storeName="Abbraccio"
          description="Ganhe 20% de desconto"
          expirationText="Vence 12/06 às 22h30"
          productImageSource={SAMPLE_IMAGE}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    alignSelf: 'stretch',
    color: '#1a1a1a',
  },
  sub: {
    fontSize: 14,
    color: '#555',
    alignSelf: 'stretch',
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    alignSelf: 'stretch',
    marginTop: 8,
  },
  themeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignSelf: 'stretch',
  },
  themeChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  themeChipActive: {
    borderColor: '#4274d6',
    backgroundColor: '#e8f0fc',
  },
  themeChipText: {
    fontSize: 13,
    color: '#333',
    textTransform: 'capitalize',
  },
  themeChipTextActive: {
    fontWeight: '700',
    color: '#1b3c7e',
  },
  cardWrap: {
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
});
