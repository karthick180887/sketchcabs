'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Button from '@/components/Button';
import styles from './page.module.css';

type ConfigResponse = {
    tokenPresent: boolean;
    chatIdPresent: boolean;
};

type StatusState = 'idle' | 'loading' | 'success' | 'error';

export default function TelegramConfigPage() {
    const [status, setStatus] = useState<StatusState>('idle');
    const [data, setData] = useState<ConfigResponse | null>(null);
    const [error, setError] = useState('');
    const [checkedAt, setCheckedAt] = useState<string>('');

    const loadConfig = useCallback(async () => {
        setStatus('loading');
        setError('');

        try {
            const response = await fetch('/api/telegram-config', { cache: 'no-store' });
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const payload = (await response.json()) as ConfigResponse;
            setData({
                tokenPresent: Boolean(payload.tokenPresent),
                chatIdPresent: Boolean(payload.chatIdPresent),
            });
            setCheckedAt(new Date().toLocaleString());
            setStatus('success');
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            setError(message);
            setStatus('error');
        }
    }, []);

    useEffect(() => {
        loadConfig();
    }, [loadConfig]);

    const getBadgeClass = (value: boolean | undefined) => {
        if (data === null) {
            return styles.pending;
        }
        return value ? styles.ok : styles.missing;
    };

    const getBadgeText = (value: boolean | undefined) => {
        if (data === null) {
            return status === 'loading' ? 'Checking' : 'Unknown';
        }
        return value ? 'Present' : 'Missing';
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <span className={styles.kicker}>Diagnostics</span>
                    <h1 className={styles.title}>Telegram Configuration</h1>
                    <p className={styles.subtitle}>
                        This page only shows whether required environment variables are loaded on the server. It never
                        displays their values.
                    </p>
                </div>

                <div className={styles.panel}>
                    <div className={styles.row}>
                        <span className={styles.label}>TELEGRAM_BOT_TOKEN</span>
                        <span className={`${styles.badge} ${getBadgeClass(data?.tokenPresent)}`}>
                            {getBadgeText(data?.tokenPresent)}
                        </span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>TELEGRAM_CHAT_ID</span>
                        <span className={`${styles.badge} ${getBadgeClass(data?.chatIdPresent)}`}>
                            {getBadgeText(data?.chatIdPresent)}
                        </span>
                    </div>
                </div>

                {checkedAt ? <p className={styles.note}>Last checked: {checkedAt}</p> : null}

                {status === 'error' ? (
                    <p className={styles.error}>
                        Failed to load configuration. {error}
                    </p>
                ) : null}

                <div className={styles.actions}>
                    <Button type="button" size="md" onClick={loadConfig} disabled={status === 'loading'}>
                        {status === 'loading' ? 'Checking...' : 'Check Again'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
