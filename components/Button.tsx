import React from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    href,
    className,
    ...props
}) => {
    const classes = clsx(
        styles.button,
        styles[variant],
        styles[size],
        className
    );

    if (href) {
        return (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <Link href={href} className={classes} {...(props as any)}>
                {children}
            </Link>
        );
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
};

export default Button;
