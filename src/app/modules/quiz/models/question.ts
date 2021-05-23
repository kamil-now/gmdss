import { Answer } from './answer';

export type Question = {
  _id?: string,
  text: string,
  answers: Answer[]
};
