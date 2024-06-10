import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [raza, setRaza] = useState('');
  const [razas, setRazas] = useState([]);
  const [razaSeleccionada, setRazaSeleccionada] = useState(null);

  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/breeds')
      .then(response => response.json())
      .then(data => setRazas(data))
      .catch(error => console.error('Error al obtener las razas de gatos:', error));
  }, []);

  const handleInputChange = (event) => {
    setRaza(event.target.value);
  };

  const handleBuscarClick = () => {
    const razasFiltradas = razas.filter(r => r.name.toLowerCase().includes(raza.toLowerCase()));
    if (razasFiltradas.length > 0) {
      handleRazaClick(razasFiltradas[0]);
    } else {
      setRazaSeleccionada(null);
    }
  };

  const handleRazaClick = (raza) => {
    fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${raza.id}&limit=5`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          setRazaSeleccionada({ ...raza, imagenes: data.map(img => img.url) });
        }
      })
      .catch(error => console.error('Error al obtener la imagen del gato:', error));
  };

  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4 text-center">Búsqueda de Razas de Gatos</h1>
      </div>
      <div className="input-group mb-3 search-bar">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar una raza de gato..."
          value={raza}
          onChange={handleInputChange}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="button" onClick={handleBuscarClick}>Buscar</button>
        </div>
      </div>

      {razaSeleccionada && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{razaSeleccionada.name}</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setRazaSeleccionada(null)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {razaSeleccionada.imagenes && (
                  <div id="catCarousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                      {razaSeleccionada.imagenes.map((img, index) => (
                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                          <img
                            src={img}
                            alt={`${razaSeleccionada.name} ${index + 1}`}
                            className="d-block w-100"
                            style={{ maxHeight: '400px', objectFit: 'cover' }}
                          />
                        </div>
                      ))}
                    </div>
                    <a className="carousel-control-prev" href="#catCarousel" role="button" data-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#catCarousel" role="button" data-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                )}
                <p className="mt-3">{razaSeleccionada.description}</p>
                <p><strong>Temperament:</strong> {razaSeleccionada.temperament}</p>
                <p><strong>Origin:</strong> {razaSeleccionada.origin}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
