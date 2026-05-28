import { Link as DsLink } from '@vitrine-ds/react-native';
import React from 'react';
import { View } from 'react-native';

import { PreviewScreen, PreviewSection, previewStyles } from '@/components/PreviewScreen';

export default function LinkPreview() {
  return (
    <PreviewScreen title="Link">
      <PreviewSection label="Variantes">
        <View style={previewStyles.column}>
          <DsLink onPress={() => {}}>Link primary medium</DsLink>
          <DsLink variant="destructive" onPress={() => {}}>
            Link destructive
          </DsLink>
          <DsLink size="small" showChevronRight onPress={() => {}}>
            Com chevron
          </DsLink>
          <DsLink disabled onPress={() => {}}>
            Disabled
          </DsLink>
        </View>
      </PreviewSection>
      <PreviewSection label="Negative" dark>
        <DsLink style="negative" onPress={() => {}}>
          Link negative
        </DsLink>
      </PreviewSection>
    </PreviewScreen>
  );
}
