import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import PropertyManagement from './components/Property/PropertyManagement';
import OrderManagement from './components/Orders/OrderManagement';
import ChannelManagement from './components/Channels/ChannelManagement';
import Analytics from './components/Analytics/Analytics';
import CRMManagement from './components/CRM/CRMManagement';
import SmartHardware from './components/Hardware/SmartHardware';
import SystemAdmin from './components/Admin/SystemAdmin';
import CustomerServiceSession from './components/CustomerService/CustomerServiceSession';
import IntelligentPricing from './components/DecisionAnalysis/IntelligentPricing';
import IntelligentInventoryAllocation from './components/DecisionAnalysis/IntelligentInventoryAllocation';
import MarketingStrategyOptimization from './components/DecisionAnalysis/MarketingStrategyOptimization';

type Module = 
  'dashboard' | 
  'properties' | 
  'orders' | 
  'channels' | 
  'analytics' | 
  'crm' | 
  'hardware' | 
  'admin' | 
  'customerServiceSession' |
  'intelligentPricing' |
  'intelligentInventoryAllocation' |
  'marketingStrategyOptimization';

function App() {
  const [activeModule, setActiveModule] = useState<Module>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'properties':
        return <PropertyManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'channels':
        return <ChannelManagement />;
      case 'analytics':
        return <Analytics />;
      case 'crm':
        return <CRMManagement />;
      case 'hardware':
        return <SmartHardware />;
      case 'admin':
        return <SystemAdmin />;
      case 'customerServiceSession':
        return <CustomerServiceSession />;
      case 'intelligentPricing':
        return <IntelligentPricing />;
      case 'intelligentInventoryAllocation':
        return <IntelligentInventoryAllocation />;
      case 'marketingStrategyOptimization':
        return <MarketingStrategyOptimization />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="flex">
        <Sidebar 
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <Header activeModule={activeModule} />
          <main className="p-6">
            {renderActiveModule()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;