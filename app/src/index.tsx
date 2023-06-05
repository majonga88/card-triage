import React from 'react';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { Card, getCards } from './services/CardService';

const App: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCards();
        setCards(data);
      } catch (error) {
        console.error('Failed to fetch card data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Patients</h1>
      {cards.map((card) => (
        <div key={card.id}>
          <h2>{card.patient_name}</h2>
        </div>
      ))}
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
