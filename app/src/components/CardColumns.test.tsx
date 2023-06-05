import { render, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import CardColumns from './CardColumns';

describe('CardColumns', () => {
  let mock: AxiosMockAdapter;

  beforeEach(() => {
    mock = new AxiosMockAdapter(axios)
      .onGet('http://localhost:3000/cards')
      .reply(200, [
        {
          arrhythmias: ['AFib'],
          created_date: '2020-03-10T13:14:59+0000',
          id: 0,
          patient_name: 'Bob',
          status: 'PENDING',
        },
        {
          arrhythmias: ['Pause'],
          created_date: '2020-01-01T00:12:21+0000',
          id: 1,
          patient_name: 'Bill',
          status: 'REJECTED',
        },
        {
          arrhythmias: ['AFib', 'Pause'],
          created_date: '2019-12-31T00:11:14+0000',
          id: 2,
          patient_name: 'Elsa',
          status: 'DONE',
        },
      ]);
  });

  afterEach(() => {
    mock.reset();
  });

  it('renders without crashing', async () => {
    render(<CardColumns />);
    await waitFor(() => expect(screen.getByText('Bob')).toBeInTheDocument());
  });

  it('displays cards in their appropriate columns', async () => {
    render(<CardColumns />);

    await waitFor(() => expect(screen.getByText('Bob')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Bill')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Elsa')).toBeInTheDocument());
  });
});
