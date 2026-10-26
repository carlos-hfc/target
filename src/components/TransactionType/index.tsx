import { View } from "react-native"

import { colors } from "@/theme"
import { TransactionTypes } from "@/utils/TransactionTypes"

import { Option } from "./option"
import { styles } from "./styles"

interface Props {
  selected: TransactionTypes
  onChange(type: TransactionTypes): void
}

export function TransactionType({ onChange, selected }: Props) {
  return (
    <View style={styles.container}>
      <Option
        icon="arrow-upward"
        title="Guardar"
        isSelected={selected === TransactionTypes.input}
        selectedColor={colors.blue[500]}
        onPress={() => onChange(TransactionTypes.input)}
      />

      <Option
        icon="arrow-downward"
        title="Resgatar"
        isSelected={selected === TransactionTypes.output}
        selectedColor={colors.red[400]}
        onPress={() => onChange(TransactionTypes.output)}
      />
    </View>
  )
}
