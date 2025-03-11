import React, { useState } from 'react';
import './LojaInformatica.css';

// Objeto com URLs de logos para cada marca
const brandLogos = {
  'HP': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/1200px-HP_logo_2012.svg.png',
  'Dell': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/1280px-Dell_Logo.svg.png',
  'Positivo': '/logos/positivo.png',
  'Asus': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/2560px-ASUS_Logo.svg.png',
  'Apple': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/488px-Apple_logo_black.svg.png'
};

const TechStore = () => {
  const [section, setSection] = useState('');
  const [brand, setBrand] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('Novo');
  const [products, setProducts] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const sections = ['Computadores', 'Acessórios', 'Impressoras', 'Games', 'Gadgets'];
  const brands = ['HP', 'Dell', 'Positivo', 'Asus', 'Apple'];

  const handleInsertProduct = () => {
    if (!section || !brand || !productName || !price) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const newProduct = {
      id: Date.now(),
      section,
      brand,
      name: productName,
      price,
      condition,
      logoUrl: brandLogos[brand] // Adicionando a URL do logo
    };

    setProducts([...products, newProduct]);
    
    // Reset form
    setSection('');
    setBrand('');
    setProductName('');
    setPrice('');
    setCondition('Novo');
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowCard(true);
  };

  // Função para renderizar o logo da marca ou um fallback com as iniciais
  const renderBrandLogo = (product) => {
    if (product.logoUrl) {
      return (
        <div className="logo-container">
          <img 
            src={product.logoUrl} 
            alt={`${product.brand} logo`} 
            className="brand-logo-img" 
          />
        </div>
      );
    } else {
      // Fallback para o círculo com iniciais caso não haja logo
      return (
        <div className="logo-container">
          <div className="brand-logo">
            <span>{product.brand.substring(0, 2).toLowerCase()}</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="container">
          <h1 className="header-title">TechStore - Loja de Informática</h1>
        </div>
      </header>

      <main className="main container">
        <div className="content-wrapper">
          {/* Product Form */}
          <div className="product-form">
            <h2 className="section-title">Dados do Produto:</h2>
            
            <div className="form-group">
              <label className="form-label">Seção:</label>
              <div className="select-wrapper">
                <select 
                  className="form-select"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                >
                  <option value="">Selecione uma seção</option>
                  {sections.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Marca:</label>
              <div className="select-wrapper">
                <select 
                  className="form-select"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                >
                  <option value="">Selecione uma marca</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Nome:</label>
              <input 
                type="text" 
                className="form-input"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Preço:</label>
              <input 
                type="text" 
                className="form-input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Condição:</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="condition" 
                    value="Novo" 
                    checked={condition === 'Novo'} 
                    onChange={() => setCondition('Novo')}
                  />
                  <span>Novo</span>
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="condition" 
                    value="Usado" 
                    checked={condition === 'Usado'} 
                    onChange={() => setCondition('Usado')}
                  />
                  <span>Usado</span>
                </label>
              </div>
            </div>
            
            <button 
              className="submit-button"
              onClick={handleInsertProduct}
            >
              INSERIR PRODUTO
            </button>
          </div>
          
          {/* Product List */}
          <div className="product-list">
            <h2 className="section-title">Produtos Cadastrados</h2>
            
            {products.length === 0 ? (
              <div className="empty-message">
                <p>Nenhum produto cadastrado ainda.</p>
              </div>
            ) : (
              <div className="product-grid">
                {products.map((product) => (
                  <div 
                    key={product.id} 
                    className="product-card"
                    onClick={() => handleViewProduct(product)}
                  >
                    {renderBrandLogo(product)}
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">R$ {product.price}</p>
                    <p className="product-condition">{product.condition}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Product Detail Modal */}
      {showCard && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-content">
              <div className="modal-header">
                <div>
                  <h3 className="modal-title">{selectedProduct.name}</h3>
                  <p className="modal-subtitle">{selectedProduct.brand}</p>
                </div>
                <button 
                  className="close-button"
                  onClick={() => setShowCard(false)}
                >
                  ✕
                </button>
              </div>
              
              <div className="modal-logo">
                {selectedProduct.logoUrl ? (
                  <img 
                    src={selectedProduct.logoUrl} 
                    alt={`${selectedProduct.brand} logo`} 
                    className="brand-logo-img large" 
                  />
                ) : (
                  <div className="brand-logo large">
                    <span>{selectedProduct.brand.substring(0, 2).toLowerCase()}</span>
                  </div>
                )}
              </div>
              
              <div className="modal-details">
                <p><strong>Seção:</strong> {selectedProduct.section}</p>
                <p><strong>Marca:</strong> {selectedProduct.brand}</p>
                <p><strong>Preço:</strong> R$ {selectedProduct.price}</p>
                <p><strong>Condição:</strong> {selectedProduct.condition}</p>
              </div>
              
              <button 
                className="close-button-full"
                onClick={() => setShowCard(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer with Sections */}
      <footer className="footer">
        <div className="container">
          <div className="footer-links">
            {sections.map((s) => (
              <a 
                key={s} 
                href="#" 
                className="footer-link"
                onClick={(e) => {
                  e.preventDefault();
                  setSection(s);
                }}
              >
                {s}
              </a>
            ))}
          </div>
          <div className="copyright">
            &copy; {new Date().getFullYear()} TechStore - Loja de Informática. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TechStore;