import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Clock, CheckCircle, ChefHat } from 'lucide-react';
import './KDS.css';

// Using mock data shape for KDS
interface KDSOrder {
    id: string;
    tableNumber: number | string;
    items: { name: string; quantity: number; notes?: string }[];
    status: 'preparing' | 'ready';
    timePlaced: Date;
}

const initialOrders: KDSOrder[] = [
    {
        id: 'ord-101',
        tableNumber: 4,
        items: [
            { name: 'Neon Burger', quantity: 2, notes: 'No onions' },
            { name: 'Truffle Fries', quantity: 1 }
        ],
        status: 'preparing',
        timePlaced: new Date(Date.now() - 1000 * 60 * 12) // 12 mins ago
    },
    {
        id: 'ord-102',
        tableNumber: 'Takeaway',
        items: [
            { name: 'Cosmic Pasta', quantity: 1 },
            { name: 'Void Coffee', quantity: 1 }
        ],
        status: 'preparing',
        timePlaced: new Date(Date.now() - 1000 * 60 * 5) // 5 mins ago
    },
    {
        id: 'ord-103',
        tableNumber: 8,
        items: [
            { name: 'Cyber Steak', quantity: 4, notes: 'Medium Rare' },
            { name: 'Quantum Shake', quantity: 4 }
        ],
        status: 'ready',
        timePlaced: new Date(Date.now() - 1000 * 60 * 25) // 25 mins ago
    }
];

export const KDS: React.FC = () => {
    const [orders, setOrders] = useState<KDSOrder[]>(initialOrders);
    const [currentTime, setCurrentTime] = useState(() => Date.now());

    React.useEffect(() => {
        const interval = setInterval(() => setCurrentTime(Date.now()), 60000);
        return () => clearInterval(interval);
    }, []);

    const getElapsedTime = (placed: Date) => {
        const mins = Math.floor((currentTime - placed.getTime()) / 60000);
        return `${mins}m`;
    };

    const getUrgencyClass = (placed: Date) => {
        const mins = Math.floor((currentTime - placed.getTime()) / 60000);
        if (mins >= 20) return 'urgent';
        if (mins >= 10) return 'warning';
        return 'normal';
    };

    const markReady = (id: string) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'ready' } : o));
    };

    const markServed = (id: string) => {
        setOrders(prev => prev.filter(o => o.id !== id));
    };

    const preparingOrders = orders.filter(o => o.status === 'preparing');
    const readyOrders = orders.filter(o => o.status === 'ready');

    return (
        <div className="kds-container">
            {/* Preparing Column */}
            <div className="kds-column">
                <div className="column-header warning">
                    <ChefHat size={24} />
                    <h2>Preparing</h2>
                    <Badge variant="warning">{preparingOrders.length}</Badge>
                </div>

                <div className="orders-list">
                    {preparingOrders.map(order => (
                        <Card key={order.id} className={`kds-card ${getUrgencyClass(order.timePlaced)}`} noPadding>
                            <div className="kds-card-header">
                                <h3>{typeof order.tableNumber === 'number' ? `Table ${order.tableNumber}` : order.tableNumber}</h3>
                                <div className="time-indicator">
                                    <Clock size={16} />
                                    <span>{getElapsedTime(order.timePlaced)}</span>
                                </div>
                            </div>

                            <div className="kds-card-body">
                                <span className="order-id">#{order.id}</span>
                                <ul className="kds-item-list">
                                    {order.items.map((item, idx) => (
                                        <li key={idx}>
                                            <span className="qty">{item.quantity}x</span>
                                            <div className="item-details">
                                                <span className="name">{item.name}</span>
                                                {item.notes && <span className="notes">📝 {item.notes}</span>}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="kds-card-footer">
                                <Button fullWidth onClick={() => markReady(order.id)}>
                                    <CheckCircle size={18} /> Mark Ready
                                </Button>
                            </div>
                        </Card>
                    ))}
                    {preparingOrders.length === 0 && (
                        <div className="empty-state">No orders preparing</div>
                    )}
                </div>
            </div>

            {/* Ready Column */}
            <div className="kds-column">
                <div className="column-header success">
                    <CheckCircle size={24} />
                    <h2>Ready for Pickup</h2>
                    <Badge variant="success">{readyOrders.length}</Badge>
                </div>

                <div className="orders-list">
                    {readyOrders.map(order => (
                        <Card key={order.id} className="kds-card ready-status" noPadding>
                            <div className="kds-card-header">
                                <h3>{typeof order.tableNumber === 'number' ? `Table ${order.tableNumber}` : order.tableNumber}</h3>
                                <div className="time-indicator text-success">
                                    <span>Ready!</span>
                                </div>
                            </div>

                            <div className="kds-card-body">
                                <span className="order-id">#{order.id}</span>
                                <ul className="kds-item-list">
                                    {order.items.map((item, idx) => (
                                        <li key={idx}>
                                            <span className="qty">{item.quantity}x</span>
                                            <span className="name">{item.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="kds-card-footer">
                                <Button fullWidth variant="secondary" onClick={() => markServed(order.id)}>
                                    Order Served
                                </Button>
                            </div>
                        </Card>
                    ))}
                    {readyOrders.length === 0 && (
                        <div className="empty-state">No orders ready</div>
                    )}
                </div>
            </div>
        </div>
    );
};
