'use client';

import React from 'react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick, onMenuClick }) => {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">SOLOVINO</div>
        <div className="header-icons">
          <span className="cart-icon" title="Carrito" onClick={onCartClick}>
            <img src="/img/cart.svg" alt="Carrito" height={28} width={28} />
            {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
          </span>
          <span className="menu-icon" title="Menú" onClick={onMenuClick}>
            <img src="/img/menu.svg" alt="Menú" height={28} width={28} />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header; 