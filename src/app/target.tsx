import {
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

export default function Target() {
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
            />

            <CurrencyInput
              label="Valor alvo (R$)"
              value={0}
            />

            <Button title="Salvar" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
