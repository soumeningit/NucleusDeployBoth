import { AuthContextProvider } from "./AuthContext";
import { OTPContextProvider } from "./OTPContext";

function RootContextProvider({ children }) {
  return (
    <>
      <AuthContextProvider>
        <OTPContextProvider>{children}</OTPContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default RootContextProvider;
