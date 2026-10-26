import { router, useLocalSearchParams } from "expo-router"
import { useState } from "react"
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
    } else {
      create()
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
