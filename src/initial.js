import { formatDate } from "./utils/date";

function addDays(date, days) {
  const newDate = new Date(date.getTime());
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

const today = new Date();

const cards = [
  {
    id: 1,
    title: "Criar tópico do SNS",
    description:
      "Devemos criar um tópico no SNS com o objetivo de alimentar nossas aplicações.",
    status: "backlog",
    priority: 3,
    blocked: false,
    userId: 1,
    tasks: [],
    releaseDate: addDays(today, 5),
    createdAt: formatDate(today),
    backlogDate: today,
    doingDate: null,
    qaDate: null,
    finishDate: null,
    backlogDays: 1,
    doingDays: 0,
    qaDays: 0,
    finishDays: 0,
  },

  {
    id: 3,
    title: "Criar página de blog",
    description:
      "Devemos criar uma página de blog para permitir a criação de postagens.",
    status: "doing",
    priority: 3,
    blocked: false,
    userId: 2,
    tasks: [],
    releaseDate: addDays(today, 2),
    createdAt: formatDate(addDays(today, -4)),
    backlogDate: addDays(today, -4),
    doingDate: today,
    qaDate: null,
    finishDate: null,
    backlogDays: 1,
    doingDays: 4,
    qaDays: 0,
    finishDays: 0,
  },

  {
    id: 2,
    title: "Criar tela de login",
    description:
      "Devemos criar uma tela de login para realizar a autenticação dos nossos usuários.",
    status: "doing",
    priority: 3,
    blocked: false,
    userId: 2,
    tasks: [],
    releaseDate: addDays(today, 2),
    createdAt: formatDate(addDays(today, -2)),
    backlogDate: addDays(today, -2),
    doingDate: today,
    qaDate: null,
    finishDate: null,
    backlogDays: 1,
    doingDays: 3,
    qaDays: 0,
    finishDays: 0,
  },

  {
    id: 5,
    title: "Criar infra do EC2",
    description: "Devemos criar a infra do EC2 utilizando Terraform.",
    status: "finished",
    priority: 1,
    blocked: false,
    userId: 3,
    tasks: [],
    releaseDate: today,
    createdAt: formatDate(addDays(today, -6)),
    backlogDate: addDays(today, -6),
    doingDate: addDays(today, -3),
    qaDate: addDays(today, -1),
    finishDate: today,
    backlogDays: 3,
    doingDays: 2,
    qaDays: 2,
    finishDays: 1,
  },
  {
    id: 4,
    title: "Validar protótipo de recuperação de senha",
    description:
      "Devemos validar o prótotipo da tela de recuperação de senha criada.",
    status: "qa",
    priority: 2,
    blocked: true,
    userId: 1,
    tasks: [],
    releaseDate: addDays(today, 1),
    createdAt: formatDate(addDays(today, -3)),
    backlogDate: addDays(today, -3),
    doingDate: addDays(today, -2),
    qaDate: addDays(today, -1),
    finishDate: null,
    backlogDays: 1,
    doingDays: 1,
    qaDays: 2,
    finishDays: 0,
  },
  {
    id: 6,
    title: "Criar action do github para deploy",
    description: "Devemos criar a action do github para deploy da aplicação.",
    status: "finished",
    priority: 1,
    blocked: false,
    userId: 2,
    tasks: [],
    releaseDate: today,
    createdAt: formatDate(addDays(today, -6)),
    backlogDate: addDays(today, -6),
    doingDate: new Date(today.getTime()).setDate(today.getDate() - 5),
    qaDate: addDays(today, -3),
    finishDate: addDays(today, -1),
    backlogDays: 1,
    doingDays: 2,
    qaDays: 2,
    finishDays: 1,
  },
];

const tasks = [
  {
    id: 1,
    description: "Criar tópico",
    done: false,
    cardId: 1,
  },

  {
    id: 3,
    description: "Criar interface da tela",
    done: true,
    cardId: 2,
  },
  {
    id: 4,
    description: "Conectar com o serviço de autenticação",
    done: false,
    cardId: 2,
  },
  {
    id: 5,
    description: "Criar protótipo da página",
    done: true,
    cardId: 3,
  },
  {
    id: 2,
    description: "Conectar aplicação com o tópico",
    done: false,
    cardId: 1,
  },
  {
    id: 6,
    description: "Criar página na aplicação",
    done: false,
    cardId: 3,
  },

  {
    id: 8,
    description: "Validar métricas do protótipo",
    done: true,
    cardId: 4,
  },
  {
    id: 9,
    description: "Desenvolver documento de retorno pro time de UX/UI",
    done: true,
    cardId: 4,
  },
  {
    id: 10,
    description: "Criar terraform para a infra",
    done: true,
    cardId: 5,
  },
  {
    id: 11,
    description: "Conectar terraform com o Atlantis",
    done: true,
    cardId: 5,
  },
  {
    id: 7,
    description: "Conectar página com o servidor",
    done: false,
    cardId: 3,
  },
  {
    id: 12,
    description: "Criar action",
    done: true,
    cardId: 6,
  },
  {
    id: 13,
    description: "Rodar workflow da action",
    done: true,
    cardId: 6,
  },
];

export { cards, tasks };
