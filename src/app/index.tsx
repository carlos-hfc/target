import { router } from "expo-router"
import { Button, Text, View } from "react-native"

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text>Index</Text>

      <Button
        title="Target"
        onPress={() => router.navigate("/target")}
      />
      <Button
        title="Transaction"
        onPress={() => router.navigate("/transaction/1")}
      />
      <Button
        title="InProgress"
        onPress={() => router.navigate("/in-progress/2")}
      />
    </View>
  )
}
