'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import StoreInfo from '../components/StoreInfo';
import ProductCard from '../components/ProductCard';
import CartModal from '../components/CartModal';
import MenuModal from '../components/MenuModal';
import { Product, Category, CartItem, StoreInfo as StoreInfoType } from '../types';

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const Home: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [fullscreenImageSrc, setFullscreenImageSrc] = useState<string | null>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Store Info (static for now, can be fetched later)
  const storeInfo: StoreInfoType = {
    title: 'SOLOVINO',
    location: 'TEPOZTLÁN',
    hours: 'LUNES A DOMINGO 10:00 - 20:00 hrs.',
    address: 'Ignacio Zaragoza 19, Santisima Trinidad<br>Tepoztlán, Morelos, México.',
    illustration: '/img/solo4.png',
  };

  // Load data and cart on component mount
  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data: { data: Product[]; categories: Category[] }) => {
        setAllProducts(data.data);
        setFilteredProducts(data.data); // Initially show all products
        setCategories(data.categories);
      })
      .catch((err) => console.error('Error loading data.json:', err));

    const localCart = localStorage.getItem('cart');
    if (localCart) {
      setCart(JSON.parse(localCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = useCallback((productId: number, quantity: number) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.id === productId);
      if (itemIndex > -1) {
        const newCart = [...prevCart];
        newCart[itemIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { id: productId, quantity }];
      }
    });
  }, []);

  const handleRemoveFromCart = useCallback((productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  const handleFilterByCategory = useCallback((categoryId: number) => {
    if (categoryId === 0) {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(allProducts.filter((p) => p.category === categoryId));
    }
    setIsMenuModalOpen(false);
    setTimeout(() => {
      if (productsRef.current) {
        const y = productsRef.current.getBoundingClientRect().top + window.scrollY - 60; // 16px offset for spacing
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  }, [allProducts]);

  const handleImageClick = useCallback((imageSrc: string) => {
    setFullscreenImageSrc(imageSrc);
  }, []);

  const handleCloseFullscreenImage = useCallback(() => {
    setFullscreenImageSrc(null);
  }, []);

  // Intersection Observer for updating URL hash based on scroll position
  useEffect(() => {
    if (!filteredProducts.length) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const id = entry.target.id;
            if (id && window.location.hash !== `#${id}`) {
              window.history.replaceState(null, '', `#${id}`);
            }
          }
        });
      },
      { threshold: 0.5 }
    );
    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [filteredProducts]);

  // Scroll to anchor on load if hash is present
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.substring(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div>
      <Head>
        <title>SOLOVINO</title>
      </Head>

      <Header
        cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => {
          console.log('Cart icon clicked!');
          setIsCartModalOpen(true);
        }}
        onMenuClick={() => {
          console.log('Menu icon clicked!');
          setIsMenuModalOpen(true);
        }}
      />

      <main className="main-content">
        <StoreInfo info={storeInfo} />

        <div ref={productsRef} className="products-container">
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
              No hay productos disponibles
            </div>
          ) : (
            filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onImageClick={handleImageClick}
                ref={el => { cardRefs.current[idx] = el; }}
              />
            ))
          )}
        </div>

        <footer className="footer">
          <img src="/img/solo4.png" alt="Solovino Footer Illustration" className="footer-illustration" style={{ width: '600px', height: '400px', objectFit: 'contain' }} />
          <div className="footer-info">
            <div className="footer-title">
              <span className="footer-location">{storeInfo.location.toUpperCase()}</span>
            </div>
            <div className="footer-hours">{storeInfo.hours}</div>
            <div className="footer-address">
              {storeInfo.address.split('<br>').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < storeInfo.address.split('<br>').length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
            <div className="footer-buttons">
              <a href="mailto:info@solovino.mx" className="footer-btn">CORREO <span className="arrow">&#8594;</span><br /><span className="footer-btn-sub"></span></a>
              <a href="tel:+5217771234567" className="footer-btn">TELÉFONO <span className="arrow">&#8594;</span><br /><span className="footer-btn-sub"> </span></a>
            </div>
          </div>
        </footer>
      </main>

      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => {
          console.log('Cart modal close triggered!');
          setIsCartModalOpen(false);
        }}
        cartItems={cart}
        allProducts={allProducts}
        onRemoveItem={handleRemoveFromCart}
      />

      <MenuModal
        isOpen={isMenuModalOpen}
        onClose={() => {
          console.log('Menu modal close triggered!');
          setIsMenuModalOpen(false);
        }}
        categories={categories}
        onSelectCategory={handleFilterByCategory}
      />

      {fullscreenImageSrc && (
        <div id="fullscreen-modal" className="fullscreen-modal" onClick={() => {
          console.log('Fullscreen modal clicked (close)!');
          handleCloseFullscreenImage();
        }}>
          <img
            className="fullscreen-image"
            src={fullscreenImageSrc}
            alt="Product full view"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
