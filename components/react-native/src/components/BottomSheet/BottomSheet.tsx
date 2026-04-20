import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme';
import { Button } from '../Button';
import { CardOptions } from '../CardOptions';
import { Input } from '../Input';
import { Link } from '../Link';

export type BottomSheetType =
  | 'simple'
  | 'form'
  | 'benefits-list'
  | 'radio-options';

export interface BottomSheetBenefitItem {
  title: string;
  caption: string;
}

export interface BottomSheetProps {
  type?: BottomSheetType;
  showIcon?: boolean;
  showScrollbar?: boolean;
  title?: string;
  description?: string;
  onClose?: () => void;
  /** Main content slot. When omitted, the Figma example content is rendered. */
  children?: React.ReactNode;
  /** Extra footer slot. When omitted, each type renders its default footer. */
  footer?: React.ReactNode;
  benefitItems?: BottomSheetBenefitItem[];
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

const noop = () => {};

const DEFAULT_DESCRIPTION =
  'Lorem ipsum dolorem non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.';

function CloseIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6.75 6.75 17.25 17.25M17.25 6.75 6.75 17.25"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={1.8}
      />
    </Svg>
  );
}

function PromotionIcon({ color }: { color: string }) {
  return (
    <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
      <Path
        d="M12 25.5h6l16-8v20l-16-8h-6v-4Z"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={3}
      />
      <Path
        d="m18 29.5 2.5 8.5h5L23 31.5"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={3}
      />
      <Path d="M37 22v11" stroke={color} strokeLinecap="round" strokeWidth={3} />
    </Svg>
  );
}

function StarIcon({ color }: { color: string }) {
  return (
    <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
      <Path
        d="m24 7 5.1 10.33 11.4 1.66-8.25 8.04 1.95 11.35L24 33.02 13.8 38.38l1.95-11.35L7.5 18.99l11.4-1.66L24 7Z"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={2.4}
      />
    </Svg>
  );
}

function HeaderHandle({ color }: { color: string }) {
  return (
    <View style={styles.header}>
      <View style={[styles.handle, { backgroundColor: color }]} />
    </View>
  );
}

function HomeIndicator({ color }: { color: string }) {
  return (
    <View style={styles.footerBar}>
      <View style={[styles.homeIndicator, { backgroundColor: color }]} />
    </View>
  );
}

function BenefitCard({
  title,
  caption,
}: BottomSheetBenefitItem) {
  const { bottomSheet } = useTheme();

  return (
    <View
      style={[
        styles.benefitCard,
        {
          backgroundColor: bottomSheet.surface.muted,
          borderRadius: bottomSheet.benefitRadius,
        },
      ]}
    >
      <Text
        numberOfLines={1}
        style={[styles.benefitTitle, { color: bottomSheet.text.listTitle }]}
      >
        {title}
      </Text>
      <Text
        numberOfLines={1}
        style={[styles.benefitCaption, { color: bottomSheet.text.caption }]}
      >
        {caption}
      </Text>
    </View>
  );
}

function DefaultSimpleContent({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { bottomSheet } = useTheme();

  return (
    <View style={styles.centerContent}>
      <PromotionIcon color={bottomSheet.icon.primary} />
      <Text style={[styles.centerTitle, { color: bottomSheet.text.title }]}>
        {title}
      </Text>
      <Text style={[styles.centerDescription, { color: bottomSheet.text.body }]}>
        {description}
      </Text>
    </View>
  );
}

function DefaultFormContent({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { bottomSheet } = useTheme();

  return (
    <View style={styles.contentStack}>
      <View style={styles.copyStack}>
        <Text style={[styles.title, { color: bottomSheet.text.title }]}>
          {title}
        </Text>
        <Text style={[styles.description, { color: bottomSheet.text.body }]}>
          {description}
        </Text>
      </View>
      <View style={styles.formStack}>
        <Input label="Label" placeholder="Placeholder" size="medium" />
        <Input label="Label" placeholder="Placeholder" size="medium" />
      </View>
    </View>
  );
}

function DefaultRadioOptionsContent({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { bottomSheet } = useTheme();

  return (
    <View style={styles.contentStack}>
      <View style={styles.copyStack}>
        <Text style={[styles.title, { color: bottomSheet.text.title }]}>
          {title}
        </Text>
        <Text style={[styles.description, { color: bottomSheet.text.body }]}>
          {description}
        </Text>
      </View>
      <View style={styles.optionsStack}>
        <CardOptions
          state="selected"
          subtitle="(21) *****-4734"
          title="SMS"
        />
        <CardOptions
          state="default"
          subtitle="*******@gmail.com"
          title="E-MAIL"
        />
      </View>
    </View>
  );
}

function DefaultBenefitsContent({
  title,
  description,
  items,
  showScrollbar,
}: {
  title: string;
  description: string;
  items: BottomSheetBenefitItem[];
  showScrollbar: boolean;
}) {
  const { bottomSheet } = useTheme();

  return (
    <View style={styles.benefitsContent}>
      <StarIcon color={bottomSheet.icon.action} />
      <Text style={[styles.centerTitle, { color: bottomSheet.text.title }]}>
        {title}
      </Text>
      <Text style={[styles.centerDescription, { color: bottomSheet.text.body }]}>
        {description}
      </Text>
      <View style={styles.benefitContainer}>
        <ScrollView
          scrollEnabled={showScrollbar}
          showsVerticalScrollIndicator={false}
          style={styles.benefitList}
        >
          <View style={styles.benefitListContent}>
            {items.map((item, index) => (
              <BenefitCard
                caption={item.caption}
                key={`${item.title}-${index}`}
                title={item.title}
              />
            ))}
          </View>
        </ScrollView>
        {showScrollbar ? (
          <View
            style={[
              styles.scrollbarTrack,
              {
                backgroundColor: bottomSheet.surface.shell,
                borderColor: bottomSheet.scrollbar.surface,
              },
            ]}
          >
            <View
              style={[
                styles.scrollbarThumb,
                { backgroundColor: bottomSheet.scrollbar.thumb },
              ]}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
}

/**
 * Bottom sheet shell based on Figma node `7555:12998`.
 * This component renders the visual panel and default slots; compose it with RN `Modal` when needed.
 */
export function BottomSheet({
  type = 'simple',
  showIcon = true,
  showScrollbar = false,
  title,
  description,
  onClose,
  children,
  footer,
  benefitItems = [
    { title: 'Ganhe 20% de desconto', caption: 'Vence 12/06 às 22h30' },
    { title: 'Ganhe 20% de desconto', caption: 'Vence 12/06 às 22h30' },
    { title: 'Ganhe 20% de desconto', caption: 'Vence 12/06 às 22h30' },
  ],
  testID,
  style,
}: BottomSheetProps) {
  const { bottomSheet } = useTheme();

  const resolvedTitle =
    title ?? (type === 'benefits-list'
      ? 'Benefícios disponíveis'
      : type === 'radio-options'
        ? 'Reenviar código'
        : 'Title goes here');
  const resolvedDescription =
    description ?? (type === 'benefits-list'
      ? 'Selecione o benefício que deseja usar'
      : type === 'radio-options'
        ? 'Selecione o por onde quer receber o código'
        : DEFAULT_DESCRIPTION);

  let typeStyle: StyleProp<ViewStyle>;

  switch (type) {
    case 'form':
      typeStyle = styles.formSheet;
      break;
    case 'radio-options':
      typeStyle = styles.radioOptionsSheet;
      break;
    case 'benefits-list':
      typeStyle = styles.benefitsSheet;
      break;
    case 'simple':
    default:
      typeStyle = styles.simpleSheet;
  }

  function renderContent() {
    if (children) return children;

    if (type === 'form') {
      return (
        <DefaultFormContent
          description={resolvedDescription}
          title={resolvedTitle}
        />
      );
    }

    if (type === 'radio-options') {
      return (
        <DefaultRadioOptionsContent
          description={resolvedDescription}
          title={resolvedTitle}
        />
      );
    }

    if (type === 'benefits-list') {
      return (
        <DefaultBenefitsContent
          description={resolvedDescription}
          items={benefitItems}
          showScrollbar={showScrollbar}
          title={resolvedTitle}
        />
      );
    }

    return (
      <DefaultSimpleContent
        description={resolvedDescription}
        title={resolvedTitle}
      />
    );
  }

  function renderFooter() {
    if (footer) return footer;

    if (type === 'simple') {
      return (
        <View style={styles.simpleFooter}>
          <Button fullWidth onPress={noop} size="medium" status="primary">
            Continuar
          </Button>
          <Link onPress={onClose ?? noop} showChevronRight={false} size="small">
            Fechar
          </Link>
          <HomeIndicator color={bottomSheet.chrome.tab} />
        </View>
      );
    }

    if (type === 'form') {
      return (
        <View style={styles.formFooter}>
          <View style={styles.footerButton}>
            <Button fullWidth onPress={noop} size="medium" status="secondary">
              Pular etapa
            </Button>
          </View>
          <View style={styles.footerButton}>
            <Button fullWidth onPress={noop} size="medium" status="primary">
              Continuar
            </Button>
          </View>
        </View>
      );
    }

    return null;
  }

  return (
    <View
      style={[
        styles.sheet,
        typeStyle,
        {
          backgroundColor: bottomSheet.surface.shell,
          borderTopLeftRadius: bottomSheet.radius,
          borderTopRightRadius: bottomSheet.radius,
        },
        style,
      ]}
      testID={testID}
    >
      <HeaderHandle color={bottomSheet.chrome.tab} />
      {renderContent()}
      {renderFooter()}
      {type !== 'simple' ? (
        <HomeIndicator color={bottomSheet.chrome.tab} />
      ) : null}
      {showIcon ? (
        <Pressable
          accessibilityLabel="Fechar"
          accessibilityRole="button"
          hitSlop={10}
          onPress={onClose}
          style={styles.closeButton}
        >
          <CloseIcon color={bottomSheet.icon.close} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    width: 375,
    maxWidth: '100%',
    paddingHorizontal: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  simpleSheet: {
    gap: 24,
    minHeight: 384,
  },
  formSheet: {
    gap: 40,
    minHeight: 480,
  },
  radioOptionsSheet: {
    gap: 40,
    minHeight: 382,
  },
  benefitsSheet: {
    gap: 32,
    minHeight: 526,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    paddingTop: 8,
  },
  handle: {
    width: 44,
    height: 4,
    borderRadius: 4,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContent: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  contentStack: {
    width: '100%',
    gap: 24,
  },
  copyStack: {
    width: '100%',
    gap: 16,
  },
  centerTitle: {
    width: '100%',
    fontFamily: 'BeVietnamPro_700Bold',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: -0.18,
    textAlign: 'center',
    includeFontPadding: false,
  },
  centerDescription: {
    width: 311,
    maxWidth: '100%',
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    textAlign: 'center',
    includeFontPadding: false,
  },
  title: {
    width: '100%',
    fontFamily: 'BeVietnamPro_700Bold',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: -0.18,
    includeFontPadding: false,
  },
  description: {
    width: '100%',
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    includeFontPadding: false,
  },
  formStack: {
    width: '100%',
    gap: 16,
  },
  optionsStack: {
    width: '100%',
    gap: 16,
  },
  benefitsContent: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  benefitContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 4,
  },
  benefitList: {
    flex: 1,
  },
  benefitListContent: {
    gap: 12,
  },
  benefitCard: {
    width: '100%',
    minHeight: 64,
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  benefitTitle: {
    fontFamily: 'BeVietnamPro_700Bold',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
    includeFontPadding: false,
  },
  benefitCaption: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    includeFontPadding: false,
  },
  scrollbarTrack: {
    width: 10,
    alignSelf: 'stretch',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollbarThumb: {
    width: 4,
    height: 40,
    borderRadius: 4,
  },
  simpleFooter: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  formFooter: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  footerButton: {
    flex: 1,
  },
  footerBar: {
    width: '100%',
    height: 24,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 8,
  },
  homeIndicator: {
    width: 134,
    height: 5,
    borderRadius: 3,
  },
});
