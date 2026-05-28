import {
  RadioButton,
  RadioGroup,
  type RadioButtonVisualState,
  type ThemeName,
  useTheme,
} from '@vitrine-ds/react-native';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const THEMES: ThemeName[] = ['neutral', 'leblon', 'red', 'green'];

const LEFT_STATES: RadioButtonVisualState[] = [
  'default',
  'hover',
  'checked',
  'error',
  'focused',
  'focus-selected',
  'disabled',
  'disabled-checked',
];

const RIGHT_STATES: RadioButtonVisualState[] = [
  'default',
  'hover',
  'checked',
  'error',
  'focused',
  'focus-selected',
  'disabled',
  'disabled-checked',
];

export default function RadioButtonPreviewScreen() {
  const insets = useSafeAreaInsets();
  const { themeName, setTheme } = useTheme();
  const [channel, setChannel] = useState('email');

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 },
      ]}
    >
      <Text style={styles.heading}>Radio-button</Text>
      <Text style={styles.sub}>
        Preview alinhado à spec `specs/component-spec/radio-button.md` (Figma
        `8041:6995`)
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

      <Text style={styles.sectionLabel}>Variantes Figma — Option side Left</Text>
      <View style={styles.variantGrid}>
        {LEFT_STATES.map((state) => (
          <RadioButton
            key={`left-${state}`}
            label="Type something"
            optionSide="left"
            state={state}
            showDivider
            testID={`radio-left-${state}`}
          />
        ))}
      </View>

      <Text style={styles.sectionLabel}>Variantes Figma — Option side Right</Text>
      <View style={styles.variantGrid}>
        {RIGHT_STATES.map((state) => (
          <RadioButton
            key={`right-${state}`}
            label="Type something"
            optionSide="right"
            state={state}
            showDivider
            testID={`radio-right-${state}`}
          />
        ))}
      </View>

      <Text style={styles.sectionLabel}>RadioGroup interativo</Text>
      <View style={styles.groupWrap}>
        <RadioGroup value={channel} onChange={setChannel}>
          <RadioButton label="E-mail" value="email" optionSide="left" />
          <RadioButton label="SMS" value="sms" optionSide="left" />
          <RadioButton
            label="WhatsApp"
            value="whatsapp"
            optionSide="left"
            showDivider={false}
          />
        </RadioGroup>
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
  variantGrid: {
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
  },
  groupWrap: {
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
  },
});
