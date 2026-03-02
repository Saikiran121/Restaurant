import React from 'react';
import './Layout.css';
import { LayoutDashboard, Users, Grid, Settings, Bell, LogOut } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
    activeView: string;
    setActiveView: (view: string) => void;
    role: 'waiter' | 'admin';
    setRole: (role: 'waiter' | 'admin') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView, role, setRole }) => {
    const waiterMenu = [
        { id: 'tables', label: 'Floor Layout', icon: Grid },
        { id: 'pos', label: 'POS System', icon: Users },
        { id: 'kds', label: 'Kitchen View', icon: Bell },
    ];

    const adminMenu = [
        { id: 'dashboard', label: 'Analytics Dashboard', icon: LayoutDashboard },
        { id: 'inventory', label: 'Inventory', icon: Users },
        { id: 'menu', label: 'Menu Management', icon: Grid },
    ];

    const menuItems = role === 'admin' ? adminMenu : waiterMenu;

    return (
        <div className="layout-container">
            {/* Sidebar */}
            <aside className="sidebar glass-panel">
                <div className="sidebar-header">
                    <div className="logo">
                        <span className="logo-icon">R</span>
                        <h2>Neon<span className="text-primary">Bites</span></h2>
                    </div>
                    <div className="role-switch">
                        <button
                            className={`role-btn ${role === 'waiter' ? 'active' : ''}`}
                            onClick={() => { setRole('waiter'); setActiveView('tables'); }}
                        >
                            Staff
                        </button>
                        <button
                            className={`role-btn ${role === 'admin' ? 'active' : ''}`}
                            onClick={() => { setRole('admin'); setActiveView('dashboard'); }}
                        >
                            Admin
                        </button>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {menuItems.map(item => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                className={`nav-item ${activeView === item.id ? 'active' : ''}`}
                                onClick={() => setActiveView(item.id)}
                            >
                                <Icon size={20} className="nav-icon" />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                <div className="sidebar-footer">
                    <button className="nav-item">
                        <Settings size={20} className="nav-icon" />
                        <span>Settings</span>
                    </button>
                    <button className="nav-item text-danger mt-2">
                        <LogOut size={20} className="nav-icon" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="main-content">
                {/* Top Header */}
                <header className="top-header glass-panel">
                    <div className="header-title">
                        <h1>{menuItems.find(m => m.id === activeView)?.label || 'Overview'}</h1>
                        <p className="text-muted text-sm">Real-time Operations Sync</p>
                    </div>

                    <div className="header-actions">
                        <div className="status-indicator">
                            <span className="status-dot"></span>
                            Live Sync
                        </div>
                        <button className="notification-btn">
                            <Bell size={20} />
                            <span className="notification-badge">3</span>
                        </button>
                        <div className="user-profile">
                            <img src="https://i.pravatar.cc/150?img=11" alt="User" className="avatar" />
                            <div className="user-info">
                                <span className="user-name">Alex M.</span>
                                <span className="user-role">{role === 'admin' ? 'Manager' : 'Floor Staff'}</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* View Content */}
                <div className="view-container animate-fade-in">
                    {children}
                </div>
            </main>
        </div>
    );
};
