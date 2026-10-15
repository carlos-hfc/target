import { MaterialIcons } from "@expo/vector-icons"
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native"

import { styles } from "./styles"

export interface TargetProps {
  id?: string
  name: string
  percentage: string
  current: string
  target: string
}

interface Props extends TouchableOpacityProps {
  data: TargetProps
}

export function Target({ data, style, ...props }: Props) {
  return (
    <TouchableOpacity
      {...props}
      style={[styles.container, style]}
    >
      <View style={styles.content}>
        <Text
          style={styles.name}
          numberOfLines={1}
        >
          {data.name}
        </Text>

        <Text style={styles.status}>
          {data.percentage} • {data.current} de {data.target}
        </Text>
      </View>

      <MaterialIcons
        name="chevron-right"
        size={20}
      />
    </TouchableOpacity>
  )
}
