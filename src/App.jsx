import { useState, useEffect } from "react";
import axios from "axios";
import numeroAleatorio from "./helpers/numeroAleatorio.js";
import Opciones from "./components/Opciones.jsx";
import Referencias from "./components/Referencias.jsx";
import cv from "./assets/CV_en Apr2024.png";

let total; // Numero total de paises
let totalPaises = []; // Paises totales

function App() {
  const [paises, setPaises] = useState([]);

  let numero;

  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const { data } = await axios.get("https://flagcdn.com/en/codes.json");
        Object.keys(data)
          .filter(
            (clave) =>
              clave.startsWith("us-") ||
              clave.startsWith("bv") ||
              clave.startsWith("mf") ||
              clave.startsWith("um") ||
              clave.startsWith("sj") ||
              clave.startsWith("hm")
          )
          .forEach((clave) => delete data[clave]);

        setPaises(data);
        total = Object.keys(data).length;
        totalPaises = data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFlags();
  }, []);

  // Paises restantes por adivinar
  numero = Object.keys(paises).length - 1;

  // Llaves de los paises restantes
  const keys = Object.keys(paises);

  // Llaves de los paises totales
  const keysTotales = Object.keys(totalPaises) || [];

  // Bandera actual a adivinar
  const banderaActual = keys[numeroAleatorio(0, numero)] || ""; // Prefijo de la bandera

  let bandera2 = keysTotales[numeroAleatorio(0, total - 1)] || ""; // Hacen uso de elementos obtenidos gracias al state de paises, porque al modificarse este, se modifican estas variables también
  let bandera3 = keysTotales[numeroAleatorio(0, total - 1)] || "";
  let bandera4 = keysTotales[numeroAleatorio(0, total - 1)] || "";

  // Si las banderas son iguales, se cambian
  while (bandera2 === banderaActual) {
    bandera2 = keysTotales[numeroAleatorio(0, total - 1)];
  }

  while (
    (bandera3 !== "" && bandera3 === banderaActual) ||
    bandera3 === bandera2
  ) {
    bandera3 = keysTotales[numeroAleatorio(0, total - 1)];
  }

  while (
    bandera4 !== "" &&
    (bandera4 === banderaActual ||
      bandera4 === bandera2 ||
      bandera4 === bandera3)
  ) {
    bandera4 = keysTotales[numeroAleatorio(0, total - 1)];
  }

  function handleClick(event, banderaPref) {
    if (banderaActual === banderaPref) {
      setPaises((prevPaises) => {
        const newPaises = { ...prevPaises };
        delete newPaises[banderaActual];
        return newPaises;
      });
    } else if (event.target.tagName === "BUTTON") {
      // Se actualiza inmediatamente porque no esta afectando al contenido, sino una clase de un elemento dentro de el
      event.target.classList.add("error");
    } else {
      event.target.parentElement.classList.add("error");
    }
  }

  return (
    <div className="card">
      {keys.length === 0 ? (
        <div className="final">
          <h1>¡Felicidades!</h1>
          <p>Has adivinado todas las banderas</p>
        </div>
      ) : (
        <>
          <header>
            <nav>
              <Referencias url={"https://flagpedia.net/download/api"}>
                API Utilizada
              </Referencias>

              <div className="personal-info">
                <Referencias url={cv}>Mi CV</Referencias>
                <Referencias
                  url={
                    "https://www.linkedin.com/in/eduardo-larios-espinoza-216185242/"
                  }
                >
                  LinkedIn
                </Referencias>
              </div>
            </nav>

            <h1>{paises[banderaActual]}</h1>
            <p>
              Aciertos: {total - keys.length} / {total}
            </p>
          </header>
          <main>
            <section className="banderas">
              <Opciones
                order={numeroAleatorio(1, 8)}
                className="bandera"
                prefijo={banderaActual}
                onSelect={(event) => handleClick(event, banderaActual)}
              />
              <Opciones
                order="2"
                className="bandera"
                prefijo={bandera2 || ""}
                onSelect={(event) => handleClick(event, bandera2)}
              />
              <Opciones
                order="4"
                className="bandera"
                prefijo={bandera3 || ""}
                onSelect={(event) => handleClick(event, bandera3)}
              />
              <Opciones
                order="6"
                className="bandera"
                prefijo={bandera4 || ""}
                onSelect={(event) => handleClick(event, bandera4)}
              />
            </section>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
