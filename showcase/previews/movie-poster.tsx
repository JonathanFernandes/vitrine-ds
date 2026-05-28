import { MoviePoster } from '@vitrine-ds/react-native';
import React from 'react';
import { View } from 'react-native';

import { PreviewScreen, PreviewSection, previewStyles } from '@/components/PreviewScreen';
import { SAMPLE_POSTER } from './shared';

export default function MoviePosterPreview() {
  return (
    <PreviewScreen title="Movie Poster">
      <PreviewSection label="Exemplo">
        <View style={previewStyles.row}>
          <MoviePoster
            imageUrl={SAMPLE_POSTER.uri}
            title="Duna: Parte Dois"
            date="Em cartaz"
            onPress={() => {}}
          />
        </View>
      </PreviewSection>
    </PreviewScreen>
  );
}
