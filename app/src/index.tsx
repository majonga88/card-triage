import React from 'react';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import CardColumns from './components/CardColumns';
import { Card, getCards } from './services/CardService';

const App: React.FC = () => {
  const [_cards, setCards] = useState<Card[]>([]);

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

  return <CardColumns></CardColumns>;
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
