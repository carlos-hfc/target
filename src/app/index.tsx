import { View } from "react-native"

import { HomeHeader } from "@/components/HomeHeader"

const summary = {
  total: "R$ 2680,00",
  input: { label: "Entradas", value: "R$ 6800,00" },
  output: { label: "Saídas", value: "-R$ 800,00" },
}

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <HomeHeader data={summary} />
    </View>
  )
}
