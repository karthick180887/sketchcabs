'use client';

import React, { useState } from 'react';
import styles from './BookingWidget.module.css';
import Button from './Button';
import { User, Phone, MapPin, Calendar, Clock, Car, Loader2, CheckCircle2 } from 'lucide-react';

// Fare rates per km for different car types
const carRates: Record<string, { rate: number; minKm: number; bata: number }> = {
    'MINI': { rate: 12, minKm: 130, bata: 300 },
    'SEDAN': { rate: 13, minKm: 130, bata: 300 },
    'ETIOS': { rate: 14, minKm: 130, bata: 300 },
    'SUV': { rate: 18, minKm: 130, bata: 300 },
    'INNOVA': { rate: 19, minKm: 130, bata: 300 },
    'INNOVA CRYSTA': { rate: 25, minKm: 130, bata: 300 },
};

const roundTripRates: Record<string, { rate: number; minKm: number; bata: number }> = {
    'MINI': { rate: 11, minKm: 250, bata: 300 },
    'SEDAN': { rate: 12, minKm: 250, bata: 300 },
    'ETIOS': { rate: 13, minKm: 250, bata: 300 },
    'SUV': { rate: 16, minKm: 250, bata: 300 },
    'INNOVA': { rate: 17, minKm: 250, bata: 300 },
    'INNOVA CRYSTA': { rate: 20, minKm: 250, bata: 300 },
};

import { usePlacesWidget } from "react-google-autocomplete";

declare const google: any;

// ... existing imports

const BookingWidget: React.FC = () => {
    const [tripType, setTripType] = useState<'oneway' | 'roundtrip'>('oneway');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [pickup, setPickup] = useState('');
    const [drop, setDrop] = useState('');
    const [pickupPlace, setPickupPlace] = useState<any>(null);
    const [dropPlace, setDropPlace] = useState<any>(null);
    const [date, setDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [time, setTime] = useState('');
    const [carType, setCarType] = useState('SEDAN');
    const [distance, setDistance] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const { ref: pickupRef } = usePlacesWidget({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        onPlaceSelected: (place: any) => {
            setPickup(place.formatted_address || '');
            setPickupPlace(place);
        },
        options: {
            types: ["(regions)"],
            componentRestrictions: { country: "in" },
            fields: ["geometry", "formatted_address"],
        },
    });

    const { ref: dropRef } = usePlacesWidget({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        onPlaceSelected: (place: any) => {
            setDrop(place.formatted_address || '');
            setDropPlace(place);
        },
        options: {
            types: ["(regions)"],
            componentRestrictions: { country: "in" },
            fields: ["geometry", "formatted_address"],
        },
    });

    React.useEffect(() => {
        if (!pickupPlace || !dropPlace || !pickupPlace.geometry || !dropPlace.geometry) {
            return;
        }
        if (typeof google === 'undefined' || !google?.maps?.DistanceMatrixService) {
            return;
        }

        const service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
            origins: [pickupPlace.geometry.location],
            destinations: [dropPlace.geometry.location],
            travelMode: google.maps.TravelMode.DRIVING,
        }, (response: any, status: any) => {
            if (status === 'OK' && response?.rows[0]?.elements[0]?.status === 'OK') {
                const distanceInMeters = response.rows[0].elements[0].distance.value;
                const distanceInKm = (distanceInMeters / 1000).toFixed(0);
                setDistance(distanceInKm);
            }
        });
    }, [pickupPlace, dropPlace]);

    const calculateFare = () => {
        const distanceKm = Math.max(0, parseFloat(distance) || 0);

        if (tripType === 'roundtrip') {
            const car = roundTripRates[carType] || roundTripRates['SEDAN'];

            let numDays = 1;
            if (date && returnDate) {
                const start = new Date(date);
                const end = new Date(returnDate);
                const diffTime = Math.abs(end.getTime() - start.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                numDays = diffDays < 1 ? 1 : diffDays + 1; // Include start day
            }

            const minKmTotal = car.minKm * numDays;
            const roundTripDistance = distanceKm * 2;
            const chargeableKm = Math.max(roundTripDistance, minKmTotal);
            const baseFare = chargeableKm * car.rate;
            const bata = car.bata * numDays;
            const total = baseFare + bata;

            return {
                baseFare: Math.round(baseFare),
                bata,
                total: Math.round(total),
                chargeableKm,
                numDays,
            };
        }

        const car = carRates[carType] || carRates['SEDAN'];
        const chargeableKm = Math.max(distanceKm, car.minKm);
        const baseFare = chargeableKm * car.rate;
        const bata = car.bata;

        return {
            baseFare: Math.round(baseFare),
            bata,
            total: Math.round(baseFare + bata),
            chargeableKm,
            numDays: 1,
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

    const handleBook = async () => {
        if (!name || !phone || !pickup || !drop || !date) {
            alert('Please fill in all required fields');
            return;
        }
        if (phone.length !== 10 || !/^[0-9]{10}$/.test(phone)) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }
        if (tripType === 'roundtrip' && !returnDate) {
            alert('Please select a return date for round trip');
            return;
        }

        setLoading(true);
        const fare = calculateFare();
        const distanceKm = parseFloat(distance) || 0;

        try {
            const response = await fetch('/api/telegram-booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tripType,
                    name,
                    phone: '+91' + phone,
                    pickup,
                    drop,
                    date,
                    returnDate: tripType === 'roundtrip' ? returnDate : null,
                    time: formatTime(time),
                    carType,
                    distance: distanceKm,
                    fare
                })
            });

            if (response.ok) {
                setSuccess(true);
                // Reset form
                setName('');
                setPhone('');
                setPickup('');
                setDrop('');
                setDate('');
                setReturnDate('');
                setTime('');
                setDistance('');
                setTimeout(() => setSuccess(false), 5000); // Hide after 5 seconds
            } else {
                const errorData = await response.json();
                console.error('Booking Error:', errorData);
                alert(`Error: ${errorData.error || 'Something went wrong'}.`);
            }
        } catch (error) {
            console.error('Failed to send Telegram notification', error);
            alert('Failed to send request. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className={styles.widget} style={{ justifyContent: 'center', alignItems: 'center', minHeight: '400px', display: 'flex' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '24px' }}>
                    <CheckCircle2 size={64} style={{ color: '#22c55e', marginBottom: '16px' }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#000000', marginBottom: '8px' }}>Booking Requested!</h3>
                    <p style={{ color: '#000000' }}>
                        Thank you. We have received your booking request. Our team will contact you shortly to confirm.
                    </p>
                    <button
                        onClick={() => setSuccess(false)}
                        style={{
                            marginTop: '24px',
                            padding: '8px 16px',
                            backgroundColor: '#f3f4f6',
                            color: '#000000',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: '500'
                        }}
                    >
                        Book Another Trip
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.widget}>
            <div className={styles.header}>
                <h3 className={styles.headerTitle}>Book Your Cab</h3>
                <p className={styles.headerSubtitle}>Share your trip details</p>
            </div>

            <div style={{ display: 'flex', background: 'linear-gradient(to right, #f3f4f6, #e5e7eb)', padding: '6px', borderRadius: '12px', marginBottom: '16px', marginLeft: '16px', marginRight: '16px' }}>
                <button
                    style={{
                        flex: 1,
                        padding: '10px 16px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        background: tripType === 'oneway' ? 'linear-gradient(to right, #facc15, #eab308)' : 'transparent',
                        color: tripType === 'oneway' ? '#000' : '#4b5563',
                        boxShadow: tripType === 'oneway' ? '0 4px 6px rgba(0,0,0,0.1)' : 'none'
                    }}
                    onClick={() => setTripType('oneway')}
                >
                    One Way
                </button>
                <button
                    style={{
                        flex: 1,
                        padding: '10px 16px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        background: tripType === 'roundtrip' ? 'linear-gradient(to right, #facc15, #eab308)' : 'transparent',
                        color: tripType === 'roundtrip' ? '#000' : '#4b5563',
                        boxShadow: tripType === 'roundtrip' ? '0 4px 6px rgba(0,0,0,0.1)' : 'none'
                    }}
                    onClick={() => setTripType('roundtrip')}
                >
                    Round Trip
                </button>
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
                    <div className={styles.inputGroup} style={{ display: 'flex', alignItems: 'center', padding: '0.6rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}>
                        <Phone size={16} style={{ color: 'hsl(160, 84%, 39%)', marginRight: '8px', flexShrink: 0 }} />
                        <span style={{ color: '#374151', fontWeight: '500', fontSize: '14px', marginRight: '4px' }}>+91</span>
                        <input
                            type="tel"
                            style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, fontSize: '0.85rem', color: '#0f172a', padding: 0 }}
                            placeholder="9876543210"
                            value={phone}
                            maxLength={10}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                if (val.length <= 10) setPhone(val);
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Pickup Location</label>
                <div className={styles.inputGroup}>
                    <MapPin size={16} className={styles.icon} />
                    <input
                        ref={pickupRef}
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
                        ref={dropRef}
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
                {tripType === 'roundtrip' && (
                    <div className={styles.field}>
                        <label className={styles.label}>Return Date</label>
                        <div className={styles.inputGroup}>
                            <Calendar size={16} className={styles.icon} />
                            <input
                                type="date"
                                className={styles.input}
                                value={returnDate}
                                min={date}
                                onChange={(e) => setReturnDate(e.target.value)}
                            />
                        </div>
                    </div>
                )}
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
                    <div className={styles.inputGroup} style={{ display: 'flex', alignItems: 'center', padding: '0.6rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}>
                        <Car size={16} style={{ color: 'hsl(160, 84%, 39%)', marginRight: '8px', flexShrink: 0 }} />
                        <select
                            style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, fontSize: '0.85rem', color: '#0f172a', padding: 0, cursor: 'pointer' }}
                            value={carType}
                            onChange={(e) => setCarType(e.target.value)}
                        >
                            <option value="MINI">Mini</option>
                            <option value="SEDAN">Sedan</option>
                            <option value="ETIOS">Etios</option>
                            <option value="SUV">SUV</option>
                            <option value="INNOVA">Innova</option>
                            <option value="INNOVA CRYSTA">Innova Crysta</option>
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

            {/* Submit Button */}
            <div className={styles.submitButton}>
                <Button
                    onClick={handleBook}
                    size="lg"
                    style={{ width: '100%', height: '52px', fontSize: '1rem' }}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin mr-2" size={20} />
                            Sending...
                        </>
                    ) : (
                        'Send Booking Request'
                    )}
                </Button>
            </div>
        </div >
    );
};

export default BookingWidget;
