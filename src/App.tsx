import { BrowserRouter } from "react-router"

import { Router } from "./router"

import { Toaster } from "sonner"

export function App() {
  return (
    <BrowserRouter>
      <Router />

      <Toaster richColors />
    </BrowserRouter>
  )
}
