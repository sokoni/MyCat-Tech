import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight, Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart: React.FC = () => {
    const { cart, removeFromCart, clearCart, totalCount } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const navigate = useNavigate();

    const calculateTotal = () => {
        const total = cart.reduce((sum, item) => {
            const price = parseFloat(item.price.split(' ')[0]);
            return sum + (price * item.quantity);
        }, 0);
        return total.toFixed(2) + ' ETH';
    };

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        clearCart();
        navigate('/checkout-success');
    };

    if (cart.length === 0) {
        return (
            <div className="cart-page empty">
                <div className="empty-cart-message glass reveal">
                    <ShoppingBag size={64} className="neon-text" />
                    <h2>Your cart is empty</h2>
                    <p>Looks like your cat hasn't picked out any tech yet.</p>
                    <Link to="/store" className="btn btn-primary">Go to Shop</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <section className="section reveal">
                <div className="cart-header">
                    <h2 className="section-title">Your <span className="neon-text">Cart</span></h2>
                    <p className="section-subtitle">Review your futuristic feline hardware.</p>
                </div>

                <div className="cart-content">
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item glass reveal">
                                <div className="cart-item-icon">{item.icon}</div>
                                <div className="cart-item-details">
                                    <h3 className="item-name">{item.name}</h3>
                                    <p className="item-category">{item.category}</p>
                                </div>
                                <div className="cart-item-quantity">
                                    <span>Qty: {item.quantity}</span>
                                </div>
                                <div className="cart-item-price neon-text">
                                    {item.price}
                                </div>
                                <button
                                    className="remove-btn"
                                    onClick={() => removeFromCart(item.id)}
                                    title="Remove item"
                                    disabled={isCheckingOut}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary glass reveal">
                        <h3>Order Summary</h3>
                        <div className="summary-row">
                            <span>Items ({totalCount})</span>
                            <span className="neon-text">{calculateTotal()}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span className="neon-text">FREE</span>
                        </div>
                        <div className="summary-divider"></div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span className="neon-text">{calculateTotal()}</span>
                        </div>
                        <button
                            className="btn btn-primary w-full checkout-btn"
                            onClick={handleCheckout}
                            disabled={isCheckingOut}
                        >
                            {isCheckingOut ? (
                                <>Processing <Loader className="spin" size={18} /></>
                            ) : (
                                <>Proceed to Checkout <ArrowRight size={18} /></>
                            )}
                        </button>
                        <button
                            className="btn-link clear-btn"
                            onClick={clearCart}
                            disabled={isCheckingOut}
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Cart;
