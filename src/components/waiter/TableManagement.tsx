import React, { useState } from 'react';
import { initialTables } from '../../data/mockData';
import type { Table, TableStatus } from '../../data/mockData';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Users, Clock } from 'lucide-react';
import './TableManagement.css';

interface TableManagementProps {
    onTableSelect: (table: Table) => void;
}

export const TableManagement: React.FC<TableManagementProps> = ({ onTableSelect }) => {
    const [tables] = useState<Table[]>(initialTables);
    const [filter, setFilter] = useState<'all' | TableStatus>('all');

    // Pass a function to useState so Date.now() is only called on initial render
    const [currentTime, setCurrentTime] = useState(() => Date.now());

    React.useEffect(() => {
        const interval = setInterval(() => setCurrentTime(Date.now()), 60000);
        return () => clearInterval(interval);
    }, []);

    const getStatusColor = (status: TableStatus) => {
        switch (status) {
            case 'available': return 'success';
            case 'occupied': return 'danger';
            case 'reserved': return 'warning';
            case 'cleaning': return 'info';
            default: return 'default';
        }
    };

    const filteredTables = filter === 'all'
        ? tables
        : tables.filter(t => t.status === filter);

    // Format time since seated
    const getTimeSeated = (date?: Date) => {
        if (!date) return '';
        const diff = Math.floor((currentTime - date.getTime()) / 60000); // in minutes
        if (diff < 60) return `${diff}m`;
        return `${Math.floor(diff / 60)}h ${diff % 60}m`;
    };

    return (
        <div className="table-management">
            <div className="filters glass-panel">
                <button
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    All Tables <Badge className="ml-2">{tables.length}</Badge>
                </button>
                <button
                    className={`filter-btn ${filter === 'available' ? 'active' : ''}`}
                    onClick={() => setFilter('available')}
                >
                    Available <Badge variant="success" className="ml-2">
                        {tables.filter(t => t.status === 'available').length}
                    </Badge>
                </button>
                <button
                    className={`filter-btn ${filter === 'occupied' ? 'active' : ''}`}
                    onClick={() => setFilter('occupied')}
                >
                    Occupied <Badge variant="danger" className="ml-2">
                        {tables.filter(t => t.status === 'occupied').length}
                    </Badge>
                </button>
                <button
                    className={`filter-btn ${filter === 'reserved' ? 'active' : ''}`}
                    onClick={() => setFilter('reserved')}
                >
                    Reserved <Badge variant="warning" className="ml-2">
                        {tables.filter(t => t.status === 'reserved').length}
                    </Badge>
                </button>
                <button
                    className={`filter-btn ${filter === 'cleaning' ? 'active' : ''}`}
                    onClick={() => setFilter('cleaning')}
                >
                    Cleaning <Badge variant="info" className="ml-2">
                        {tables.filter(t => t.status === 'cleaning').length}
                    </Badge>
                </button>
            </div>

            <div className="table-grid">
                {filteredTables.map(table => (
                    <Card
                        key={table.id}
                        variant="glass"
                        className={`table-card status-${table.status}`}
                        onClick={() => onTableSelect(table)}
                    >
                        <div className="table-header">
                            <h3>Table {table.number}</h3>
                            <Badge variant={getStatusColor(table.status)}>
                                {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                            </Badge>
                        </div>

                        <div className="table-details">
                            <div className="detail-item">
                                <Users size={16} />
                                <span>{table.capacity} Seats</span>
                            </div>

                            {table.status === 'occupied' && (
                                <>
                                    <div className="detail-item text-warning">
                                        <Clock size={16} />
                                        <span>{getTimeSeated(table.timeSeated)}</span>
                                    </div>
                                    <div className="order-value">
                                        ${table.currentOrderValue?.toFixed(2)}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="table-actions">
                            {table.status === 'available' && <span className="action-text">Seat Guests</span>}
                            {table.status === 'occupied' && <span className="action-text">Open POS</span>}
                            {table.status === 'reserved' && <span className="action-text">Arrived</span>}
                            {table.status === 'cleaning' && <span className="action-text">Mark Clean</span>}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
