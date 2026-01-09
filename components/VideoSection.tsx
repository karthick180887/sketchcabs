'use client';

import React from 'react';
import Image from 'next/image';
import styles from './VideoSection.module.css';
import { Play } from 'lucide-react';

const VideoSection: React.FC = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Experience the Journey</h2>

                <div className={styles.videoWrapper}>
                    <Image
                        src="/fleet-bg.png"
                        alt="Sketch Cabs Fleet"
                        className={styles.thumbnail}
                        fill
                        sizes="(max-width: 900px) 100vw, 900px"
                        priority={false}
                    />

                    <button className={styles.playButton} aria-label="Play Video">
                        <Play size={40} className={styles.playIcon} fill="currentColor" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
