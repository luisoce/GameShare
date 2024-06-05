import "./buscador.css";
import CardJuego from "./CardJuego";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function BarraBuscador() {
  const url = `http://localhost:8080/videojuegos`;
  const [videoJuegos, setVideoJuegos] = useState([]);
  const [cantidad, setCantidad] = useState(10);
  const [busqueda, setBusqueda] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (e) => {
    setBusqueda(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    const filtered = videoJuegos.filter((videojuego) =>
      videojuego.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const shuffledData = shuffleArray(response.data);
        setVideoJuegos(shuffledData);
      } catch (error) {
        console.error("Hubo un error al hacer la solicitud:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container buscador">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-6 col-lg-6">
          <div className="input-group mb-2 buscador-pequeno">
            <input
              onChange={handleSearch}
              type="text"
              className="form-control buscador-input"
              placeholder="Buscar..."
              aria-label="Buscar"
              aria-describedby="button-addon2"
            />
            <button
              onClick={handleSubmit}
              className="btn btn-buscador btn-bd-primary"
              type="button"
              id="button-addon2"
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
      </div>
      <section className="cards-recomendado">
        <h2>Recomendados</h2>
        {isSubmiting ? (
          <div className="container-cards flex">
            {filteredData.slice(0, cantidad).map((videojuego) => (
              <CardJuego key={videojuego.id} videojuego={videojuego} />
            ))}
          </div>
        ) : (
          <div className="container-cards flex">
            {videoJuegos.slice(0, cantidad).map((videojuego) => (
              <CardJuego key={videojuego.id} videojuego={videojuego} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default BarraBuscador;

function shuffleArray(array) {
  const shuffledArray = array.slice(); // Crear una copia del array para no mutar el original
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
