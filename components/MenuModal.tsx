'use client';

import React from 'react';
import { Category } from '../types';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onSelectCategory: (categoryId: number) => void;
}

const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  categories,
  onSelectCategory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="menu-modal">
      <div className="menu-modal-content">
        <span className="menu-close-button" onClick={onClose}>&times;</span>
        <h3>PRODUCTOS</h3>
        <div className="menu-categories">
          <ul>
            <li>
              <a href="#" className="menu-link" onClick={() => {
                onSelectCategory(0);
                onClose();
              }}>
                TODOS
              </a>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <a
                  href="#"
                  className="menu-link"
                  onClick={() => {
                    onSelectCategory(category.id);
                    onClose();
                  }}
                >
                  {category.name.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="menu-service-section">
          <h3>SERVICIO</h3>
          <ul>
            <li><a href="#" className="menu-link" onClick={onClose} data-category-id="domicilio">A DOMICILIO</a></li>
            <li><a href="#" className="menu-link" onClick={onClose} data-category-id="restaurantes">RESTAURANTES</a></li>
            <li><a href="#" className="menu-link" onClick={onClose} data-category-id="bodas">BODAS Y EVENTOS</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MenuModal; 