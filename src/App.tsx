import React from 'react';
import { useApp } from './contexts/AppContext';
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import CommandPalette from './components/common/CommandPalette';
import DashboardView from './components/dashboard/DashboardView';
import ProductsView from './components/products/ProductsView';
import SalesOrdersView from './components/sales/SalesOrdersView';
import SuppliersView from './components/suppliers/SuppliersView';
import AIWorkspaceView from './components/ai-workspace/AIWorkspaceView';
import SettingsView from './components/settings/SettingsView';

export default function App() {
  const { 
    darkMode, 
    currentView, 
    cmdPaletteOpen,
    isSidebarCollapsed 
  } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardView />;
      case 'products': return <ProductsView />;
      case 'sales': return <SalesOrdersView />;
      case 'suppliers': return <SuppliersView />;
      case 'ai-workspace': return <AIWorkspaceView />;
      case 'settings': return <SettingsView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 selection:bg-indigo-500/30`}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        
        <div className="flex-1 flex flex-col relative overflow-hidden transition-all duration-300 ease-in-out">
          <Header />
          
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth">
            {renderView()}
          </main>
        </div>
      </div>

      {cmdPaletteOpen && <CommandPalette />}
    </div>
  );
}