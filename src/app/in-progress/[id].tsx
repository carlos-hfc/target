import { router, useLocalSearchParams } from "expo-router"
import { View } from "react-native"

import { Button } from "@/components/Button"
import { List } from "@/components/List"
import { PageHeader } from "@/components/PageHeader"
import { Progress } from "@/components/Progress"
import { Transaction } from "@/components/Transaction"
import { TransactionTypes } from "@/utils/TransactionTypes"

const details = {
  current: "R$ 900,00",
  target: "R$ 1780,00",
  percentage: 50,
}

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
  const params = useLocalSearchParams<{ id: string }>()

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title="Apple Watch"
        rightButton={{
          icon: "edit",
          onPress() {},
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
