'use client';

import React from 'react';
import { Product, CartItem } from '../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  allProducts: Product[];
  onRemoveItem: (productId: number) => void;
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  allProducts,
  onRemoveItem,
}) => {
  if (!isOpen) return null;

  const totalPrice = cartItems.reduce((sum, item) => {
    const product = allProducts.find((p) => p.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  return (
    <div className="cart-modal">
      <div className="cart-modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Pedido a domicilio</h2>
        <ul id="cart-items" className="cart-items-list">
          {cartItems.length === 0 ? (
            <li style={{ textAlign: 'center', fontStyle: 'italic', color: '#777' }}>Tu carrito está vacío.</li>
          ) : (
            cartItems.map((item) => {
              const product = allProducts.find((p) => p.id === item.id);
              return product ? (
                <li key={item.id}>
                  <div className="cart-item-info">{product.name}</div>
                  <div className="cart-item-quantity">{item.quantity} x ${product.price.toFixed(2)}</div>
                  <button className="remove-item-btn" onClick={() => onRemoveItem(product.id)}>&times;</button>
                </li>
              ) : null;
            })
          )}
        </ul>
        <div className="cart-total">Total: $<span id="cart-total-price">{totalPrice.toFixed(2)}</span></div>
        <h3>Confirma tu pedido por:</h3>
        <button className="checkout-button">Teléfono</button>
        <button className="checkout-button">WhatsApp</button>
        <button className="checkout-button">PAYPAL</button>
      </div>
    </div>
  );
};

export default CartModal; 