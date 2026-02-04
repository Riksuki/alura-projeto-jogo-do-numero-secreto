//Parâmetros do NÚMERO SECRETO
let listaNumSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//Gerar número aleatório
function gerarNumeroAleatorio() {
    let numeroSorteado = parseInt(Math.random() * 1000 + 1);
    let qantidadeDeElementosNaLista = listaNumSorteados.length;
    if (qantidadeDeElementosNaLista == 3) {
        listaNumSorteados.shift();
    }

    if (listaNumSorteados.includes(numeroSorteado)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumSorteados.push(numeroSorteado);
        return numeroSorteado;
    }
}

//Exibição e elementos interativos da tela
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.3;
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = " ";
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do NÚMERO SECRETO!");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 1000.");
}

exibirMensagemInicial();

//Verificação de chutes e mensagens de vitória e derrota
function verificarChute() {
    let chute = document.querySelector("input").value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela("h1", "Você venceu.");
        if (tentativas > 1) {
            let mensagemVitoria2 = `Você revelou o número por trás do enigma (${numeroSecreto}) em ${tentativas} tentativas e saiu vitoriose. Parabéns.`;
            exibirTextoNaTela("p", mensagemVitoria2);
        } else {
            let mensagemVitoria1 = `Você é um gênio dos enigmas! Você acertou o número (${numeroSecreto}) em apenas ${tentativas} tentativa e saiu vitorioso. Muito impressionante`;
            exibirTextoNaTela("p", mensagemVitoria1);
        }
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        let  palavraMaiorMenor = chute < numeroSecreto ? "menor" : "maior";
        if (chute != numeroSecreto) {
            exibirTextoNaTela("h1", "Você errou.");
            exibirTextoNaTela("p", `Seu chute foi ${palavraMaiorMenor} do que o número secreto.`);
        }
        tentativas++;
        limparCampo();
    }
} 

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}