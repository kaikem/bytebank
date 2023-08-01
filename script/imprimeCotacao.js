const lista = document.querySelectorAll('[data-lista]');

function selecionaCotacao(nome, valor){
    lista.forEach((listaEscolhida) => {
        if(listaEscolhida.id == nome){
            imprimeCotacao(listaEscolhida, nome, valor);
        }
    });
};

function imprimeCotacao(lista, nome, valor){
    lista.innerHTML = '';
    const plurais = {
        "dolar": "dolares",
        "iene": "ienes",
        "rublo": "rublos",
    }

    for(let i=1; i<=1000; i*=10){
        const listaItem = document.createElement('li');
        listaItem.innerHTML = `${i} ${i==1?nome: plurais[nome]}: R$${(valor*i).toFixed(2)}`;
        lista.appendChild(listaItem);
    };
};

export default selecionaCotacao;