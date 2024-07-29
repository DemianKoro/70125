import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="background-wood home-container">
      <h1>Bienvenidos a la Biblioteca de Libros de Ciencia Ficción, Terror y Fantasía</h1>
      <p className="welcome-message">
        Explora nuestra extensa colección de libros y sumérgete en mundos fascinantes llenos de aventuras,
        misterios y maravillas. Ya sea que te apasione la ciencia ficción, el terror o la fantasía, aquí
        encontrarás las mejores obras literarias para saciar tu sed de lectura. ¡Descubre tu próxima gran
        aventura hoy mismo!
      </p>
      <div className="image-gallery">
        <img src="https://example.com/scifi.jpg" alt="Ciencia Ficción" className="gallery-image" />
        <img src="https://example.com/horror.jpg" alt="Terror" className="gallery-image" />
        <img src="https://example.com/fantasy.jpg" alt="Fantasía" className="gallery-image" />
      </div>
    </div>
  );
};

export default Home;
