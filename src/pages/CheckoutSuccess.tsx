import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import './CheckoutSuccess.css';

const CheckoutSuccess: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="success-page">
            <div className="success-card glass reveal">
                <CheckCircle size={80} className="success-icon neon-text" />
                <h1 className="success-title">Order Confirmed!</h1>
                <p className="success-message">
                    Your feline tech is being prepared for quantum teleportation.
                </p>
                <div className="order-details">
                    <p>Order ID: <span className="neon-cyan">#{Math.floor(Math.random() * 1000000)}</span></p>
                    <p>Estimated Arrival: <span className="neon-magenta">Instant</span></p>
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/store')}>
                    Continue Shopping <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default CheckoutSuccess;
