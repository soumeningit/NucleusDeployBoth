import { createContext, useState } from "react";

const OtpContext = createContext();

function OTPContextProvider({ children }) {
  const [otpData, setOtpData] = useState({});
  return (
    <OtpContext.Provider value={{ otpData, setOtpData }}>
      {children}
    </OtpContext.Provider>
  );
}

export { OTPContextProvider };
export default OtpContext;
