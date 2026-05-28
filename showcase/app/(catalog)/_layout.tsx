import { Slot } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ShowcaseSidebar } from '@/components/ShowcaseSidebar';

export default function CatalogLayout() {
  return (
    <View style={styles.root}>
      <ShowcaseSidebar />
      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
});
