import { MaterialIcons } from "@expo/vector-icons"
import { ColorValue, Pressable, PressableProps, Text } from "react-native"

import { colors } from "@/theme"

import { styles } from "./styles"

interface Props extends PressableProps {
  isSelected: boolean
  title: string
  icon: keyof typeof MaterialIcons.glyphMap
  selectedColor: ColorValue
}

export function Option({
  icon,
  isSelected,
  selectedColor,
  title,
  ...props
}: Props) {
  return (
    <Pressable
      style={[styles.option, isSelected && { backgroundColor: selectedColor }]}
      {...props}
    >
      <MaterialIcons
        name={icon}
        size={24}
        color={isSelected ? colors.white : colors.gray[500]}
      />

      <Text style={[styles.title, isSelected && { color: colors.white }]}>
        {title}
      </Text>
    </Pressable>
  )
}
