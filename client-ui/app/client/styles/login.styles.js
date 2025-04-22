import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/Constant";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.active,
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: COLORS.subTextColor,
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 12,
  },
  forgotPassword: {
    alignItems: "flex-end",
    marginTop: 6,
  },
  forgotPasswordText: {
    color: COLORS.active,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: COLORS.active,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 10,
    elevation: 4,
    shadowColor: COLORS.active,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  loginText: {
    fontSize: 18,
    color: COLORS.whiteTextColor,
    fontWeight: "700",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  registerText: {
    fontSize: 15,
    color: COLORS.subTextColor,
  },
  registerLink: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.active,
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: "#D1D5DB",
  },
  separatorText: {
    width: 50,
    textAlign: "center",
    color: "#6B7280",
    fontWeight: "500",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  socialIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginHorizontal: 10,
  },
});
