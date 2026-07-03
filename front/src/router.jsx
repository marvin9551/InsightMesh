import { createBrowserRouter } from "react-router-dom";

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

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/features", element: <FeaturesPage /> },
  { path: "/how", element: <HowPage /> },
  { path: "/cases", element: <CasesPage /> },
  { path: "/create", element: <CreatePage /> },
  { path: "/execution", element: <ExecutionPage /> },
  { path: "/report", element: <ReportPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/states/loading", element: <LoadingState /> },
  { path: "/states/empty", element: <EmptyState /> },
  { path: "/states/error", element: <ErrorState /> },
  { path: "/states/network", element: <NetworkState /> },
  { path: "/states/permission", element: <PermissionState /> },
]);

export default router;
