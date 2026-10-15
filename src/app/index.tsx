import { router } from "expo-router"
import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Button } from "@/components/Button"
import { HomeHeader } from "@/components/HomeHeader"
import { List } from "@/components/List"
import { Target } from "@/components/Target"

const summary = {
  total: "R$ 2680,00",
  input: { label: "Entradas", value: "R$ 6800,00" },
  output: { label: "Saídas", value: "-R$ 800,00" },
}

const targets = [
  {
    id: "1",
    name: "Cadeira ergonômica",
    percentage: "75%",
    current: "R$ 900,00",
    target: "R$ 1200,00",
  },
  {
    id: "2",
    name: "Apple Watch",
    percentage: "50%",
    current: "R$ 580,00",
    target: "R$ 1790,00",
  },
  {
    id: "3",
    name: "Viagem para RJ",
    percentage: "50%",
    current: "R$ 1200,00",
    target: "R$ 3000,00",
  },
]

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeHeader data={summary} />

      <List
        title="Metas"
        keyExtractor={item => item.id}
        data={targets}
        renderItem={({ item }) => (
          <Target
            data={item}
            onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />
        )}
        emptyMessage="Nenhuma meta. Toque em nova meta para criar."
        containerStyle={{ paddingHorizontal: 24 }}
      />

      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button
          title="Nova meta"
          onPress={() => router.navigate("/target")}
        />
      </View>
    </SafeAreaView>
  )
}
