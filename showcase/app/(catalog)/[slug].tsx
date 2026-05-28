import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getComponentBySlug } from '@/constants/component-registry';
import { PREVIEW_SCREENS } from '@/previews';

export default function ComponentScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const item = slug ? getComponentBySlug(slug) : undefined;
  const Preview = slug ? PREVIEW_SCREENS[slug] : undefined;

  if (!slug || !item) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundTitle}>Componente não encontrado</Text>
        <Text style={styles.notFoundSub}>
          Volte ao catálogo e escolha um componente na sidebar.
        </Text>
      </View>
    );
  }

  if (Preview) {
    return <Preview />;
  }

  return (
    <View style={styles.notFound}>
      <Text style={styles.notFoundTitle}>{item.title}</Text>
      <Text style={styles.notFoundSub}>Preview ainda não disponível para este componente.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
    gap: 8,
  },
  notFoundTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  notFoundSub: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
