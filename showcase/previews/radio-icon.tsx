import { RadioIcon, type RadioIconVisualState } from '@vitrine-ds/react-native';
import React from 'react';
import { Text, View } from 'react-native';

import { PreviewScreen, PreviewSection, previewStyles } from '@/components/PreviewScreen';

const STATES: RadioIconVisualState[] = [
  'default',
  'hover',
  'checked',
  'error',
  'focused',
  'focus-selected',
  'disabled',
  'disabled-checked',
  'indeterminate',
];

export default function RadioIconPreview() {
  return (
    <PreviewScreen title="Radio Icon" specFile="radio-icon.md">
      <PreviewSection label="Estados visuais">
        <View style={previewStyles.row}>
          {STATES.map((state) => (
            <View key={state} style={{ alignItems: 'center', gap: 4 }}>
              <RadioIcon state={state} />
              <Text style={{ fontSize: 9, color: '#666' }}>{state}</Text>
            </View>
          ))}
        </View>
      </PreviewSection>
    </PreviewScreen>
  );
}
