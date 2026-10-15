import { Text, View } from "react-native"
import Input, { CurrencyInputProps } from "react-native-currency-input"

import { colors } from "@/theme"

import { styles } from "./styles"

interface Props extends CurrencyInputProps {
  label: string
}

export function CurrencyInput({ label, style, ...props }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Input
        style={[styles.input, style]}
        placeholderTextColor={colors.gray[400]}
        prefix="R$ "
        delimiter="."
        separator=","
        precision={2}
        minValue={0}
        {...props}
      />
    </View>
  )
}
