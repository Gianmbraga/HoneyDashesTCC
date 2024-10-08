import './App.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // Tema do PrimeReact
import 'primereact/resources/primereact.min.css';                  // Estilos base do PrimeReact
import 'primeicons/primeicons.css';                                // Ícones do PrimeReact
import RouteManagment from "./RouteManagment";

import React from 'react';
import { Button } from 'primereact/button';  // Importa o componente Button

function App() {
  return (
    <>
      <RouteManagment />
    </>
  );
}

export default App;

