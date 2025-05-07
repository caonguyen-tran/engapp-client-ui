import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/Constant";

export const introStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    marginTop: 20,
  },
  appName: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.active,
    letterSpacing: 1,
  },
  slogan: {
    fontSize: 18,
    color: COLORS.subTextColor,
    marginTop: 6,
    fontWeight: "500",
  },
  btnStyle: {
    backgroundColor: COLORS.active,
    width: "100%",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.active,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  textStyle: {
    fontSize: 20,
    color: COLORS.whiteTextColor,
    fontWeight: "600",
  },
}); 