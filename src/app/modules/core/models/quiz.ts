import { QuestionSet } from './question-set';

export type Quiz = {
  _id?: string;
  title: string;
  sets: QuestionSet[];
};
