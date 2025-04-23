import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Toaster
        position="bottom-right"
        richColors
        closeButton
        visibleToasts={3}
        offset="16px"
      />
    </>
  );
}

export default App;
