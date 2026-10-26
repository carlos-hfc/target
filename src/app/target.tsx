import { router, useLocalSearchParams } from "expo-router"
import { useCallback, useEffect, useState } from "react"
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native"

import { Button } from "@/components/Button"
import { CurrencyInput } from "@/components/CurrencyInput"
import { Input } from "@/components/Input"
import { PageHeader } from "@/components/PageHeader"
import { useTargetDatabase } from "@/database/use-target-database"

export default function Target() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [name, setName] = useState("")
  const [amount, setAmount] = useState(0)

  const params = useLocalSearchParams<{ id?: string }>()
  const targetDb = useTargetDatabase()

  function handleSave() {
    if (!name.trim() || amount <= 0) {
      return Alert.alert(
        "Atenção",
        "Preencha nome e o valor precisa ser maior que zero.",
      )
    }

    setIsProcessing(true)

    if (params.id) {
      update()
    } else {
      create()
    }
  }

  async function update() {
    try {
      await targetDb.update({
        id: Number(params.id),
        name,
        amount,
      })

      Alert.alert("Sucesso", "Meta atualizada com sucesso!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ])
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar a meta")
    } finally {
      setIsProcessing(false)
    }
  }

  async function create() {
    try {
      await targetDb.create({ name, amount })

      Alert.alert("Nova meta", "Meta criada com sucesso!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ])
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a meta")
      console.log(error)
    } finally {
      setIsProcessing(false)
    }
  }

  function handleRemove() {
    if (!params.id) return

    Alert.alert("Remover", "Deseja realmente remover?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: remove,
      },
    ])
  }

  async function remove() {
    setIsProcessing(true)

    try {
      await targetDb.remove(Number(params.id))

      Alert.alert("Meta", "Meta removida!", [
        {
          text: "OK",
          onPress: () => router.replace("/"),
        },
      ])
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover a meta")
      console.log(error)
    } finally {
      setIsProcessing(false)
    }
  }

  const fetchDetails = useCallback(async (id: number) => {
    try {
      const response = await targetDb.show(id)

      setName(response?.name ?? "")
      setAmount(response?.amount ?? 0)
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes da meta")
    } finally {
      setIsProcessing(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (params.id) {
      fetchDetails(Number(params.id))
    }
  }, [fetchDetails, params.id])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, padding: 24 }}>
          <PageHeader
            title="Meta"
            subtitle="Economize para alcançar sua meta financeira."
            rightButton={
              params.id
                ? {
                    icon: "delete",
                    onPress: handleRemove,
                  }
                : undefined
            }
          />

          <View style={{ marginTop: 32, gap: 24 }}>
            <Input
              label="Nome da meta"
              placeholder="Ex.: Viagem para a praia, Apple Watch"
              value={name}
              onChangeText={setName}
            />

            <CurrencyInput
              label="Valor alvo (R$)"
              value={amount}
              onChangeValue={value => setAmount(value ?? 0)}
            />

            <Button
              title="Salvar"
              onPress={handleSave}
              isProcessing={isProcessing}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
