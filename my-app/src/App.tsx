import { Routes, Route } from "react-router-dom"
import { Sidebar } from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import ThreatRisks from "./pages/ThreatRisks"
import SanctionChecks from "./pages/SanctionChecks"
import ApprovalRisks from "./pages/ApprovalRisk"
import ExposureRisk from "./pages/ExposureRisk"
import ContractRisk from "./pages/ContractRisk"
import UrlRisks from "./pages/UrlRisk"

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 w-full overflow-auto bg-[#0a0e14]">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/threat-risks" element={<ThreatRisks />} />
          <Route path="/sanction-checks" element={<SanctionChecks />} />
          <Route path="/approval-risks" element={<ApprovalRisks />} />
          <Route path="/exposure-risk" element={<ExposureRisk />} />
          <Route path="/contract-risk" element={<ContractRisk />} />
          <Route path="/url-risks" element={<UrlRisks />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
