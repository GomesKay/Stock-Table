import { Route, Routes } from "react-router"

import { Home } from "./pages/home"
import { Table } from "./pages/table"

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/table" element={<Table />} />
    </Routes>
  )
}
