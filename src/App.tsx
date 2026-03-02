import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { TableManagement } from './components/waiter/TableManagement';
import type { Table } from './data/mockData';
import { POS } from './components/waiter/POS';
import { KDS } from './components/waiter/KDS';
import { Dashboard } from './components/admin/Dashboard';
import { Inventory } from './components/admin/Inventory';
import { MenuManagement } from './components/admin/MenuManagement';
import './App.css';

function App() {
  const [role, setRole] = useState<'waiter' | 'admin'>('waiter');
  const [activeView, setActiveView] = useState<string>('tables');
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  const handleTableSelect = (table: Table) => {
    setSelectedTable(table);
    setActiveView('pos'); // Automatically navigate to POS when table is selected
  };

  // Placeholder components for different views
  const renderView = () => {
    switch (activeView) {
      case 'tables':
        return <TableManagement onTableSelect={handleTableSelect} />;
      case 'pos':
        return <POS table={selectedTable} onBack={() => setActiveView('tables')} />;
      case 'kds':
        return <KDS />;
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <Inventory />;
      case 'menu':
        return <MenuManagement />;
      default:
        return <div>Select a view</div>;
    }
  };

  return (
    <Layout
      role={role}
      setRole={setRole}
      activeView={activeView}
      setActiveView={setActiveView}
    >
      {renderView()}
    </Layout>
  );
}

export default App;
