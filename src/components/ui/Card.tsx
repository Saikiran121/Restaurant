import React from 'react';
import './Card.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    variant?: 'default' | 'glass' | 'outline' | 'gradient';
    noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    variant = 'default',
    noPadding = false,
    className = '',
    ...props
}) => {
    const classes = [
        'card',
        `card-${variant}`,
        noPadding ? 'card-no-padding' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
};
