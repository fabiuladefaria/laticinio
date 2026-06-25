const representantes = [
    {
        estado: "BA",
        cidade: "Salvador",
        nome: "Pasta em Casa",
        endereco: "Rua Prof. Almerinda Dutra, 67 - Rio Vermelho",
        telefone: "(71) 3334-7232"
    },
    {
        estado: "CE",
        cidade: "Fortaleza",
        nome: "Zé Tropeiro",
        endereco: "Rua Padre Valdevino, 1801 - loja 03 - Aldeota",
        telefone: "(85) 3109-6124"
    },
    {
        estado: "DF",
        cidade: "Brasília",
        nome: "Baiúca",
        endereco: "SCLN 314 - bloco B - loja 5 - Asa Norte",
        telefone: "(61) 3036-9294 | (61) 99559-7870"
    },
    {
        estado: "GO",
        cidade: "Goianésia",
        nome: "Empório O Cravo e a Rosa",
        endereco: "Avenida Brasil Oeste, 1000 - Jardim Por do Sol",
        telefone: "(62) 98466-1665"
    },
    {
        estado: "MG",
        cidade: "Alfenas",
        nome: "Fábrica Laticínios Alfenense Majestic",
        endereco: "Rua Treze de Maio, 840 - Centro",
        telefone: "(35) 3291-1079 | (35) 3291-7764"
    },
    {
        estado: "MG",
        cidade: "Andradas",
        nome: "Rei do Queijo",
        endereco: "Avenida Ricarti Teixeira, 228",
        telefone: "(35) 3731-1809"
    },
    {
        estado: "MG",
        cidade: "Andradas",
        nome: "Empório do Queijo Canastra",
        endereco: "Avenida Ricarti Teixeira, 360 - Jardim Teixeira",
        telefone: "(35) 99960-5907"
    },
    {
        estado: "MG",
        cidade: "Belo Horizonte",
        nome: "Paladino",
        endereco: "Avenida Gildo Macedo Lacerda, 1300",
        telefone: "(31) 3447-6604"
    },
    {
        estado: "SP",
        cidade: "Campinas",
        nome: "Carlos Souza",
        endereco: "Rua Central, 80",
        telefone: "(19) 97777-3333"
    }
];

const estados = {
    BA: "Bahia",
    CE: "Ceará",
    DF: "Distrito Federal",
    GO: "Goiás",
    MG: "Minas Gerais",
    MT: "Mato Grosso",
    PR: "Paraná",
    RJ: "Rio de Janeiro",
    RS: "Rio Grande do Sul",
    SC: "Santa Catarina",
    SP: "São Paulo"
};

const cidadesPorEstado = {
    BA: ["Salvador"],
    CE: ["Fortaleza"],
    DF: ["Brasília"],
    GO: ["Goianésia"],
    MG: ["Alfenas", "Andradas", "Belo Horizonte", "Carrancas", "Lavras", "Nova Lima", "Passos", "Poços de Caldas", "Pouso Alegre", "São Sebastião", "Tiradentes", "Varginha"],
    MT: ["Tangará da Serra"],
    PR: ["Curitiba"],
    RJ: ["Rio de Janeiro"],
    RS: ["Gramado", "Nova Prata", "Porto Alegre"],
    SC: ["Florianópolis", "Joinville"],
    SP: ["Atibaia", "Brotas", "Campinas", "Indaiatuba", "Limeira", "Praia Grande", "Ribeirão Preto", "Salesópolis", "São Bernardo do Campo", "São Paulo", "Sorocaba", "Valinhos"]
};

function iniciarBuscaRepresentantes() {
    const estadoSelect = document.getElementById("estado");
    const cidadeSelect = document.getElementById("cidade");
    const buscarBotao = document.getElementById("buscarRepresentantes");
    const cards = document.getElementById("cards");
    const resumo = document.getElementById("resumoBusca");

    if (!estadoSelect || !cidadeSelect || !buscarBotao || !cards || !resumo) {
        return;
    }

    Object.entries(estados).forEach(([sigla, nome]) => {
        const option = document.createElement("option");
        option.value = sigla;
        option.textContent = nome;
        estadoSelect.appendChild(option);
    });

    estadoSelect.addEventListener("change", () => {
        const estado = estadoSelect.value;
        cidadeSelect.innerHTML = '<option value="">Selecione a cidade</option>';
        cidadeSelect.disabled = !estado;
        cards.innerHTML = "";
        resumo.textContent = "Escolha uma cidade para consultar os contatos disponíveis.";

        if (!estado) {
            resumo.textContent = "Faça uma busca para ver os contatos disponíveis.";
            return;
        }

        cidadesPorEstado[estado].forEach((cidade) => {
            const option = document.createElement("option");
            option.value = cidade;
            option.textContent = cidade;
            cidadeSelect.appendChild(option);
        });
    });

    buscarBotao.addEventListener("click", () => {
        const estado = estadoSelect.value;
        const cidade = cidadeSelect.value;

        if (!estado || !cidade) {
            cards.innerHTML = '<p class="vazio">Selecione estado e cidade para realizar a busca.</p>';
            resumo.textContent = "Busca incompleta.";
            return;
        }

        const encontrados = representantes.filter((representante) => (
            representante.estado === estado && representante.cidade === cidade
        ));

        if (!encontrados.length) {
            cards.innerHTML = '<p class="vazio">Ainda não há representante cadastrado para esta cidade. Fale com a Majestic pelo WhatsApp para atendimento direto.</p>';
            resumo.textContent = `${cidade}, ${estado}: nenhum cadastro encontrado.`;
            return;
        }

        cards.innerHTML = encontrados.map((representante) => `
            <article class="card">
                <h3>${representante.nome}</h3>
                <p>${representante.endereco}</p>
                <p class="fone">${representante.telefone}</p>
            </article>
        `).join("");

        const plural = encontrados.length === 1 ? "ponto encontrado" : "pontos encontrados";
        resumo.textContent = `${cidade}, ${estado}: ${encontrados.length} ${plural}.`;
    });
}

function iniciarFormularioContato() {
    const form = document.getElementById("formContato");
    const mensagem = document.getElementById("mensagemForm");

    if (!form || !mensagem) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            mensagem.textContent = "Preencha os campos obrigatórios para enviar.";
            return;
        }

        mensagem.textContent = "Mensagem registrada. Para retorno mais rápido, fale também pelo WhatsApp.";
        form.reset();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    iniciarBuscaRepresentantes();
    iniciarFormularioContato();
});
