export default {
  backlog: {
    id: 1,
    name: "Backlog",
    cards: [
      {
        id: "#0003",
        title: "Adding Products Details",
        description:
          "Como Consultor\nQuero poder pesquisar e selecionar os produtos por categoria que desejo para meu cliente\nPara que ele possa entender o planejamento feito e realizar a compra desses produtos selecionados\nContexto essa funcionalidade já existe no EXH e estamos migrando para o Unified Hub com uma nova estrutura de layout.",
        data: "25/07/2022",
        priority: 1,
        blocked: false,
        activities: [
          {
            id: 1,
            name: "[Lógica] Criar query de produtos por categoria",
            fished: false,
          },
        ],
      },
    ],
  },
  finished: {
    id: 1,
    name: "Finalizado",
    cards: [],
  },
  sections: [
    {
      id: 2,
      name: "Desenvolvimento",
      columns: [
        { id: 1, title: "Doing", cards: [] },
        { id: 2, title: "Ready to QA", cards: [] },
      ],
    },
    {
      id: 3,
      name: "QA",
      columns: [
        { id: 1, title: "Doing", cards: [] },
        { id: 2, title: "Ready to PO", cards: [] },
      ],
    },
  ],
};
