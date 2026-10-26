import { useSQLiteContext } from "expo-sqlite"

export interface TransactionCreate {
  target_id: number
  amount: number
  observation?: string
}

export function useTransactionDatabase() {
  const database = useSQLiteContext()

  async function create(data: TransactionCreate) {
    const statement = await database.prepareAsync(
      /* SQL */ `INSERT INTO transactions (target_id, amount, observation) VALUES ($target_id, $amount, $observation)`,
    )

    statement.executeAsync({
      $target_id: data.target_id,
      $amount: data.amount,
      $observation: data.observation ?? null,
    })
  }

  return {
    create,
  }
}
