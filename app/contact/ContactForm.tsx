'use client';

import React, { useMemo, useState } from 'react';
import Button from '@/components/Button';
import styles from './page.module.css';

const WHATSAPP_NUMBER = '919500889142';

type FormState = {
    name: string;
    phone: string;
    pickup: string;
    drop: string;
    date: string;
    time: string;
    message: string;
};

const initialState: FormState = {
    name: '',
    phone: '',
    pickup: '',
    drop: '',
    date: '',
    time: '',
    message: '',
};

export default function ContactForm() {
    const [form, setForm] = useState<FormState>(initialState);
    const [status, setStatus] = useState<{ type: 'idle' | 'error' | 'success'; text: string }>({
        type: 'idle',
        text: '',
    });

    const isReadyToSubmit = useMemo(() => {
        return Boolean(
            form.name.trim() &&
                form.phone.trim() &&
                form.pickup.trim() &&
                form.drop.trim() &&
                form.date.trim() &&
                form.time.trim()
        );
    }, [form]);

    const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setStatus({ type: 'idle', text: '' });
        setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isReadyToSubmit) {
            setStatus({ type: 'error', text: 'Please fill all required fields.' });
            return;
        }

        const lines = [
            'Hello, I would like to book a cab.',
            `Name: ${form.name.trim()}`,
            `Phone: ${form.phone.trim()}`,
            `From: ${form.pickup.trim()}`,
            `To: ${form.drop.trim()}`,
            `Date: ${form.date.trim()}`,
            `Time: ${form.time.trim()}`,
        ];

        if (form.message.trim()) {
            lines.push(`Additional requirements: ${form.message.trim()}`);
        }

        const message = lines.join('\n');
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        window.open(url, '_blank', 'noopener,noreferrer');
        setStatus({ type: 'success', text: 'Opening WhatsApp with your booking request…' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.grid} style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: 0 }}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className={styles.input}
                        placeholder="Your Name"
                        required
                        value={form.name}
                        onChange={update('name')}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="phone">
                        Phone
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        className={styles.input}
                        placeholder="+91"
                        required
                        value={form.phone}
                        onChange={update('phone')}
                    />
                </div>
            </div>

            <div className={styles.grid} style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: 0 }}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="pickup">
                        Pickup City
                    </label>
                    <input
                        type="text"
                        id="pickup"
                        className={styles.input}
                        placeholder="e.g. Salem"
                        required
                        value={form.pickup}
                        onChange={update('pickup')}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="drop">
                        Drop City
                    </label>
                    <input
                        type="text"
                        id="drop"
                        className={styles.input}
                        placeholder="e.g. Chennai"
                        required
                        value={form.drop}
                        onChange={update('drop')}
                    />
                </div>
            </div>

            <div className={styles.grid} style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: 0 }}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="date">
                        Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        className={styles.input}
                        required
                        value={form.date}
                        onChange={update('date')}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="time">
                        Time
                    </label>
                    <input
                        type="time"
                        id="time"
                        className={styles.input}
                        required
                        value={form.time}
                        onChange={update('time')}
                    />
                </div>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="message">
                    Additional Requirements
                </label>
                <textarea
                    id="message"
                    className={styles.textarea}
                    placeholder="Car type preference (Sedan, SUV), etc."
                    value={form.message}
                    onChange={update('message')}
                />
            </div>

            <Button type="submit" size="lg" style={{ width: '100%' }} disabled={!isReadyToSubmit}>
                Send Booking Request
            </Button>

            {status.type !== 'idle' ? (
                <p
                    className={status.type === 'error' ? styles.formStatusError : styles.formStatusSuccess}
                    role={status.type === 'error' ? 'alert' : 'status'}
                    aria-live="polite"
                    style={{ marginTop: '0.75rem' }}
                >
                    {status.text}
                </p>
            ) : null}
        </form>
    );
}

