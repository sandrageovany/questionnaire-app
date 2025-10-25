let questions = [
    { id: 1, question: "What is 2+2?", options: ["3","4","5"], correctAnswer: "4" },
    { id: 2, question: "React is a ...?", options:["library","database","language"], correctAnswer: "library"}
  ];
  
  export default {
    findAll: async () => questions,
    findById: async (id) => questions.find(q => q.id === id)
  };
  