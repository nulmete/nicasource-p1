import React from "react";
import { BrowserRouter } from "react-router-dom";
import StatisticsContainer from "./components/Statistics/containers/StatisticsContainer";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <StatisticsContainer />
    </BrowserRouter>
  );
};

export default App;
