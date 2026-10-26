import { router, useFocusEffect, useLocalSearchParams } from "expo-router"
import { useCallback, useState } from "react"
import { Alert, View } from "react-native"

import { Button } from "@/components/Button"
import { List } from "@/components/List"
import { Loading } from "@/components/Loading"
import { PageHeader } from "@/components/PageHeader"
import { Progress } from "@/components/Progress"
import { Transaction } from "@/components/Transaction"
import { useTargetDatabase } from "@/database/use-target-database"
import { formatCurrency } from "@/utils/format-currency"
import { TransactionTypes } from "@/utils/TransactionTypes"

const transactions = [
  {
    id: "1",
    value: "R$ 300,00",
    date: "12/12/12",
    description: "CDB de 110% no banco XPTO",
    type: TransactionTypes.input,
  },
  {
    id: "2",
    value: "R$ 100,00",
    date: "04/12/12",
    type: TransactionTypes.output,
  },
]

export default function InProgress() {
  const [details, setDetails] = useState({
    name: "",
    current: "",
    target: "",
    percentage: "",
  })
  const [isFetching, setIsFetching] = useState(true)

  const params = useLocalSearchParams<{ id: string }>()

  const targetDb = useTargetDatabase()

  async function fetchDetails() {
    try {
      const response = await targetDb.show(Number(params.id))

      if (response) {
        setDetails({
          name: response.name,
          current: formatCurrency(response.current),
          percentage: response.percentage.toLocaleString("pt-br", {
            style: "percent",
            maximumFractionDigits: 0,
          }),
          target: formatCurrency(response.amount),
        })
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes da meta")
      console.log(error)
    } finally {
      setIsFetching(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchDetails()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  )

  if (isFetching) return <Loading />

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title={details.name}
        rightButton={{
          icon: "edit",
          onPress: () => router.navigate(`/target?id=${params.id}`),
        }}
      />

      <Progress data={details} />

      <List
        title="Transações"
        data={transactions}
        renderItem={({ item }) => (
          <Transaction
            data={item}
            onRemove={() => {}}
          />
        )}
        emptyMessage="Nenhuma transação. Toque em nova transação para guardar o seu dinheiro aqui."
      />

      <View style={{ paddingBottom: 64 }}>
        <Button
          title="Nova transação"
          onPress={() => router.navigate(`/transaction/${params.id}`)}
        />
      </View>
    </View>
  )
}
