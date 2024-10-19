import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "./components/themeProvider.jsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <BrowserRouter>
          <StrictMode>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </StrictMode>
        </BrowserRouter>
      </Provider>
    </PersistGate>
  </QueryClientProvider>
);
