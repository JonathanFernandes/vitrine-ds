import { Button, type ButtonSize, type ButtonStatus } from '@vitrine-ds/react-native';
import React from 'react';
import { View } from 'react-native';

import { PreviewScreen, PreviewSection, previewStyles } from '@/components/PreviewScreen';

const STATUSES: ButtonStatus[] = [
  'primary',
  'primary-inverse',
  'secondary',
  'secondary-inverse',
  'destructive',
];
const SIZES: ButtonSize[] = ['large', 'medium', 'small'];

export default function ButtonPreview() {
  return (
    <PreviewScreen title="Button">
      <PreviewSection label="Status">
        <View style={previewStyles.column}>
          {STATUSES.map((status) => (
            <Button key={status} status={status} onPress={() => {}}>
              {status}
            </Button>
          ))}
        </View>
      </PreviewSection>
      <PreviewSection label="Tamanhos">
        <View style={previewStyles.column}>
          {SIZES.map((size) => (
            <Button key={size} size={size} onPress={() => {}}>
              {size}
            </Button>
          ))}
        </View>
      </PreviewSection>
      <PreviewSection label="Estados">
        <View style={previewStyles.column}>
          <Button disabled onPress={() => {}}>
            Disabled
          </Button>
          <Button loading onPress={() => {}}>
            Loading
          </Button>
          <Button fullWidth onPress={() => {}}>
            Full width
          </Button>
        </View>
      </PreviewSection>
    </PreviewScreen>
  );
}
