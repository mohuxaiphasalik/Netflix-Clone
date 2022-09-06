import React from "react";
import Row from "./components/Row";
import requests from "./request";
import "./styles/style.css";
function App() {
  return (
    <div className="App">
      <Row
        title="Netflix Original"
        fetch={requests.fetchNetflixOriginals}
        isOriginal={true}
      />
      <Row title="Top Rated" fetch={requests.fetchTopRated} />
      <Row title="Action" fetch={requests.fetchActionMovies} />
      <Row title="Comedy" fetch={requests.fetchComedyMovies} />
      <Row title="Horror" fetch={requests.fetchHorrorMovies} />
      <Row title="Documentaries" fetch={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
