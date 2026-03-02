import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { mockMenu } from '../../data/mockData';
import type { MenuItem } from '../../data/mockData';
import { Search, Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';
import './MenuManagement.css';

export const MenuManagement: React.FC = () => {
    const [items, setItems] = useState<MenuItem[]>(mockMenu);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleAvailability = (id: string) => {
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, available: !item.available } : item
        ));
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="menu-management-container">
            <div className="page-header">
                <div className="header-actions">
                    <div className="search-bar">
                        <Search size={18} className="text-muted" />
                        <input
                            type="text"
                            placeholder="Search menu items..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="primary">
                        <Plus size={18} /> Add New Item
                    </Button>
                </div>
            </div>

            <div className="menu-list-grid">
                {filteredItems.map(item => (
                    <Card key={item.id} variant="default" className="menu-admin-card" noPadding>
                        <div className={`menu-card-image ${!item.available ? 'unavailable' : ''}`}>
                            <span className="card-emoji">{item.image}</span>
                            <button className="change-img-btn">
                                <ImageIcon size={16} />
                            </button>
                        </div>

                        <div className="menu-card-content">
                            <div className="menu-card-header">
                                <h3>{item.name}</h3>
                                <span className="price">${item.price.toFixed(2)}</span>
                            </div>

                            <p className="description" title={item.description}>
                                {item.description}
                            </p>

                            <div className="menu-card-meta">
                                <Badge variant="default">{item.category}</Badge>

                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={item.available}
                                        onChange={() => toggleAvailability(item.id)}
                                    />
                                    <span className="slider"></span>
                                    <span className="toggle-label">
                                        {item.available ? 'Available' : 'Sold Out'}
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="menu-card-actions">
                            <Button variant="ghost" fullWidth>
                                <Edit2 size={16} /> Edit
                            </Button>
                            <Button variant="ghost" className="text-danger" fullWidth>
                                <Trash2 size={16} /> Delete
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
