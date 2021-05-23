import { Question } from './question';

export type Quiz = {
  _id?: string;
  title: string;
  isEditable?: boolean;
  questions: Question[];
};
