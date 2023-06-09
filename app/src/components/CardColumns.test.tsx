import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import CardColumns from './CardColumns';

describe('CardColumns', () => {
  const mock: AxiosMockAdapter = new AxiosMockAdapter(axios);

  beforeEach(() => {
    mock.onGet('http://localhost:3000/cards').reply(200, [
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

  it('allows user to change card status', async () => {
    render(<CardColumns />);

    await waitFor(() => expect(screen.getByText('Bob')).toBeInTheDocument());

    const statusButton = screen.getByTestId('status-button-0');

    fireEvent.click(statusButton);

    await waitFor(() => {
      const doneColumn = screen.getByTestId('column-done');
      expect(doneColumn).toContainElement(screen.getByText('Bob'));
    });
  });

  it('filters cards based on the search term', async () => {
    render(<CardColumns />);

    const searchInput = screen.getByLabelText(
      'Search by patient name or arrhythmia'
    );

    fireEvent.change(searchInput, { target: { value: 'AFib' } });

    await waitFor(() => {
      expect(screen.getByText('Bob')).toBeInTheDocument();
      expect(screen.queryByText('Bill')).not.toBeInTheDocument();
    });
  });
});
