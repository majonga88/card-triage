import { Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react';

import { CardData } from '../domain/CardData';

interface CardItemProps {
  card: CardData;
  handleStatusChange: (id: number, status: string) => void;
}

const CardItem: React.FC<CardItemProps> = ({ card, handleStatusChange }) => {
  return (
    <Card key={card.id} sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {card.patient_name}
        </Typography>
        <Typography variant="body2">{card.arrhythmias.join(', ')}</Typography>
        <Typography variant="body2">Status: {card.status}</Typography>
        {card.status !== 'DONE' && (
          <Button
            data-testid={`status-button-${card.id}`}
            variant="contained"
            onClick={() => handleStatusChange(card.id, 'DONE')}
          >
            Mark as Done
          </Button>
        )}
        {card.status === 'DONE' && (
          <Button
            data-testid={`status-button-${card.id}`}
            variant="contained"
            onClick={() => handleStatusChange(card.id, 'REJECTED')}
          >
            Mark as Rejected
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CardItem;
