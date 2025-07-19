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
      "⚡ ELECTRIC CHARGES AND FIELDS ⚡": [
        {
          formula: 'F = \\frac{1}{4\\pi\\varepsilon_0} \\cdot \\frac{q_1 q_2}{r^2}',
          story: '🔋🔋 → 📏📏 → 💥\n🧲 Coulomb’s Law'
        },
        {
          formula: '\\varepsilon_r = \\frac{\\varepsilon}{\\varepsilon_0}',
          story: '📦⚡ Relative Permittivity (Dielectric Constant)'
        },
        {
          formula: 'E = \\frac{1}{4\\pi\\varepsilon_0} \\cdot \\frac{q}{r^2}',
          story: '🌐 Electric field intensity at a point distant r from a point charge q'
        },
        {
          formula: 'p = q \\times 2a',
          story: '🧲 Electric dipole moment from two opposite charges.'
        },
        {
          formula: 'E = \\frac{1}{4\\pi\\varepsilon_0} \\cdot \\frac{2p}{(r^2 - a^2)^2}',
          story: '📍 Electric Field on the axial line of dipole.\n (i)At the point r from the centre of the electric dipole.'
        },
        {
          formula: 'E = \\frac{1}{4\\pi\\varepsilon_0} \\cdot \\frac{2p}{r^3}',
          story: '🌌 Electric Field on the axial line of dipole.\n (ii)At very large distance i.e., (r >> a)'
        },
        {
          formula: 'E = \\frac{1}{4\\pi\\varepsilon_0} \\cdot \\frac{p}{(r^2 + a^2)^{3/2}}',
          story: '🌀 Field on the equatorial line of dipole.\n(i)At the point at a distance r from the centre of electric dipole'
        },
        {
          formula: 'E = \\frac{1}{4\\pi\\varepsilon_0} \\cdot \\frac{p}{r^3}',
          story: '🌍 Field on the equatorial line of dipole.\n (ii)At very large distance i.e. r > > a'
        },
        {
          formula: 'E = \\frac{1}{4\\pi\\varepsilon_0} \\cdot \\frac{p}{r^3} \\sqrt{1 + 3\\cos^2\\theta}',
          story: '🌟 Electric field intensity at any point due to an electric dipole, where θ is the angle from the dipole axis.'
        },
        {
          formula: 'E = \\frac{1}{4\\pi\\varepsilon_0} \\cdot \\frac{qr}{(r^2 + a^2)^{3/2}}',
          story: '💡 Electric field intensity due to a charged ring\n (i)At a point on its axis at distance r from its centre'
        }, 
        {
          formula: 'E = \\frac{1}{4\\pi\\varepsilon_0} \\cdot \\frac{q}{r^2}',
          story: '💡 Electric field intensity due to a charged ring\n (ii)At very large distance i.e. r >> a'
        },
        {
          formula: '\\tau = pE \\sin\\theta',
          story: '🌌 Torque on an electric dipole placed in a uniform electric field'
        },
        {
          formula: 'U = -pE (\\cos\\theta_2 - \\cos\\theta_1)',
          story: '🌠 Potential energy change of an electric dipole in a uniform electric field between angles θ₁ and θ₂'
        },
        {
          formula: '\\Phi_E = \\oint \\vec{E} \\cdot d\\vec{A}',
          story: '🌌 Electric flux'
        },
        {
          formula: '\\Phi_E = \\frac{q_{\\text{encl}}}{\\varepsilon_0}',
          story: '🌌 Gauss’s law: The total electric flux through a closed surface is equal to the enclosed charge divided by the permittivity of free space.'
        },
        {
          formula: 'E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}',
          story: '🌌 Electric field due to thin infinitely long straight wire of uniform linear charge density λ'
        },
        {
          formula: 'E = \\frac{1}{4\\pi\\varepsilon_0} \\cdot \\frac{q}{r^2}',
          story: '🛡️ Electric field due to a uniformly charged spherical shell at a point outside the shell (r > R)'
        },
      ],
      Dynamics: [
        { formula: 'F = ma', story: '💪 Push a box to accelerate it.' },
      ],
    },
    quiz: [],
  },

  Chemistry: {
    topics: {
      MoleConcept: [
        { formula: 'n = \\frac{m}{M}', story: 'How many moles of substance.' },
      ],
    },
    quiz: [],
  },

  Maths: {
    topics: {
      Algebra: [
        { formula: '(a + b)^2 = a^2 + 2ab + b^2', story: 'Expanding binomials like (2 + 3)^2.' },
        { formula: 'a^2 - b^2 = (a - b)(a + b)', story: 'Difference of squares example.' },
      ],
      Geometry: [
        { formula: '\\text{Area of circle} = \\pi r^2', story: 'Pizza slice problem 🍕.' },
        { formula: '\\text{Perimeter of rectangle} = 2(l + b)', story: 'Measuring frame of a photo.' },
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
        { formula: '\\text{Mitochondria} = \\text{Powerhouse of the cell}', story: 'It produces energy ⚡.' },
        { formula: '\\text{Ribosomes} = \\text{Protein factories}', story: 'They make proteins for the cell.' },
        { formula: '\\text{Nucleus} = \\text{Control center}', story: 'It controls all cell activities.' },
      ],
      HumanBody: [
        { formula: '\\text{Heart} = \\text{Pumps blood}', story: 'It beats to circulate blood.' },
        { formula: '\\text{Lungs} = \\text{Help in breathing}', story: 'They bring oxygen in and push carbon dioxide out.' },
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
