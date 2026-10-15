import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"

import { colors } from "@/theme"

import { styles } from "./styles"

interface Props extends TouchableOpacityProps {
  title: string
  isProcessing?: boolean
}

export function Button({
  title,
  isProcessing = false,
  style,
  ...props
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.8}
      disabled={isProcessing}
      {...props}
    >
      <Text style={styles.title}>
        {isProcessing ? <ActivityIndicator color={colors.white} /> : title}
      </Text>
    </TouchableOpacity>
  )
}
