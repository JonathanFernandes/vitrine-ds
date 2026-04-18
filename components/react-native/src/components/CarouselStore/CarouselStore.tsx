import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import { CardStoreItem } from '../CardStoreItem';

export interface CarouselStoreItem {
  id: string;
  name: string;
  logoUri?: string;
}

export interface CarouselStoreProps {
  stores: CarouselStoreItem[];
  onStorePress?: (storeId: string) => void;
  showsScrollIndicator?: boolean;
  initialNumToRender?: number;
  style?: StyleProp<ViewStyle>;
}

export function CarouselStore({
  stores,
  onStorePress,
  showsScrollIndicator = false,
  initialNumToRender = 6,
  style,
}: CarouselStoreProps) {
  const { carouselStore } = useTheme();

  function renderItem({ item }: ListRenderItemInfo<CarouselStoreItem>) {
    return (
      <CardStoreItem
        storeName={item.name}
        logoUri={item.logoUri}
        onPress={onStorePress ? () => onStorePress(item.id) : undefined}
        storeId={item.id}
      />
    );
  }

  return (
    <FlatList
      horizontal
      data={stores}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={showsScrollIndicator}
      initialNumToRender={initialNumToRender}
      windowSize={5}
      style={style}
      contentContainerStyle={styles.contentContainer}
      ItemSeparatorComponent={() => <Separator gap={carouselStore.gap} />}
      accessibilityRole="list"
      accessibilityHint="Deslize para ver mais lojas"
    />
  );
}

function Separator({ gap }: { gap: number }) {
  return <View style={[styles.separator, { width: gap }]} />;
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
  },
  separator: {
    width: 0,
  },
});
