import { router, useFocusEffect } from "expo-router"
import { useCallback, useState } from "react"
import { Alert, View } from "react-native"

import { Button } from "@/components/Button"
import { HomeHeader } from "@/components/HomeHeader"
import { List } from "@/components/List"
import { Loading } from "@/components/Loading"
import { Target, TargetProps } from "@/components/Target"
import { useTargetDatabase } from "@/database/use-target-database"
import { formatCurrency } from "@/utils/format-currency"

const summary = {
  total: "R$ 2680,00",
  input: { label: "Entradas", value: "R$ 6800,00" },
  output: { label: "Saídas", value: "-R$ 800,00" },
}

export default function Index() {
  const [targets, setTargets] = useState<TargetProps[]>([])
  const [isFetching, setIsFetching] = useState(true)

  const targetDb = useTargetDatabase()

  async function fetchTargets() {
    try {
      const response = await targetDb.listBySavedValue()

      return response.map(item => ({
        ...item,
        id: String(item.id),
        percentage: (item.percentage / 100).toLocaleString("pt-br", {
          style: "percent",
          maximumFractionDigits: 0,
        }),
        current: formatCurrency(item.current),
        target: formatCurrency(item.amount),
      }))
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as metas")
      console.log(error)
      return []
    }
  }

  async function fetchData() {
    const targetData = fetchTargets()

    const [target] = await Promise.all([targetData])

    setTargets(target)
    setIsFetching(false)
  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  )

  if (isFetching) return <Loading />

  return (
    <View style={{ flex: 1 }}>
      <HomeHeader data={summary} />

      <List
        title="Metas"
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

      <View style={{ padding: 24, paddingBottom: 64 }}>
        <Button
          title="Nova meta"
          onPress={() => router.navigate("/target")}
        />
      </View>
    </View>
  )
}
