import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { server } from '../mocks/server';

import { getCards } from './CardService';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('CardService', () => {
  let mock: AxiosMockAdapter;

  beforeEach(() => {
    mock = new AxiosMockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('fetches card data successfully', async () => {
    const mockData = [
      {
        arrhythmias: ['AFib', 'AV Block', 'Pause', 'PSVC', 'PVC'],
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
    ];

    mock.onGet('http://localhost:3000/cards').reply(200, mockData);

    const data = await getCards();

    expect(data).toEqual(mockData);
  });
});
