import { useSQLiteContext } from "expo-sqlite"

export interface TargetCreate {
  name: string
  amount: number
}

export interface TargetResponse {
  id: number
  name: string
  amount: number
  current: number
  percentage: number
  created_at: Date
  updated_at: Date
}

export interface TargetUpdate extends TargetCreate {
  id: number
}

export function useTargetDatabase() {
  const database = useSQLiteContext()

  async function create(data: TargetCreate) {
    const statement = await database.prepareAsync(
      /* SQL */ `INSERT INTO targets (name, amount) VALUES ($name, $amount)`,
    )

    statement.executeAsync({
      $name: data.name,
      $amount: data.amount,
    })
  }

  async function listBySavedValue() {
    return await database.getAllAsync<TargetResponse>(/* SQL */ `
        SELECT
          t.id,
          t.name,
          t.amount,
          COALESCE(SUM(tr.amount), 0) current,
          COALESCE((SUM(tr.amount) / t.amount) * 100, 0) percentage,
          t.created_at,
          t.updated_at
        FROM targets t
        LEFT JOIN transactions tr ON tr.target_id = t.id
        GROUP BY t.id, t.name, t.amount, t.created_at, t.updated_at
        ORDER BY current DESC
      `)
  }

  async function show(id: number) {
    return await database.getFirstAsync<TargetResponse>(/* SQL */ `
        SELECT
          t.id,
          t.name,
          t.amount,
          COALESCE(SUM(tr.amount), 0) current,
          COALESCE((SUM(tr.amount) / t.amount) * 100, 0) percentage,
          t.created_at,
          t.updated_at
        FROM targets t
        LEFT JOIN transactions tr ON tr.target_id = t.id
        WHERE t.id = ${id}
      `)
  }

  async function update(data: TargetUpdate) {
    const statement = await database.prepareAsync(/* SQL */ `
        UPDATE targets SET
          name = $name,
          amount = $amount,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $id
      `)

    statement.executeAsync({
      $id: data.id,
      $amount: data.amount,
      $name: data.name,
    })
  }

  async function remove(id: number) {
    database.runAsync(/* SQL */ `DELETE FROM targets WHERE id = ?`, id)
  }

  return {
    create,
    listBySavedValue,
    show,
    update,
    remove,
  }
}
