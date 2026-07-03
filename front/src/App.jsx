import { RouterProvider } from "react-router-dom";
import router from "./router";

export default function App() {
  return <RouterProvider router={router} />;
}
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import FeaturesPage from "./pages/FeaturesPage";
import HowPage from "./pages/HowPage";
import CasesPage from "./pages/CasesPage";
import CreatePage from "./pages/CreatePage";
import ExecutionPage from "./pages/ExecutionPage";
import ReportPage from "./pages/ReportPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import LoadingState from "./pages/states/LoadingState";
import EmptyState from "./pages/states/EmptyState";
import ErrorState from "./pages/states/ErrorState";
import NetworkState from "./pages/states/NetworkState";
import PermissionState from "./pages/states/PermissionState";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/how" element={<HowPage />} />
      <Route path="/cases" element={<CasesPage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/execution" element={<ExecutionPage />} />
      <Route path="/report" element={<ReportPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/states/loading" element={<LoadingState />} />
      <Route path="/states/empty" element={<EmptyState />} />
      <Route path="/states/error" element={<ErrorState />} />
      <Route path="/states/network" element={<NetworkState />} />
      <Route path="/states/permission" element={<PermissionState />} />
    </Routes>
  );
}
