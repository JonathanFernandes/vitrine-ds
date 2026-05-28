import { type ThemeName, useTheme } from '@vitrine-ds/react-native';
import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const THEMES: ThemeName[] = ['neutral', 'leblon', 'red', 'green'];

type PreviewScreenProps = {
  title: string;
  subtitle?: string;
  specFile?: string;
  children: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
};

export function PreviewScreen({
  title,
  subtitle,
  specFile,
  children,
  contentStyle,
}: PreviewScreenProps) {
  const insets = useSafeAreaInsets();
  const { themeName, setTheme } = useTheme();

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.scrollContent,
        contentStyle,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 },
      ]}
    >
      <Text style={styles.heading}>{title}</Text>
      {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
      {specFile ? (
        <Text style={styles.spec}>specs/component-spec/{specFile}</Text>
      ) : null}

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

      {children}
    </ScrollView>
  );
}

type PreviewSectionProps = {
  label: string;
  children: React.ReactNode;
  dark?: boolean;
};

export function PreviewSection({ label, children, dark }: PreviewSectionProps) {
  return (
    <>
      <Text style={styles.sectionLabel}>{label}</Text>
      <View style={[styles.block, dark && styles.darkSurface]}>{children}</View>
    </>
  );
}

export const previewStyles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, alignItems: 'center' },
  column: { gap: 16, alignItems: 'stretch' },
  cardWrap: {
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  maxWidth: { maxWidth: 343, alignSelf: 'center', width: '100%' },
});

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollContent: { paddingHorizontal: 16, gap: 16 },
  heading: { fontSize: 22, fontWeight: '700', color: '#1a1a1a' },
  sub: { fontSize: 13, color: '#666' },
  spec: { fontSize: 12, color: '#1b3c7e', marginBottom: 4 },
  sectionLabel: { fontSize: 14, fontWeight: '600', color: '#333', marginTop: 8 },
  themeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  themeChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#e6e6e6',
  },
  themeChipActive: { backgroundColor: '#1b3c7e' },
  themeChipText: { fontSize: 12, color: '#333', textTransform: 'capitalize' },
  themeChipTextActive: { color: '#fafafa' },
  block: { gap: 24, alignItems: 'stretch' },
  darkSurface: {
    backgroundColor: '#1b3c7e',
    padding: 16,
    borderRadius: 8,
    gap: 24,
  },
});
