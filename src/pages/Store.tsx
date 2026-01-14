import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { products, categories, Product } from '../data/products';
import './Store.css';

const Store: React.FC = () => {
    const { addToCart, totalCount } = useCart();
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredProducts = selectedCategory === "All"
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <div className="store-page">
            <div className="cart-sticky glass">
                <span>🛒</span>
                <span className="cart-count">{totalCount}</span>
            </div>

            <section className="section reveal">
                <div className="store-header">
                    <span className="badge glass">Future Commerce</span>
                    <h2 className="section-title">The <span className="neon-text">Gato</span> Shop</h2>
                    <p className="section-subtitle">Premium equipment for every biological and digital need.</p>

                    <div className="category-filter">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="store-grid">
                    {filteredProducts.map((product) => (
                        <div className="product-card glass reveal" key={product.id}>
                            <div className="product-icon">{product.icon}</div>
                            <div className="product-info">
                                <span className="product-category">{product.category}</span>
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-desc">{product.description}</p>
                                <div className="product-footer">
                                    <span className="product-price neon-text">{product.price}</span>
                                    <button className="btn btn-primary btn-sm" onClick={() => addToCart(product)}>
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
