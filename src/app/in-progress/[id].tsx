import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { router, useFocusEffect, useLocalSearchParams } from "expo-router"
import { useCallback, useState } from "react"
import { Alert, View } from "react-native"

import { Button } from "@/components/Button"
import { List } from "@/components/List"
import { Loading } from "@/components/Loading"
import { PageHeader } from "@/components/PageHeader"
import { Progress } from "@/components/Progress"
import { Transaction, TransactionProps } from "@/components/Transaction"
import { useTargetDatabase } from "@/database/use-target-database"
import { useTransactionDatabase } from "@/database/use-transaction-database"
import { formatCurrency } from "@/utils/format-currency"
import { TransactionTypes } from "@/utils/TransactionTypes"

dayjs.extend(utc)
dayjs.extend(timezone)

export default function InProgress() {
  const [details, setDetails] = useState({
    name: "",
    current: "",
    target: "",
    percentage: "",
  })
  const [isFetching, setIsFetching] = useState(true)
  const [transactions, setTransactions] = useState<TransactionProps[]>([])

  const params = useLocalSearchParams<{ id: string }>()

  const targetDb = useTargetDatabase()
  const transactionDb = useTransactionDatabase()

  async function fetchTargetDetails() {
    try {
      const response = await targetDb.show(Number(params.id))

      if (response) {
        setDetails({
          name: response.name,
          current: formatCurrency(response.current),
          percentage: (response.percentage / 100).toLocaleString("pt-br", {
            style: "percent",
            maximumFractionDigits: 0,
          }),
          target: formatCurrency(response.amount),
        })
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes da meta")
      console.log(error)
    }
  }

  async function fetchTransactions() {
    try {
      const response = await transactionDb.listByTargetId(Number(params.id))

      setTransactions(
        response.map(item => ({
          id: String(item.id),
          target_id: String(item.target_id),
          value: formatCurrency(item.amount),
          date: new Date(item.created_at).toLocaleString("pt-br", {
            dateStyle: "short",
            timeStyle: "short",
          }),
          description: item.observation,
          type:
            item.amount < 0 ? TransactionTypes.output : TransactionTypes.input,
        })),
      )
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as transações.")
      console.log(error)
    }
  }

  async function fetchData() {
    const detailsData = fetchTargetDetails()
    const transactionsData = fetchTransactions()

    await Promise.all([detailsData, transactionsData])

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
