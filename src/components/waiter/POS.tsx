import React, { useState, useMemo } from 'react';
import type { Table, MenuItem, OrderItem } from '../../data/mockData';
import { mockMenu } from '../../data/mockData';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ArrowLeft, Trash2, Plus, Minus, Send } from 'lucide-react';
import './POS.css';

interface POSProps {
    table: Table | null;
    onBack: () => void;
}

export const POS: React.FC<POSProps> = ({ table, onBack }) => {
    const [cart, setCart] = useState<OrderItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'starters' | 'mains' | 'desserts' | 'drinks'>('all');

    const categories = [
        { id: 'all', label: 'All Items' },
        { id: 'starters', label: 'Starters' },
        { id: 'mains', label: 'Mains' },
        { id: 'desserts', label: 'Desserts' },
        { id: 'drinks', label: 'Beverages' }
    ];

    const filteredMenu = useMemo(() => {
        return selectedCategory === 'all'
            ? mockMenu
            : mockMenu.filter(item => item.category === selectedCategory);
    }, [selectedCategory]);

    const addToCart = (item: MenuItem) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const updateQuantity = (id: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQ = item.quantity + delta;
                return newQ > 0 ? { ...item, quantity: newQ } : item;
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="pos-container">
            {/* Menu Area */}
            <div className="menu-area">
                <div className="pos-header">
                    <button className="back-btn" onClick={onBack}>
                        <ArrowLeft size={20} />
                        <span>{table ? `Table ${table.number}` : 'No Table Selected'}</span>
                    </button>

                    <div className="category-tabs glass-panel">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`cat-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat.id as 'all' | 'starters' | 'mains' | 'desserts' | 'drinks')}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="menu-grid">
                    {filteredMenu.map(item => (
                        <Card
                            key={item.id}
                            className="menu-item-card"
                            onClick={() => addToCart(item)}
                            variant="outline"
                        >
                            <div className="item-image-container">
                                <span className="item-emoji">{item.image}</span>
                            </div>
                            <div className="item-info">
                                <h4>{item.name}</h4>
                                <p>{item.description}</p>
                                <div className="item-price-row">
                                    <span className="price">${item.price.toFixed(2)}</span>
                                    <Badge variant="default" className="add-badge">+</Badge>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Cart/Order Area */}
            <div className="cart-area glass-panel">
                <div className="cart-header">
                    <h3>Current Order</h3>
                    <span className="text-muted">
                        {table ? `T-${table.number}` : 'Direct Sale'}
                    </span>
                </div>

                <div className="cart-items">
                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <span className="empty-icon">🍽️</span>
                            <p>No items added yet</p>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-info">
                                    <span className="cart-item-name">{item.name}</span>
                                    <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>

                                <div className="cart-item-actions">
                                    <div className="qty-controls">
                                        <button onClick={() => updateQuantity(item.id, -1)}><Minus size={14} /></button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)}><Plus size={14} /></button>
                                    </div>
                                    <button className="delete-btn" onClick={() => removeFromCart(item.id)}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-footer">
                    <div className="totals">
                        <div className="total-row space-between text-muted">
                            <span>Subtotal</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="total-row space-between text-muted">
                            <span>Tax (8%)</span>
                            <span>${(totalAmount * 0.08).toFixed(2)}</span>
                        </div>
                        <div className="total-row space-between grand-total">
                            <span>Total</span>
                            <span>${(totalAmount * 1.08).toFixed(2)}</span>
                        </div>
                    </div>

                    <Button
                        variant="primary"
                        size="lg"
                        fullWidth
                        disabled={cart.length === 0}
                        className="mt-4 shadow-glow"
                    >
                        <Send size={18} />
                        Send to KOT
                    </Button>
                </div>
            </div>
        </div>
    );
};
