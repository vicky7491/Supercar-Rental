
import { BrowserRouter, RouterProvider } from "react-router-dom"

import Login from "./pages/auth/Login"
import AppRoutes from "./routes/routes"


function App() {
  return (
    <BrowserRouter>
    <AppRoutes/>
    </BrowserRouter>
  )
}

export default App
