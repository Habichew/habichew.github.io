import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet, View, ViewStyle, TextStyle } from 'react-native';

type Option = {
  label: string;
  value: string;
};

export default function CustomDropdown({
  items,
  value,
  setValue,
  placeholder,
  zIndex = 1000,
  zIndexInverse = 500,   
  style = {},
}: {
  items: Option[];
  value: string | null;
  setValue: (val: string | null) => void;
  placeholder?: string;
  zIndex?: number;
  zIndexInverse?: number;
  backgroundColor?: string;
  textColor?: string;
  placeholderColor?: string;
  style?: ViewStyle;
}) {
  const [open, setOpen] = useState(false);

  return (
    <View style={[styles.wrapper, { zIndex }, style]}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={(valOrCallback) => {
          if (typeof valOrCallback === 'function') {
            const result = valOrCallback(value);
            setValue(result);
          } else {
            setValue(valOrCallback);
          }
        }}
        placeholder={placeholder || 'Select an option'}
        style={styles.dropdown}
        textStyle={styles.text}
        dropDownContainerStyle={styles.dropdownContainer}
        listItemLabelStyle={styles.text}
        placeholderStyle={styles.placeholder}
        showArrowIcon={true}
        zIndex={zIndex}
        zIndexInverse={zIndexInverse}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  dropdown: {
    borderRadius: 24,
    borderWidth: 0,              
    backgroundColor: '#ffffff',
    height: 48,
    shadowColor: 'transparent', 
  },
  dropdownContainer: {
    borderRadius: 16,
    borderWidth: 0,
    backgroundColor: '#ffffff',
    shadowColor: 'transparent',
  },
  text: {
    fontWeight:'bold',
    fontSize: 16,
    color: '#000',
  },
  placeholder: {
    // textAlign:'center',
    fontWeight:'bold',
    color: '#bbbbbb',
  },
  arrow: {
    tintColor: '#DAB7FF', 
  },
});
