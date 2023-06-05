import { Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';

import { getCards } from '../services/CardService';

interface CardData {
  arrhythmias: string[];
  created_date: string;
  id: number;
  patient_name: string;
  status: string;
}

const CardColumns = () => {
  const [cards, setCards] = useState<CardData[]>([]);

  useEffect(() => {
    const loadCards = async () => {
      const response = await getCards();
      setCards(response);
    };

    loadCards();
  }, []);

  const pendingCards = cards.filter((card) => card.status === 'PENDING');
  const rejectedCards = cards.filter((card) => card.status === 'REJECTED');
  const doneCards = cards.filter((card) => card.status === 'DONE');

  const CardItem = ({ card }: { card: CardData }) => (
    <Card>
      <CardContent>
        <Typography variant="h6">{card.patient_name}</Typography>
        <Typography variant="body2">
          Arrhythmias: {card.arrhythmias.join(', ')}
        </Typography>
        <Typography variant="body2">Date: {card.created_date}</Typography>
      </CardContent>
    </Card>
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Typography variant="h5">Pending</Typography>
        {pendingCards.map((card) => (
          <CardItem key={card.id} card={card} />
        ))}
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h5">Rejected</Typography>
        {rejectedCards.map((card) => (
          <CardItem key={card.id} card={card} />
        ))}
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h5">Done</Typography>
        {doneCards.map((card) => (
          <CardItem key={card.id} card={card} />
        ))}
      </Grid>
    </Grid>
  );
};

export default CardColumns;
