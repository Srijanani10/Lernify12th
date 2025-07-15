type FormulaItem = {
  formula: string;
  story: string;
};

type SubjectData = {
  topics: {
    [topicName: string]: FormulaItem[];
  };
};

type FormulasData = {
  [subjectName: string]: SubjectData;
};

const formulas: FormulasData = {
  Physics: {
    topics: {
      Kinematics: [
        { formula: 'v = u + at', story: 'A car speeding up over time.' },
        { formula: 's = ut + ½at²', story: 'Distance when speeding.' },
      ],
      Dynamics: [
        { formula: 'F = ma', story: 'Push a box to accelerate it.' },
      ],
    },
  },
  Chemistry: {
    topics: {
      MoleConcept: [
        { formula: 'n = m/M', story: 'How many moles of substance.' },
      ],
    },
  },
};

export default formulas;
