const wipDescription = `
  <p>Essa métrica é a contagem de WIP, o qual indica quantos cartões estão em progresso no momento.</p>
`;

const throughputDescription = `
  <p>Essa métrica é o Throughput, o qual indica quantos cartões entregamos em uma contagem determinada de tempo.</p>
`;

const leadTimeDescription = `
  <p>Essa métrica é o Lead Time, o qual indica e analisa o tempo que um cartão ficou em cada coluna do nosso board.</p>
`;

const wipTableDescription = `
<p>Essa métrica é a contagem de WIP, o qual indica quantos cartões estão em progresso no momento.</p>
<p>Aqui conseguimos determinar a WIP baseado em um histograma, que leva em consideração um período determinado de tempo.</p>
`;

const backlogDescription = `
<p>Aqui você pode criar novos cartões para poder andar com as suas tarefas! Para criar um cartão basta unicamente clicar no botão "Novo Cartão" e preencher com as informações necessárias.</p>
<p>Para um cartão poder sair da coluna de Backlog é necessário que as informações principais dele estejam preenchidas.</p>
`;

const cardDescription = `
<p>Este é um cartão, nele você pode encontrar todas as informações necessárias para prosseguir com seu trabalho.</p>
`;

const cardPageDescription = `
<p>Essa é a tela de detalhamento de um cartão, onde é possível encontrar todas as informações referentes ao card, dentre elas podemos ver:</p>
<ul>
  <li>Título.</li>
  <li>Descrição.</li>
  <li>Data de criação.</li>
  <li>Quem é o responsável pelo cartão.</li>
</ul>
`;

const tasksDescription = `
  <p>Também é possível ver as tasks referentes a um cartão, as quais são tarefas que devem ser completadas para que um card seja dito como completo.</p>
  <p>Para criar uma task basta clicar no botão "Adicionar" e preencher as informações necessárias.</p>
  <p>Você também pode alterar o status de uma task preenchendo a checkbox indicada.</p>
`;

const cardCommandDescription = `
  <p>Aqui é o painel do cartão, onde podemos alterar informações como:</p>
  <ul>
    <li>Quem é o responsável pelo cartão.</li>
    <li>Prioridade.</li>
    <li>Data de finalização.</li>
    <li>Se está bloqueado.</li>
  </ul>
`;


export {
  wipDescription,
  throughputDescription,
  leadTimeDescription,
  wipTableDescription,
  backlogDescription,
  cardDescription,
  cardPageDescription,
  tasksDescription,
  cardCommandDescription
}