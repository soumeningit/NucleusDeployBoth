import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RootContextProvider from "./context/RootCOntextProvider.jsx";
import "prismjs/themes/prism.css";
import "prismjs/themes/prism-tomorrow.css";

createRoot(document.getElementById("root")).render(
  <RootContextProvider>
    <BrowserRouter>
      <Toaster />
      <App />
    </BrowserRouter>
  </RootContextProvider>
);
