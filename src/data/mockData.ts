// This file defines mock data to simulate real-time operations
export type TableStatus = 'available' | 'occupied' | 'reserved' | 'cleaning';

export interface Table {
    id: string;
    number: number;
    capacity: number;
    status: TableStatus;
    currentOrderValue?: number;
    timeSeated?: Date;
}

export const initialTables: Table[] = [
    { id: 't1', number: 1, capacity: 2, status: 'occupied', currentOrderValue: 45.50, timeSeated: new Date(Date.now() - 1000 * 60 * 45) },
    { id: 't2', number: 2, capacity: 2, status: 'available' },
    { id: 't3', number: 3, capacity: 4, status: 'cleaning' },
    { id: 't4', number: 4, capacity: 4, status: 'occupied', currentOrderValue: 120.00, timeSeated: new Date(Date.now() - 1000 * 60 * 15) },
    { id: 't5', number: 5, capacity: 6, status: 'reserved' },
    { id: 't6', number: 6, capacity: 6, status: 'available' },
    { id: 't7', number: 7, capacity: 2, status: 'available' },
    { id: 't8', number: 8, capacity: 8, status: 'occupied', currentOrderValue: 210.25, timeSeated: new Date(Date.now() - 1000 * 60 * 60) },
    { id: 't9', number: 9, capacity: 4, status: 'available' },
];

export interface MenuItem {
    id: string;
    name: string;
    category: 'starters' | 'mains' | 'desserts' | 'drinks';
    price: number;
    image: string;
    description: string;
    available: boolean;
}

export const mockMenu: MenuItem[] = [
    { id: 'm1', name: 'Truffle Fries', category: 'starters', price: 8.99, image: '🍟', description: 'Crispy fries tossed in truffle oil and parmesan.', available: true },
    { id: 'm2', name: 'Calamari Rings', category: 'starters', price: 12.50, image: '🦑', description: 'Deep fried squid rings with tartare sauce.', available: true },
    { id: 'm3', name: 'Neon Burger', category: 'mains', price: 18.00, image: '🍔', description: 'Wagyu beef, neon cheese sauce, activated charcoal bun.', available: true },
    { id: 'm4', name: 'Cyber Steak', category: 'mains', price: 32.00, image: '🥩', description: 'Ribeye steak cooked to perfection with garlic herb butter.', available: true },
    { id: 'm5', name: 'Cosmic Pasta', category: 'mains', price: 22.00, image: '🍝', description: 'Squid ink linguine with mixed seafood.', available: true },
    { id: 'm6', name: 'Galaxy Cheesecake', category: 'desserts', price: 9.50, image: '🍰', description: 'Swirled berry cheesecake.', available: true },
    { id: 'm7', name: 'Quantum Shake', category: 'drinks', price: 7.00, image: '🥤', description: 'Vanilla and blueberry milkshake with glow syrup.', available: true },
    { id: 'm8', name: 'Void Coffee', category: 'drinks', price: 4.50, image: '☕', description: 'Double dark roast espresso.', available: true },
];

export interface OrderItem extends MenuItem {
    quantity: number;
    notes?: string;
}

export interface Order {
    id: string;
    tableId: string;
    items: OrderItem[];
    status: 'preparing' | 'ready' | 'served';
    total: number;
    timestamp: Date;
}
