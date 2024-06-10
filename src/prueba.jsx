import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CatFactsTest = () => {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    axios.get('https://cat-fact.herokuapp.com/facts/random?amount=10')
      .then(response => {
        setResponseData(response.data);
      })
      .catch(error => {
        console.error('Error fetching cat facts:', error);
      });
  }, []);

  return (
    <div>
      <h2>Prueba de la API de Cat Facts</h2>
      {responseData && responseData.map((fact, index) => (
        <div key={index}>
          <p><strong>{fact.type}</strong></p>
          <p>{fact.text}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default CatFactsTest;
