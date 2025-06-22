import { Route, Routes } from "react-router"

import { Dashboard } from "./pages/dashboard"
import { Home } from "./pages/home"

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/table" element={<Dashboard />} />
    </Routes>
  )
}
