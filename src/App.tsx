import { useState } from "react";
import { useApp } from "./context/AppContext";
import { Header } from "./components/layout/Header";
import { ChatPage } from "./pages/ChatPage";
import { DashboardPage } from "./pages/DashboardPage";
import { SettingsPage } from "./pages/SettingsPage";
import { Spinner } from "./components/ui/Spinner";

export default function App() {
  const { authLoading } = useApp();
  const [currentPage, setCurrentPage] = useState("chat");

  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Connecting to ParcelPilot...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-950">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 min-h-0">
        {currentPage === "chat" && <ChatPage />}
        {currentPage === "dashboard" && <DashboardPage />}
        {currentPage === "settings" && <SettingsPage />}
      </div>
    </div>
  );
}
