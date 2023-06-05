import axios from 'axios';

export interface Card {
  arrhythmias: string[];
  created_date: string;
  id: number;
  patient_name: string;
  status: string;
}

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000, // 10 seconds timeout
});

export const getCards = async (): Promise<Card[]> => {
  const response = await api.get<Card[]>('/cards');
  return response.data;
};
