import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COMPONENT_REGISTRY, TOTAL_COMPONENT_COUNT } from '@/constants/component-registry';

const SIDEBAR_WIDTH = 260;

export function ShowcaseSidebar() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const router = useRouter();

  const isIndexActive = pathname === '/' || pathname === '/index' || pathname.endsWith('/index');

  return (
    <View
      style={[
        styles.sidebar,
        { width: SIDEBAR_WIDTH, paddingTop: insets.top + 12, paddingBottom: insets.bottom + 12 },
      ]}
    >
      <View style={styles.brandBlock}>
        <Text style={styles.brand}>Vitrine DS</Text>
        <Text style={styles.brandSub}>Showcase</Text>
        <Text style={styles.stats}>{TOTAL_COMPONENT_COUNT} componentes</Text>
      </View>

      <Pressable
        onPress={() => router.push('/')}
        style={[styles.navItem, isIndexActive && styles.navItemActive]}
      >
        <Text style={[styles.navText, isIndexActive && styles.navTextActive]}>
          Todos os componentes
        </Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Componentes</Text>

      <ScrollView style={styles.navScroll} showsVerticalScrollIndicator={false}>
        {COMPONENT_REGISTRY.map((item) => {
          const isActive = pathname === `/${item.slug}` || pathname.endsWith(`/${item.slug}`);

          return (
            <Pressable
              key={item.slug}
              onPress={() =>
                router.push({ pathname: '/[slug]', params: { slug: item.slug } })
              }
              style={[styles.navItem, isActive && styles.navItemActive]}
            >
              <View style={styles.navRow}>
                <Text
                  style={[styles.navText, isActive && styles.navTextActive]}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                {item.hasPreview ? (
                  <View style={styles.previewBadge}>
                    <Text style={styles.previewBadgeText}>preview</Text>
                  </View>
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

export const SHOWCASE_SIDEBAR_WIDTH = SIDEBAR_WIDTH;

const styles = StyleSheet.create({
  sidebar: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: '#d4d4d4',
    backgroundColor: '#fafafa',
  },
  brandBlock: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 4,
  },
  brand: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1b3c7e',
  },
  brandSub: {
    fontSize: 13,
    color: '#666',
  },
  stats: {
    fontSize: 11,
    color: '#888',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  navScroll: {
    flex: 1,
  },
  navItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  navItemActive: {
    backgroundColor: '#e8eef8',
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  navText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  navTextActive: {
    color: '#1b3c7e',
    fontWeight: '600',
  },
  previewBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#d4e4ff',
  },
  previewBadgeText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#1b3c7e',
    textTransform: 'uppercase',
  },
  soonBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#eee',
  },
  soonBadgeText: {
    fontSize: 9,
    fontWeight: '500',
    color: '#888',
  },
});
