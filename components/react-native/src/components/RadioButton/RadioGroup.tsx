import React, { createContext, useContext } from 'react';
import { View, ViewProps } from 'react-native';

interface RadioGroupContextValue {
  value?: string;
  onChange?: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue>({});

export function useRadioGroup(): RadioGroupContextValue {
  return useContext(RadioGroupContext);
}

export interface RadioGroupProps extends ViewProps {
  /** Currently selected option value. */
  value?: string;
  /** Called when the user selects an option. */
  onChange?: (value: string) => void;
  children: React.ReactNode;
}

/**
 * Groups `RadioButton` items for single-selection forms and bottom sheets.
 */
export function RadioGroup({
  value,
  onChange,
  children,
  style,
  testID,
  ...rest
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onChange }}>
      <View
        accessibilityRole="radiogroup"
        style={style}
        testID={testID}
        {...rest}
      >
        {children}
      </View>
    </RadioGroupContext.Provider>
  );
}
