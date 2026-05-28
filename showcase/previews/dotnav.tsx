import { Dotnav } from '@vitrine-ds/react-native';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { PreviewScreen, PreviewSection, previewStyles } from '@/components/PreviewScreen';

export default function DotnavPreview() {
  const [slide, setSlide] = useState(0);

  return (
    <PreviewScreen title="Dotnav">
      <PreviewSection label="Default">
        <Dotnav slideCount={4} currentSlide={slide} />
        <View style={previewStyles.row}>
          {[0, 1, 2, 3].map((i) => (
            <Pressable key={i} onPress={() => setSlide(i)}>
              <Text style={{ fontSize: 12 }}>Slide {i + 1}</Text>
            </Pressable>
          ))}
        </View>
      </PreviewSection>
      <PreviewSection label="Negative" dark>
        <Dotnav slideCount={3} currentSlide={1} style="negative" />
      </PreviewSection>
    </PreviewScreen>
  );
}
