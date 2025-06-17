'use client';

import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number, quantity: number) => void;
  onImageClick: (imageSrc: string) => void;
}

const DELIVERY_TEXT = '(Tepoztlán: 30 min, Cuernavaca: 60-120 min)';

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onImageClick,
}) => {
  const [currentQty, setCurrentQty] = useState(1);

  const handleDecreaseQuantity = () => {
    if (currentQty > 1) {
      setCurrentQty(currentQty - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setCurrentQty(currentQty + 1);
  };

  const handleAddToCart = () => {
    onAddToCart(product.id, currentQty);
    setCurrentQty(1); // Reset quantity after adding to cart
  };

  return (
    <div className="product-card">
      <img
        className="product-card-image"
        src={product.img}
        alt={product.name}
        style={{ width: '400px', height: '300px', objectFit: 'contain' }} // Add inline styles for initial testing
        onClick={() => onImageClick(product.img)}
      />
      <div className="product-card-info">
        <h2 className="product-card-name">{product.name.toUpperCase()}</h2>
        <div className="product-card-features">{product.features}</div>
        <p className="product-card-description">{product.description}</p>
        <div className="product-card-prices">
          <span style={{ color: '#d32f2f', fontWeight: 700 }}>
            A DOMICILIO ${Math.round(product.price * 1.08)}
          </span>
          <span style={{ color: '#111', fontWeight: 700 }}>
            *EN TIENDA ${product.price}
          </span>
        </div>
        <div className="product-card-delivery">{DELIVERY_TEXT}</div>
        <div className="product-card-controls">
          <div className="quantity-selector">
            <div className="quantity-selector-controls">
              <button className="qty-minus" onClick={handleDecreaseQuantity}>-</button>
              <span className="qty-value">{currentQty}</span>
              <button className="qty-plus" onClick={handleIncreaseQuantity}>+</button>
            </div>
            <span className="qty-label">Botella</span>
          </div>
          <button className="add-to-cart" onClick={handleAddToCart}>
            AGREGAR <span className="arrow">&#8594;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 