type FormulaItem = {
  formula: string;
  story: string;
};

type QuizItem = {
  question: string;
  options: string[];
  correct: number;
};

type SubjectData = {
  topics: {
    [topicName: string]: FormulaItem[];
  };
  quiz: QuizItem[];
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
    quiz: [],
  },

  Chemistry: {
    topics: {
      MoleConcept: [
        { formula: 'n = m/M', story: 'How many moles of substance.' },
      ],
    },
    quiz: [],
  },

  Maths: {
    topics: {
      Algebra: [
        { formula: '(a + b)² = a² + 2ab + b²', story: 'Expanding binomials like (2 + 3)².' },
        { formula: 'a² - b² = (a - b)(a + b)', story: 'Difference of squares example.' },
      ],
      Geometry: [
        { formula: 'Area of circle = πr²', story: 'Pizza slice problem 🍕.' },
        { formula: 'Perimeter of rectangle = 2(l + b)', story: 'Measuring frame of a photo.' },
      ],
    },
    quiz: [
      {
        question: 'What is the expanded form of (a + b)²?',
        options: [
          'a² + b²',
          'a² + 2ab + b²',
          '(a - b)(a + b)',
          'a² - b²',
        ],
        correct: 1,
      },
      {
        question: 'What is the area of a circle with radius 3?',
        options: ['3π', '6π', '9π', '12π'],
        correct: 2,
      },
      {
        question: 'If length = 5 and breadth = 3, what is the perimeter?',
        options: ['15', '30', '16', '20'],
        correct: 3,
      },
      {
        question: 'What is a² - b² equal to?',
        options: [
          '(a + b)(a - b)',
          '(a - b)²',
          'a² + b²',
          'None of these',
        ],
        correct: 0,
      },
    ],
  },

  Biology: {
    topics: {
      CellBiology: [
        { formula: 'Mitochondria = Powerhouse of the cell', story: 'It produces energy ⚡.' },
        { formula: 'Ribosomes = Protein factories', story: 'They make proteins for the cell.' },
        { formula: 'Nucleus = Control center', story: 'It controls all cell activities.' },
      ],
      HumanBody: [
        { formula: 'Heart = Pumps blood', story: 'It beats to circulate blood.' },
        { formula: 'Lungs = Help in breathing', story: 'They bring oxygen in and push carbon dioxide out.' },
      ],
    },
    quiz: [
      {
        question: 'What is known as the powerhouse of the cell?',
        options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi body'],
        correct: 2,
      },
      {
        question: 'Which organelle makes proteins?',
        options: ['Mitochondria', 'Ribosome', 'Nucleus', 'Chloroplast'],
        correct: 1,
      },
      {
        question: 'What controls all activities of the cell?',
        options: ['Ribosome', 'Nucleus', 'Cytoplasm', 'Mitochondria'],
        correct: 1,
      },
      {
        question: 'Which organ pumps blood?',
        options: ['Heart', 'Liver', 'Brain', 'Lungs'],
        correct: 0,
      },
      {
        question: 'What is the main function of lungs?',
        options: ['Pump blood', 'Make proteins', 'Help in breathing', 'Store food'],
        correct: 2,
      },
    ],
  },
};

export default formulas;
