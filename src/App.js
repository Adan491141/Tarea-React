import React, { useState } from 'react';

import './styles.css'
// Clase Publicacion
class Publicacion {
  constructor(titulo, año) {
    this.titulo = titulo;
    this.año = año;
  }
}

// Clase Libro que hereda de Publicacion
class Libro extends Publicacion {
  constructor(titulo, año, autor, genero) {
    super(titulo, año);
    this.autor = autor;
    this.genero = genero;
  }
}

const App = () => {
  const [libros, setLibros] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [año, setAño] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [filtroGenero, setFiltroGenero] = useState('');
  const [mostrarLista, setMostrarLista] = useState(true);
  const [mostrarBusqueda, setMostrarBusqueda] = useState(true);

  const validarEntrada = () => {
    return new Promise((resolve, reject) => {
      const regexNumeros = /\d/;
      if (!titulo || !año || !autor || !genero) {
        reject('Todos los campos son obligatorios');
      } else if (isNaN(año) || año.length !== 4) {
        reject('El año debe ser un número de 4 dígitos');
      } else if (regexNumeros.test(autor)) {
        reject('El autor no puede contener números');
      } else if (regexNumeros.test(genero)) {
        reject('El género no puede contener números');
      } else {
        resolve();
      }
    });
  };

  const añadirLibro = () => {
    validarEntrada()
      .then(() => {
        const nuevoLibro = new Libro(titulo, año, autor, genero);
        setLibros([...libros, nuevoLibro]);
        setTitulo('');
        setAño('');
        setAutor('');
        setGenero('');
      })
      .catch((error) => {
        alert(error);
      });
  };

  const listarLibros = () => {
    return libros.map((libro, index) => (
      <li key={index}>
        {libro.titulo} - {libro.año} - {libro.autor} - {libro.genero}
      </li>
    ));
  };

  const buscarPorGenero = () => {
    return libros
      .filter(libro => libro.genero.toLowerCase() === filtroGenero.toLowerCase())
      .map((libro, index) => (
        <li key={index}>
          {libro.titulo} - {libro.año} - {libro.autor} - {libro.genero}
        </li>
      ));
  };

  return (
    <div className="container">
      <h1>Gestión de Libros</h1>
      <div className="container_entradas">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Año"
          value={año}
          onChange={(e) => setAño(e.target.value)}
        />
        <input
          type="text"
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Género"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        />
        <button onClick={añadirLibro}>Añadir Libro</button>
      </div>
      <button onClick={() => setMostrarLista(!mostrarLista)}>
        {mostrarLista ? 'Ocultar Lista de Libros' : 'Mostrar Lista de Libros'}
      </button>
      {mostrarLista && (
        <>
          <h2>Lista de Libros</h2>
          <ul>{listarLibros()}</ul>
        </>
      )}
      <button onClick={() => setMostrarBusqueda(!mostrarBusqueda)}>
        {mostrarBusqueda ? 'Ocultar Búsqueda de Libros' : 'Mostrar Búsqueda de Libros'}
      </button>
      {mostrarBusqueda && (
        <>
          <h2>Buscar por Género</h2>
          <input
            type="text"
            placeholder="Género"
            value={filtroGenero}
            onChange={(e) => setFiltroGenero(e.target.value)}
          />
          <ul>{buscarPorGenero()}</ul>
        </>
      )}
    </div>
  );
};

export default App;