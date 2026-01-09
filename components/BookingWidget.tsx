'use client';

import React, { useState } from 'react';
import styles from './BookingWidget.module.css';
import Button from './Button';
import { User, Phone, MapPin, Calendar, Clock, Car } from 'lucide-react';

// Fare rates per km for different car types
const carRates: Record<string, { rate: number; minKm: number; bata: number }> = {
    'MINI': { rate: 12, minKm: 130, bata: 300 },
    'SEDAN': { rate: 13, minKm: 130, bata: 300 },
    'ETIOS': { rate: 14, minKm: 130, bata: 300 },
    'SUV': { rate: 18, minKm: 130, bata: 300 },
    'INNOVA': { rate: 19, minKm: 130, bata: 300 },
    'INNOVA CRYSTA': { rate: 25, minKm: 130, bata: 300 },
};

const BookingWidget: React.FC = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [pickup, setPickup] = useState('');
    const [drop, setDrop] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [carType, setCarType] = useState('SEDAN');
    const [distance, setDistance] = useState('');

    const calculateFare = () => {
        const distanceKm = parseFloat(distance) || 0;
        const car = carRates[carType];
        const chargeableKm = Math.max(distanceKm, car.minKm);
        const baseFare = chargeableKm * car.rate;
        const additionalKm = Math.max(0, distanceKm - car.minKm);
        const additionalFare = additionalKm > 0 ? additionalKm * car.rate : 0;
        const total = baseFare + car.bata;

        return {
            baseFare: Math.round(car.minKm * car.rate),
            additionalFare: Math.round(additionalFare),
            bata: car.bata,
            total: Math.round(total),
            chargeableKm: car.minKm
        };
    };

    const formatTime = (timeStr: string) => {
        if (!timeStr) return '--:--';
        const [hours, minutes] = timeStr.split(':');
        const h = parseInt(hours);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const hour12 = h % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    };

    const handleBook = () => {
        const fare = calculateFare();
        const distanceKm = parseFloat(distance) || 0;

        const message = `ONE WAY TRIP ESTIMATION

📍 Pickup: ${pickup}
🎯 Drop: ${drop}
🚙 Car Type: ${carType}
📱 Phone: ${phone}
📅 Date: ${date}
🕐 Time: ${formatTime(time)}
📏 Distance: ${distanceKm} km

💰 Base Rate (${fare.chargeableKm}km): ₹${fare.baseFare}
💰 Additional Fare: ₹${fare.additionalFare}
💰 Beta Charge: ₹${fare.bata}
💳 TOTAL AMOUNT: ₹${fare.total}

🔗 Booking Request Generated
👤 Name: ${name}
📍 Route: ${pickup} → ${drop}`;

        const url = `https://wa.me/919500889142?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className={styles.widget}>
            <div className={styles.header}>
                <h3 className={styles.headerTitle}>Book Your One-Way Cab</h3>
                <p className={styles.headerSubtitle}>Get instant fare estimate</p>
            </div>

            <div className={styles.row}>
                <div className={styles.field}>
                    <label className={styles.label}>Name</label>
                    <div className={styles.inputGroup}>
                        <User size={16} className={styles.icon} />
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Phone</label>
                    <div className={styles.inputGroup}>
                        <Phone size={16} className={styles.icon} />
                        <input
                            type="tel"
                            className={styles.input}
                            placeholder="+91 9876543210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Pickup Location</label>
                <div className={styles.inputGroup}>
                    <MapPin size={16} className={styles.icon} />
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="e.g. Salem, Tamil Nadu"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Drop Location</label>
                <div className={styles.inputGroup}>
                    <MapPin size={16} className={styles.icon} />
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="e.g. Chennai Airport"
                        value={drop}
                        onChange={(e) => setDrop(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.field}>
                    <label className={styles.label}>Date</label>
                    <div className={styles.inputGroup}>
                        <Calendar size={16} className={styles.icon} />
                        <input
                            type="date"
                            className={styles.input}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Time</label>
                    <div className={styles.inputGroup}>
                        <Clock size={16} className={styles.icon} />
                        <input
                            type="time"
                            className={styles.input}
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.field}>
                    <label className={styles.label}>Car Type</label>
                    <div className={styles.inputGroup}>
                        <Car size={16} className={styles.icon} />
                        <select
                            className={styles.input}
                            value={carType}
                            onChange={(e) => setCarType(e.target.value)}
                        >
                            <option value="MINI">Mini (₹12/km)</option>
                            <option value="SEDAN">Sedan (₹13/km)</option>
                            <option value="ETIOS">Etios (₹14/km)</option>
                            <option value="SUV">SUV (₹18/km)</option>
                            <option value="INNOVA">Innova (₹19/km)</option>
                            <option value="INNOVA CRYSTA">Innova Crysta (₹25/km)</option>
                        </select>
                    </div>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Distance (km)</label>
                    <div className={styles.inputGroup}>
                        <MapPin size={16} className={styles.icon} />
                        <input
                            type="number"
                            className={styles.input}
                            placeholder="e.g. 128"
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {distance && parseFloat(distance) > 0 && (
                <div className={styles.farePreview}>
                    <div className={styles.fareRow}>
                        <span>Base Rate ({calculateFare().chargeableKm}km)</span>
                        <span>₹{calculateFare().baseFare}</span>
                    </div>
                    <div className={styles.fareRow}>
                        <span>Driver Bata</span>
                        <span>₹{calculateFare().bata}</span>
                    </div>
                    <div className={styles.fareTotal}>
                        <span>Total Amount</span>
                        <span>₹{calculateFare().total}</span>
                    </div>
                </div>
            )}

            <div className={styles.submitButton}>
                <Button onClick={handleBook} size="lg" style={{ width: '100%', height: '52px', fontSize: '1rem' }}>
                    Send Booking Request
                </Button>
            </div>
        </div>
    );
};

export default BookingWidget;
