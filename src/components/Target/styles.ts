import { StyleSheet } from "react-native"

import { colors, fontFamily } from "@/theme"

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 16,
  },
  content: {
    flex: 1,
    gap: 7,
  },
  name: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fontFamily.medium,
  },
  status: {
    fontSize: 10,
    color: colors.gray[500],
    fontFamily: fontFamily.regular,
  },
})
