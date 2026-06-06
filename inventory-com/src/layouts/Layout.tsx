import { Link, Outlet } from 'react-router-dom';
import { Package, LayoutDashboard } from 'lucide-react';

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center gap-2">
          <Package className="text-blue-600" />
          <h1 className="font-bold text-lg text-gray-800 tracking-tight">Inventory Sys</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link
            to="/products"
            className="flex items-center gap-3 px-3 py-2 text-blue-700 bg-blue-50 rounded-md font-medium transition-colors"
          >
            <Package size={20} />
            Products
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 justify-between shrink-0">
          <div className="text-sm text-gray-500">Warehouse Operations</div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              JD
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
