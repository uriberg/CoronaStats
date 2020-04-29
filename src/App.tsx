import React from 'react';
import logo from './logo.svg';
import './sass/main.scss';
import CoronaTable from "./components/CoronaTable";
import Graph from "./components/graph";

function App() {
  return (
    <div className="App">
      <CoronaTable/>
      <Graph/>
    </div>
  );
}

export default App;


