import React from 'react';
import { Card } from '../ui/Card';
import { TrendingUp, Users, DollarSign, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
    const stats = [
        { label: 'Total Revenue', value: '$12,426.00', icon: DollarSign, trend: '+14.5%', positive: true },
        { label: 'Total Orders', value: '452', icon: Activity, trend: '+5.2%', positive: true },
        { label: 'Active Tables', value: '24/30', icon: Users, trend: '-2.1%', positive: false },
        { label: 'Avg Order Value', value: '$27.50', icon: TrendingUp, trend: '+8.4%', positive: true },
    ];

    const bestSellers = [
        { name: 'Neon Burger', category: 'Mains', sales: 124, revenue: '$2,232.00', progress: 85 },
        { name: 'Cosmic Pasta', category: 'Mains', sales: 98, revenue: '$2,156.00', progress: 70 },
        { name: 'Truffle Fries', category: 'Starters', sales: 156, revenue: '$1,402.44', progress: 95 },
        { name: 'Quantum Shake', category: 'Drinks', sales: 112, revenue: '$784.00', progress: 60 },
    ];

    return (
        <div className="dashboard-container hide-scrollbar">
            {/* Stats Grid */}
            <div className="stats-grid">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={idx} variant="glass" className="stat-card">
                            <div className="stat-header">
                                <div className="stat-icon-wrapper">
                                    <Icon size={24} className="text-secondary" />
                                </div>
                                <span className={`trend ${stat.positive ? 'text-success' : 'text-danger'}`}>
                                    {stat.positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                    {stat.trend}
                                </span>
                            </div>
                            <div className="stat-body">
                                <h3>{stat.value}</h3>
                                <p className="text-muted">{stat.label}</p>
                            </div>
                        </Card>
                    );
                })}
            </div>

            <div className="dashboard-content">
                {/* Revenue Chart Placeholder */}
                <Card variant="default" className="chart-card">
                    <div className="card-header">
                        <h3>Revenue Overview</h3>
                        <select className="date-select">
                            <option>Today</option>
                            <option>This Week</option>
                            <option>This Month</option>
                        </select>
                    </div>
                    <div className="chart-area">
                        {/* CSS-based bar chart representation */}
                        <div className="css-chart">
                            {[40, 65, 45, 80, 55, 90, 75].map((height, i) => (
                                <div key={i} className="bar-wrapper">
                                    <div className="bar" style={{ height: `${height}%` }}>
                                        <div className="bar-glow"></div>
                                    </div>
                                    <span className="bar-label">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Best Sellers */}
                <Card variant="outline" className="best-sellers-card">
                    <div className="card-header">
                        <h3>Top Performing Items</h3>
                        <button className="view-all-btn">View All</button>
                    </div>
                    <div className="best-sellers-list">
                        {bestSellers.map((item, idx) => (
                            <div key={idx} className="best-seller-row">
                                <div className="item-info-col">
                                    <h4>{item.name}</h4>
                                    <span className="text-muted text-sm">{item.category}</span>
                                </div>
                                <div className="item-stats-col">
                                    <div className="sales-info">
                                        <span className="sales">{item.sales} sold</span>
                                        <span className="rev">{item.revenue}</span>
                                    </div>
                                    <div className="progress-bg">
                                        <div className="progress-bar" style={{ width: `${item.progress}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};
