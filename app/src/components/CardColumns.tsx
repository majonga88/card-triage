import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';

import { CardData } from '../domain/CardData';
import { getCards } from '../services/CardService';

import CardItem from './CardItem';
import SearchBar from './SearchBar';

const CardColumns = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadCards = async () => {
      const response = await getCards();
      setCards(response);
    };

    loadCards();
  }, []);

  const handleStatusChange = (id: number, newStatus: string) => {
    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, status: newStatus } : card
      )
    );
  };

  const filteredCards = (status: string) => {
    return cards.filter(
      (card) =>
        card.status === status &&
        (card.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.arrhythmias.some((arrhythmia) =>
            arrhythmia.toLowerCase().includes(searchTerm.toLowerCase())
          ))
    );
  };

  return (
    <>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Grid container spacing={2}>
        <Grid item xs={4} data-testid="column-pending">
          <Typography variant="h5">Pending</Typography>
          {filteredCards('PENDING').map((card) => (
            <CardItem
              key={card.id}
              card={card}
              handleStatusChange={handleStatusChange}
            />
          ))}
        </Grid>
        <Grid item xs={4} data-testid="column-rejected">
          <Typography variant="h5">Rejected</Typography>
          {filteredCards('REJECTED').map((card) => (
            <CardItem
              key={card.id}
              card={card}
              handleStatusChange={handleStatusChange}
            />
          ))}
        </Grid>
        <Grid item xs={4} data-testid="column-done">
          <Typography variant="h5">Done</Typography>
          {filteredCards('DONE').map((card) => (
            <CardItem
              key={card.id}
              card={card}
              handleStatusChange={handleStatusChange}
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default CardColumns;
