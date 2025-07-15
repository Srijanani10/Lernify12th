export type FormulaData = {
  formula: string;
  story: string;
};

export type QuizQuestion = {
  question: string;
  options: string[];
  correct: number;
};

type SubjectData = {
  formulas: FormulaData[];
  quiz: QuizQuestion[];
};

const formulas: { [subject: string]: SubjectData } = {
  Physics: {
    formulas: [
      {
        formula: 'v = u + at',
        story: 'Initial velocity increases with acceleration over time.',
      },
      {
        formula: 'F = ma',
        story: 'Force is mass times acceleration.',
      },
    ],
    quiz: [
      {
        question: 'What does F = ma represent?',
        options: ['Kinetic Energy', 'Newton’s 2nd Law', 'Momentum', 'Gravity'],
        correct: 1,
      },
    ],
  },
  Chemistry: {
    formulas: [
      {
        formula: 'PV = nRT',
        story: 'Ideal gas law equation.',
      },
    ],
    quiz: [
      {
        question: 'What law does PV = nRT represent?',
        options: ['Boyle’s Law', 'Ideal Gas Law', 'Charles’s Law', 'Avogadro’s Law'],
        correct: 1,
      },
    ],
  },
};

export default formulas;
