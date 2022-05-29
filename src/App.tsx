import React from 'react';
import './App.css';
import TopPageComponent from "./TopPage";
import {TopPageProvider} from "./TopPage/Context/TopPageContext";

function App() {
  return (
    <div className="app">
      <TopPageProvider>
        <TopPageComponent />
      </TopPageProvider>
      
    </div>
  );
}

export default App;
