import selecionaCotacao from "./imprimeCotacao.js";

function geraHorario(){
    let data = new Date();
    let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    return horario;
};

function adicionarDados(grafico, legenda, dados){
    grafico.data.labels.push(legenda);
    grafico.data.datasets.forEach((dataset) =>{
        dataset.data.push(dados);
    });
    grafico.update();
};

//DÓLARES
const graficoDolar = document.getElementById('graficoDolar');
const graficoParaDolar = new Chart(graficoDolar, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Dólar (USD)',
        data: [],
        borderWidth: 1
      }]
    },
  });


let workerDolar = new Worker('./script/workers/workerDolar.js');
workerDolar.postMessage('usd');

workerDolar.addEventListener('message', event => {
    let tempo = geraHorario();
    let valor = event.data.ask;
    selecionaCotacao("dolar", valor);
    adicionarDados(graficoParaDolar, tempo, valor);
});

//IENES
const graficoIene = document.getElementById('graficoIene');
const graficoParaIene = new Chart(graficoIene, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Iene (JPY)',
        data: [],
        borderWidth: 1
      }]
    },
});

let workerIene = new Worker('./script/workers/workerIene.js');
workerIene.postMessage('iene');

workerIene.addEventListener('message', event => {
  let tempo = geraHorario();
  let valor = event.data.ask;
  selecionaCotacao("iene", valor);
  adicionarDados(graficoParaIene, tempo, valor);
});

//RUBLOS
const graficoRublo = document.getElementById('graficoRublo');
const graficoParaRublo = new Chart(graficoRublo, {
  type : 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Rublo (RUB)',
      data: [],
      borderWidth: 1,
    }]
  },
});


let workerRublo = new Worker('./script/workers/workerRublo.js');
workerRublo.postMessage('rublo');

workerRublo.addEventListener('message', event => {
  let tempo = geraHorario();
  let valor = event.data.ask;
  selecionaCotacao('rublo', valor);
  adicionarDados(graficoParaRublo, tempo, valor);
});