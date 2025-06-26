import { BrowserRouter } from "react-router"
import { Toaster } from "sonner"

import { Router } from "./router"

export function App() {
  return (
    <BrowserRouter>
      <Router />

      <Toaster richColors />
    </BrowserRouter>
  )
}
