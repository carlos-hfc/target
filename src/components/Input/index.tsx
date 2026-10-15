import { Text, TextInput, TextInputProps, View } from "react-native"

import { colors } from "@/theme"

import { styles } from "./styles"

interface Props extends TextInputProps {
  label: string
}

export function Input({ label, style, ...props }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={colors.gray[400]}
        {...props}
      />
    </View>
  )
}
