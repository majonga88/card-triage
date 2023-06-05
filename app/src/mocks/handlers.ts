import { rest, RestContext, RestRequest, ResponseComposition } from 'msw';

interface Card {
  arrhythmias: string[];
  created_date: string;
  id: number;
  patient_name: string;
  status: string;
}

const cards: Card[] = [
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

export const handlers = [
  rest.get(
    'http://localhost:3000/cards',
    (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
      return res(ctx.status(200), ctx.json(cards));
    }
  ),
];
