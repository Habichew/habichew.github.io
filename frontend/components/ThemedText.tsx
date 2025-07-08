import { StyleSheet, Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  type?: 'h1' | 'h2' | 'body' | 'caption' | 'buttonText';
};

export function ThemedText({
  style,
  type = 'body',
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={[
        styles[type],
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  h1: {
    fontFamily: 'Lalezar',
    fontSize: 24,
    lineHeight: 32,
  },
  h2: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    lineHeight: 28,
    color: '#000',
  },
  body: {
    fontFamily: 'Poppins',
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  caption: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
  },
});
