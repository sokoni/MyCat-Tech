import React, { useState } from 'react';
import './Store.css';

interface Product {
    id: number;
    name: string;
    price: string;
    category: string;
    description: string;
    icon: string;
}

const products: Product[] = [
    {
        id: 1,
        name: "Cyber-Collar v4",
        price: "1.5 ETH",
        category: "Wearables",
        description: "Built-in GPS, biometrics, and a holographic nameplate.",
        icon: "💎"
    },
    {
        id: 2,
        name: "Quantum Laser Pointer",
        price: "0.8 ETH",
        category: "Hardware",
        description: "Generates non-predictable patterns for elite exercise.",
        icon: "🔦"
    },
    {
        id: 3,
        name: "Hydro-Nip Station",
        price: "2.2 ETH",
        category: "Appliances",
        description: "Automated hydration with organic catnip infusion.",
        icon: "⛲"
    },
    {
        id: 4,
        name: "Neural-Link Toy Mouse",
        price: "3.5 ETH",
        category: "Gadgets",
        description: "Controlled via smartphone for advanced hunting simulations.",
        icon: "🖱️"
    }
];

const Store: React.FC = () => {
    const [cartCount, setCartCount] = useState(0);

    const addToCart = () => {
        setCartCount(prev => prev + 1);
    };

    return (
        <div className="store-page">
            <div className="cart-sticky glass">
                <span>🛒</span>
                <span className="cart-count">{cartCount}</span>
            </div>

            <section className="section reveal">
                <div className="store-header">
                    <span className="badge glass">Exclusive Tech</span>
                    <h2 className="section-title">The <span className="neon-text">Gato</span> Shop</h2>
                    <p className="section-subtitle">Premium gadgets for the modern, high-tech feline lifestyle.</p>
                </div>

                <div className="store-grid">
                    {products.map((product) => (
                        <div className="product-card glass reveal" key={product.id}>
                            <div className="product-icon">{product.icon}</div>
                            <div className="product-info">
                                <span className="product-category">{product.category}</span>
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-desc">{product.description}</p>
                                <div className="product-footer">
                                    <span className="product-price neon-text">{product.price}</span>
                                    <button className="btn btn-primary btn-sm" onClick={addToCart}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Store;
