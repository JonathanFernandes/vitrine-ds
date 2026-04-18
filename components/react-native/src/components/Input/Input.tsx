/**
 * Input — Allos Design System
 *
 * Campo de entrada de texto com suporte a label flutuante, prefix/suffix,
 * helper text, ação de cancelar e todos os estados de interação:
 * Placeholder · Focus · Writing · Filled · Cancel · View-Only · Disabled · Error
 *
 * Estados: derivados de props (error, disabled, viewOnly, showCancel) +
 *          estado interno isFocused (via onFocus/onBlur do TextInput).
 *
 * Hover (web-only) é intencionalmente omitido — não aplicável em React Native.
 * O cursor "|" do estado Writing é nativo do TextInput — não renderizado explicitamente.
 *
 * Fonte de verdade: specs/input.md · boundVariables extraídos do Figma via Plugin API
 * Temas: NeutralTheme · LeblonTheme · RedTheme · GreenTheme
 */
import React, { useEffect, useRef, useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme';
import { CloseIcon } from './CloseIcon';

// ─── Types ────────────────────────────────────────────────────────────────────

export type InputSize = 'large' | 'medium';

export interface InputProps extends Pick<
  TextInputProps,
  'autoCapitalize' | 'autoComplete' | 'autoCorrect' | 'keyboardType' | 'returnKeyType' | 'textContentType'
> {
  /** Tamanho do campo — afeta padding, fontSize e altura. Default: 'large' */
  size?: InputSize;
  /** Label acima do campo (Be Vietnam Pro Bold) */
  label?: string;
  /** Texto de placeholder */
  placeholder?: string;
  /** Valor controlado do campo */
  value?: string;
  /** Texto fixo à esquerda (ex: "R$") */
  prefix?: string;
  /** Texto fixo à direita (ex: "%") */
  suffix?: string;
  /** Oculta os caracteres digitados, para uso em senhas */
  secureTextEntry?: boolean;
  /** Texto auxiliar/erro abaixo do campo */
  helperText?: string;
  /** Link opcional ao lado do label (ex: "Esqueci a senha") */
  optionalLink?: { text: string; onPress: () => void };
  /** Ativa o estado de erro — borda vermelha, label/value/helper em error color */
  error?: boolean;
  /** Desabilita o campo — fundo cinza, interação bloqueada */
  disabled?: boolean;
  /** Modo somente leitura — fundo cinza, editable=false */
  viewOnly?: boolean;
  /**
   * Ativa o layout Cancel — FormContainer fica com flex:1 e "Cancelar" aparece à direita.
   * O ícone "X" para limpar só é visível quando há valor digitado.
   */
  showCancel?: boolean;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  /** Callback do botão "Cancelar" (texto à direita do campo) */
  onCancel?: () => void;
  /** Callback do ícone "X" para limpar o campo */
  onClear?: () => void;
  /** accessibilityLabel para o TextInput. Padrão: valor do prop `label` */
  accessibilityLabel?: string;
  testID?: string;
}

// ─── Size configuration ───────────────────────────────────────────────────────

/**
 * Mapa de dimensões e tipografia por tamanho.
 * Fonte: specs/input.md seção "Espaçamento e dimensões"
 */
const SIZE_CONFIG: Record<
  InputSize,
  {
    paddingVertical: number;   // FormContainer: Large=16px (sm), Medium=12px (xs)
    paddingHorizontal: number; // FormContainer: Large=12px (xs), Medium=8px (2xs)
    valueFontSize: number;     // Large=20, Medium=16  (Mobile/Input/Input)
    valueLineHeight: number;   // Large=24, Medium=20
    labelFontSize: number;     // Large=16, Medium=14  (Bold)
    labelLineHeight: number;   // Large=24, Medium=20
    helperFontSize: number;    // 12px ambos
    helperLineHeight: number;  // 14px ambos
    closeIconSize: number;     // Large=24, Medium=20
  }
> = {
  large: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    valueFontSize: 20,
    valueLineHeight: 24,
    labelFontSize: 16,
    labelLineHeight: 24,
    helperFontSize: 12,
    helperLineHeight: 14,
    closeIconSize: 24,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    valueFontSize: 16,
    valueLineHeight: 20,
    labelFontSize: 14,
    labelLineHeight: 20,
    helperFontSize: 12,
    helperLineHeight: 14,
    closeIconSize: 20,
  },
};

const WEB_TEXT_INPUT_RESET =
  Platform.OS === 'web'
    ? ({ outlineStyle: 'none' } as any)
    : null;

function ShowPasswordIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 3.33331C5.83333 3.33331 2.27499 5.92498 0.833328 9.58331C2.27499 13.2416 5.83333 15.8333 10 15.8333C14.1667 15.8333 17.725 13.2416 19.1667 9.58331C17.725 5.92498 14.1667 3.33331 10 3.33331ZM10 14.1666C6.84166 14.1666 4.025 12.3916 2.65 9.58331C4.025 6.77498 6.84166 4.99998 10 4.99998C13.1583 4.99998 15.975 6.77498 17.35 9.58331C15.975 12.3916 13.1583 14.1666 10 14.1666ZM10 5.83331C7.93333 5.83331 6.25 7.51665 6.25 9.58331C6.25 11.65 7.93333 13.3333 10 13.3333C12.0667 13.3333 13.75 11.65 13.75 9.58331C13.75 7.51665 12.0667 5.83331 10 5.83331ZM10 11.6666C8.85 11.6666 7.91666 10.7333 7.91666 9.58331C7.91666 8.43331 8.85 7.49998 10 7.49998C11.15 7.49998 12.0833 8.43331 12.0833 9.58331C12.0833 10.7333 11.15 11.6666 10 11.6666Z"
        fill={color}
      />
    </Svg>
  );
}

function HidePasswordIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 5.00002C13.1583 5.00002 15.975 6.77502 17.35 9.58335C16.8583 10.6 16.1667 11.475 15.3417 12.1834L16.5167 13.3584C17.675 12.3334 18.5917 11.05 19.1667 9.58335C17.725 5.92502 14.1667 3.33335 10 3.33335C8.94166 3.33335 7.92499 3.50002 6.96666 3.80835L8.34166 5.18335C8.88333 5.07502 9.43333 5.00002 10 5.00002ZM11.9 8.74169L13.625 10.4667C13.6917 10.1834 13.7417 9.88335 13.7417 9.57502C13.75 7.50835 12.0667 5.83335 10 5.83335C9.69166 5.83335 9.4 5.88335 9.10833 5.95002L10.8333 7.67502C11.3167 7.88335 11.6917 8.26669 11.9 8.74169ZM1.67499 3.22502L3.90833 5.45835C2.55 6.52502 1.47499 7.94169 0.833328 9.58335C2.27499 13.2417 5.83333 15.8334 10 15.8334C11.2667 15.8334 12.4833 15.5917 13.6 15.15L16.45 18L17.625 16.825L2.85 2.04169L1.67499 3.22502ZM7.925 9.47502L10.1 11.65C10.0667 11.6584 10.0333 11.6667 10 11.6667C8.85 11.6667 7.91666 10.7334 7.91666 9.58335C7.91666 9.54169 7.925 9.51669 7.925 9.47502V9.47502ZM5.09166 6.64169L6.55 8.10002C6.35833 8.55835 6.25 9.05835 6.25 9.58335C6.25 11.65 7.93333 13.3334 10 13.3334C10.525 13.3334 11.025 13.225 11.475 13.0334L12.2917 13.85C11.5583 14.05 10.7917 14.1667 10 14.1667C6.84166 14.1667 4.025 12.3917 2.65 9.58335C3.23333 8.39169 4.08333 7.40835 5.09166 6.64169Z"
        fill={color}
      />
    </Svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Input({
  size = 'large',
  label,
  placeholder,
  value,
  prefix,
  suffix,
  secureTextEntry = false,
  helperText,
  optionalLink,
  error = false,
  disabled = false,
  viewOnly = false,
  showCancel = false,
  onChangeText,
  onFocus,
  onBlur,
  onCancel,
  onClear,
  accessibilityLabel,
  autoCapitalize,
  autoComplete,
  autoCorrect,
  keyboardType,
  returnKeyType,
  textContentType,
  testID,
}: InputProps) {
  const { input } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(secureTextEntry);
  const [internalValue, setInternalValue] = useState(value ?? '');
  const inputRef = useRef<TextInput>(null);
  const cfg = SIZE_CONFIG[size];
  const isControlled = value !== undefined && typeof onChangeText === 'function';
  const currentValue = isControlled ? value : internalValue;

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  useEffect(() => {
    setIsPasswordHidden(secureTextEntry);
  }, [secureTextEntry]);

  // ─── State-derived styling helpers ─────────────────────────────────────────
  //
  // Prioridade: disabled > error > viewOnly > focus > default
  // Hover é web-only e não entra no cálculo.

  function getFormContainerStyle(): ViewStyle {
    const base: ViewStyle = {
      borderRadius: input.radius,
      paddingVertical: cfg.paddingVertical,
      paddingHorizontal: cfg.paddingHorizontal,
    };
    if (disabled) {
      return {
        ...base,
        backgroundColor: input.bg.disabled,
        borderWidth: input.borderWidth.default,
        borderColor: input.border.disabled,
      };
    }
    if (error) {
      return {
        ...base,
        backgroundColor: input.bg.default,
        borderWidth: input.borderWidth.default,
        borderColor: input.border.error,
      };
    }
    if (viewOnly) {
      return {
        ...base,
        backgroundColor: input.bg.viewOnly,
        borderWidth: input.borderWidth.default,
        borderColor: input.border.viewOnly,
      };
    }
    if (isFocused) {
      return {
        ...base,
        backgroundColor: input.bg.default,
        borderWidth: input.borderWidth.focus,    // 2px — component.input.border.focus-width
        borderColor: input.border.focus,
      };
    }
    return {
      ...base,
      backgroundColor: input.bg.default,
      borderWidth: input.borderWidth.default,
      borderColor: input.border.default,
    };
  }

  function getLabelColor(): string {
    if (disabled) return input.label.disabled;
    if (error) return input.label.error;
    return input.label.default;
  }

  function getValueColor(): string {
    if (error) return input.value.error;
    return input.value.default;
  }

  function getPrefixSuffixColor(): string {
    if (disabled) return input.prefix.disabled;
    if (error) return input.prefix.error;
    return input.prefix.default;
  }

  function getIconColor(): string {
    if (disabled) return input.icon.disabled;
    if (error) return input.icon.error;
    return input.icon.default;
  }

  function getHelperColor(): string {
    if (disabled) return input.helper.disabled;
    if (error) return input.helper.error;
    return input.helper.default;
  }

  // ─── Event handlers ────────────────────────────────────────────────────────

  function handleFocus() {
    setIsFocused(true);
    onFocus?.();
  }

  function handleBlur() {
    setIsFocused(false);
    onBlur?.();
  }

  function handleChangeText(text: string) {
    if (!isControlled) {
      setInternalValue(text);
    }
    onChangeText?.(text);
  }

  function handleClear() {
    if (!isControlled) {
      setInternalValue('');
    }
    onClear?.();
    inputRef.current?.focus();
  }

  function handleCancel() {
    setIsFocused(false);
    inputRef.current?.blur();
    onCancel?.();
  }

  // ─── Sub-renders ───────────────────────────────────────────────────────────

  /**
   * Conteúdo interno do FormContainer:
   * [Prefix?] · TextInput · [ClearIcon? | Suffix?]
   *
   * Gap entre itens: 4px (spacing.padding.positive.3xs)
   */
  function renderFormContent() {
    // O ícone X aparece no estado Cancel quando há valor e o campo é interativo
    const showClearIcon =
      showCancel && currentValue.length > 0 && !disabled && !viewOnly;

    return (
      <View style={styles.formContent}>
        {prefix ? (
          <Text
            style={[
              styles.affixText,
              {
                fontSize: cfg.valueFontSize,
                lineHeight: cfg.valueLineHeight,
                color: getPrefixSuffixColor(),
              },
            ]}
            accessibilityElementsHidden
          >
            {prefix}
          </Text>
        ) : null}

        <TextInput
          ref={inputRef}
          style={[
            styles.textInput,
            {
              fontSize: cfg.valueFontSize,
              lineHeight: cfg.valueLineHeight,
              color: getValueColor(),
            },
            WEB_TEXT_INPUT_RESET,
          ]}
          value={currentValue}
          placeholder={placeholder}
          placeholderTextColor={input.placeholder}
          editable={!disabled && !viewOnly}
          secureTextEntry={secureTextEntry && isPasswordHidden}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          textContentType={textContentType}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          accessibilityLabel={accessibilityLabel ?? label}
          accessibilityHint={helperText}
          accessibilityState={{ disabled }}
          testID={testID}
        />

        {showClearIcon ? (
          <Pressable
            onPress={handleClear}
            accessibilityRole="button"
            accessibilityLabel="Limpar campo"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <CloseIcon size={cfg.closeIconSize} color={input.value.default} />
          </Pressable>
        ) : suffix ? (
          <Text
            style={[
              styles.affixText,
              {
                fontSize: cfg.valueFontSize,
                lineHeight: cfg.valueLineHeight,
                color: getPrefixSuffixColor(),
              },
            ]}
            accessibilityElementsHidden
          >
            {suffix}
          </Text>
        ) : secureTextEntry ? (
          <Pressable
            onPress={() => setIsPasswordHidden((current) => !current)}
            accessibilityRole="button"
            accessibilityLabel={isPasswordHidden ? 'Mostrar senha' : 'Ocultar senha'}
            disabled={disabled || viewOnly}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {isPasswordHidden ? (
              <ShowPasswordIcon color={getIconColor()} />
            ) : (
              <HidePasswordIcon color={getIconColor()} />
            )}
          </Pressable>
        ) : null}
      </View>
    );
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <View style={styles.wrapper}>
      {/* ── Label row ─────────────────────────────────────────────────────── */}
      {label ? (
        <View style={styles.labelRow}>
          <Text
            style={[
              styles.label,
              {
                fontSize: cfg.labelFontSize,
                lineHeight: cfg.labelLineHeight,
                color: getLabelColor(),
              },
            ]}
            numberOfLines={1}
          >
            {label}
          </Text>

          {optionalLink ? (
            <Pressable
              onPress={optionalLink.onPress}
              accessibilityRole="link"
              hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
            >
              <Text
                style={[styles.optionalLinkText, { color: input.cancel.text }]}
              >
                {optionalLink.text}
              </Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}

      {/* ── Form row (FormContainer + optional "Cancelar" button) ─────────── */}
      {showCancel ? (
        /*
         * Estado Cancel: FormContainer tem flex:1 e "Cancelar" fica à direita.
         * Gap entre os dois: 8px (spacing.padding.positive.2xs)
         * Spec: specs/input.md seção "State: Cancel"
         */
        <View style={styles.cancelRow}>
          <View
            style={[
              styles.formContainer,
              getFormContainerStyle(),
              styles.formContainerFlex,
            ]}
            accessibilityRole="none"
          >
            {renderFormContent()}
          </View>

          <Pressable
            onPress={handleCancel}
            accessibilityRole="button"
            accessibilityLabel="Cancelar"
            hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
          >
            <Text
              style={[styles.cancelButtonText, { color: input.cancel.text }]}
            >
              Cancelar
            </Text>
          </Pressable>
        </View>
      ) : (
        <View
          style={[styles.formContainer, getFormContainerStyle()]}
          accessibilityRole="none"
        >
          {renderFormContent()}
        </View>
      )}

      {/* ── Helper text ───────────────────────────────────────────────────── */}
      {helperText ? (
        <Text
          style={[
            styles.helperText,
            {
              fontSize: cfg.helperFontSize,
              lineHeight: cfg.helperLineHeight,
              color: getHelperColor(),
            },
          ]}
        >
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  /**
   * Wrapper vertical — empilha Label + FormContainer + Helper.
   * gap: 8px = spacing.padding.positive.2xs
   */
  wrapper: {
    gap: 8,
  },

  /**
   * Label row — Label à esquerda (flex:1) e OptionalLink à direita.
   */
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,  // spacing.padding.positive.3xs
  },

  /**
   * Label text — Be Vietnam Pro Bold.
   * flex:1 garante que o OptionalLink é empurrado para a direita.
   */
  label: {
    flex: 1,
    fontFamily: 'BeVietnamPro_700Bold',
    fontWeight: '700',
    includeFontPadding: false,
  },

  /**
   * Link opcional ao lado do label (ex: "Esqueci a senha").
   * Cor injetada via inline style com input.cancel.text (primary.action).
   */
  optionalLinkText: {
    fontFamily: 'BeVietnamPro_700Bold',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16,
    includeFontPadding: false,
  },

  /**
   * FormContainer — container com borda e fundo do campo.
   * borderWidth, borderColor, borderRadius, padding e backgroundColor
   * são todos injetados dinamicamente via getFormContainerStyle().
   */
  formContainer: {
    borderStyle: 'solid',
    justifyContent: 'center',
  },

  /** Versão flex:1 do FormContainer — usada no layout Cancel */
  formContainerFlex: {
    flex: 1,
  },

  /**
   * Row horizontal que agrupa FormContainer + botão "Cancelar".
   * gap: 8px = spacing.padding.positive.2xs
   */
  cancelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  /**
   * Conteúdo interno do FormContainer — row com Prefix + TextInput + Suffix/ClearIcon.
   * gap: 4px = spacing.padding.positive.3xs
   */
  formContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  /**
   * TextInput — ocupa o espaço restante (flex:1).
   * padding/margin zerados para remover defaults do Android.
   * Fonte: Be Vietnam Pro Regular (Mobile/Input style).
   * Nota: Weight 500 (Medium) é especificado no Figma Desktop/Input.
   *       Para React Native mobile usa-se Regular (400) conforme Mobile/Input.
   */
  textInput: {
    flex: 1,
    fontFamily: 'BeVietnamPro_400Regular',
    fontWeight: '400',
    padding: 0,
    margin: 0,
    borderWidth: 0,
    includeFontPadding: false,
  },

  /**
   * Prefix e Suffix compartilham o mesmo estilo base.
   * Cor injetada via inline style (component.input.prefix.*).
   * Fonte: Be Vietnam Pro Regular — Mobile/Input variant.
   */
  affixText: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontWeight: '400',
    includeFontPadding: false,
  },

  /**
   * Helper text abaixo do campo.
   * Cor muda por estado: default → disabled → error.
   */
  helperText: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontWeight: '400',
    includeFontPadding: false,
  },

  /**
   * Botão de texto "Cancelar" — fica à direita do FormContainer no estado Cancel.
   * Be Vietnam Pro Bold 14px / lineHeight 20px.
   * Cor injetada via inline style (component.input.cancel.text = primary.action).
   */
  cancelButtonText: {
    fontFamily: 'BeVietnamPro_700Bold',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 20,
    includeFontPadding: false,
  },
});
