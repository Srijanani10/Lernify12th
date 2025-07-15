// types.ts
export type FormulaItem = {
  formula: string;
  story: string;
};

export type SubjectData = {
  topics: {
    [topicName: string]: FormulaItem[];
  };
};

export type FormulasData = {
  [subjectName: string]: SubjectData;
};
