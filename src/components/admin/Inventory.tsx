import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Search, Filter, Plus, Edit2, Trash2, AlertTriangle } from 'lucide-react';
import './Inventory.css';

interface InventoryItem {
    id: string;
    name: string;
    category: string;
    qty: number;
    unit: string;
    threshold: number;
    lastRestocked: string;
}

const mockInventory: InventoryItem[] = [
    { id: 'inv-1', name: 'Wagyu Beef Patties', category: 'Meat', qty: 45, unit: 'pcs', threshold: 50, lastRestocked: 'Today, 08:30 AM' },
    { id: 'inv-2', name: 'Truffle Oil', category: 'Pantry', qty: 2.5, unit: 'L', threshold: 1, lastRestocked: '2 days ago' },
    { id: 'inv-3', name: 'Brioche Buns', category: 'Bakery', qty: 120, unit: 'pcs', threshold: 100, lastRestocked: 'Today, 06:00 AM' },
    { id: 'inv-4', name: 'Squid Ink', category: 'Pantry', qty: 0.8, unit: 'L', threshold: 1, lastRestocked: '1 week ago' },
    { id: 'inv-5', name: 'Potatoes (Fries)', category: 'Produce', qty: 85, unit: 'kg', threshold: 20, lastRestocked: 'Yesterday' },
];

export const Inventory: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const getStockStatus = (qty: number, threshold: number) => {
        if (qty <= threshold * 0.5) return 'danger';
        if (qty <= threshold) return 'warning';
        return 'success';
    };

    const getStatusLabel = (qty: number, threshold: number) => {
        if (qty <= threshold * 0.5) return 'Critical';
        if (qty <= threshold) return 'Low Stock';
        return 'In Stock';
    };

    return (
        <div className="inventory-container">
            <div className="page-header">
                <div className="header-actions">
                    <div className="search-bar">
                        <Search size={18} className="text-muted" />
                        <input
                            type="text"
                            placeholder="Search ingredient..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="secondary" className="mr-2">
                        <Filter size={18} /> Filter
                    </Button>
                    <Button variant="primary">
                        <Plus size={18} /> Add Item
                    </Button>
                </div>
            </div>

            {/* Critical Alerts */}
            <div className="alerts-section">
                <Card variant="outline" className="alert-card danger-alert">
                    <AlertTriangle size={24} />
                    <div className="alert-content">
                        <h4>Low Stock Alert</h4>
                        <p>Wagyu Beef Patties and Squid Ink need immediate restocking.</p>
                    </div>
                    <Button variant="danger" size="sm">Create PO</Button>
                </Card>
            </div>

            <Card variant="glass" noPadding className="inventory-table-card">
                <table className="inventory-table">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Category</th>
                            <th>Stock Level</th>
                            <th>Status</th>
                            <th>Last Restocked</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockInventory.map(item => (
                            <tr key={item.id}>
                                <td>
                                    <span className="font-semibold text-white">{item.name}</span>
                                    <div className="text-sm text-dim">ID: {item.id}</div>
                                </td>
                                <td>
                                    <Badge variant="default">{item.category}</Badge>
                                </td>
                                <td>
                                    <div className="stock-level-display">
                                        <span className={`qty-text text-${getStockStatus(item.qty, item.threshold)}`}>
                                            {item.qty} {item.unit}
                                        </span>
                                        <span className="text-dim text-sm">/ Min: {item.threshold}</span>
                                    </div>
                                </td>
                                <td>
                                    <Badge variant={getStockStatus(item.qty, item.threshold)}>
                                        {getStatusLabel(item.qty, item.threshold)}
                                    </Badge>
                                </td>
                                <td className="text-muted">{item.lastRestocked}</td>
                                <td>
                                    <div className="table-actions-group">
                                        <button className="icon-btn" title="Edit"><Edit2 size={16} /></button>
                                        <button className="icon-btn text-danger" title="Delete"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};
