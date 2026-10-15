import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"

export default function InProgress() {
  const params = useLocalSearchParams<{ id: string }>()

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text>ID: {params.id}</Text>
    </View>
  )
}
