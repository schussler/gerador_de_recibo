function adicionarProduto() {
  // Recupera os valores dos inputs
  var quantidade = parseFloat(document.getElementById("inputQuantidade").value);
  var produto = document.getElementById("inputProduto").value;
  var valorUnitario = parseFloat(
    document.getElementById("inputValorUnitario").value
  );

  // Validação: Garante que QTD e UNT sejam números
  if (
    isNaN(quantidade) ||
    quantidade <= 0 ||
    isNaN(valorUnitario) ||
    valorUnitario < 0
  ) {
    alert("QTD  devem ser números válidos e maiores que 0.");
    return;
  }

  // Calcula o total multiplicando a quantidade pelo valor unitário
  var total = quantidade * valorUnitario;

  // Seleciona a tabela e o corpo da tabela
  var tabela = document.querySelector(".tbp tbody");
  if (!tabela) {
    console.error("Tabela não encontrada.");
    return;
  }

  // Cria uma nova linha na tabela
  var novaLinha = tabela.insertRow();

  // Adiciona células à nova linha
  novaLinha.insertCell(0).textContent = quantidade;
  novaLinha.insertCell(1).textContent = produto;
  novaLinha.insertCell(2).textContent = "R$ " + valorUnitario.toFixed(2);
  novaLinha.insertCell(3).textContent = "R$ " + total.toFixed(2);

  // Limpa os inputs após adicionar o produto
  document.getElementById("inputQuantidade").value = "";
  document.getElementById("inputProduto").value = "";
  document.getElementById("inputValorUnitario").value = "";

  // Atualiza a prévia
  atualizarPrevia();
}

function gerarRecibo() {
  // Recupera os valores dos inputs
  var tutor = document.getElementById("inputCliente").value.trim();
  var pet = document.getElementById("inputPet").value.trim();
  var endereco = document.getElementById("inputEndereco").value.trim();

  // Validação: Garante que os campos necessários foram preenchidos
  if (!tutor || !pet) {
    alert("Preencha todos os campos do cliente.");
    return;
  }

  // Atualiza os dados do cliente no cupom
  document.getElementById("dadosCliente").innerHTML =
    "<p>TUTOR: " +
    tutor +
    "</p>" +
    "<p>PET: " +
    pet +
    "</p>" +
    "<p>ENDEREÇO: " +
    endereco +
    "</p>";
  document.getElementById("dadosCliente").classList.remove("oculto");

  // Adiciona a data e hora formatadas à div com a classe "data"
  var dataHora = new Date();
  var dataHoraFormatada =
    dataHora.toLocaleDateString("pt-BR") +
    " - " +
    dataHora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  document.querySelector(".data").innerHTML = dataHoraFormatada;
  // Copia os dados da tabela original para a tabela de imagem
  var tabelaOriginal = document.querySelector(".tbp tbody");
  var tabelaImagem = document.querySelector("#tabelaProdutosImg tbody");
  tabelaImagem.innerHTML = tabelaOriginal.innerHTML;
  // Soma todos os totais dos itens da tabela
  var totalItens = 0;
  var linhas = tabelaImagem.getElementsByTagName("tr");
  for (var i = 0; i < linhas.length; i++) {
    var totalCelula = linhas[i].getElementsByTagName("td")[3].textContent;
    totalItens += parseFloat(totalCelula.replace("R$ ", "").replace(",", "."));
  }
  var totalFinal = totalItens;

  // Calcula o total final com acréscimo de 6%
  var totalCartao = totalFinal * 1.06;

  // Atualiza o total final no cupom
  document.getElementById("totalFinal").innerHTML =
    "Total: R$ " + totalFinal.toFixed(2).replace(".", ",");
  document.getElementById("totalFinal").classList.remove("oculto");

  // Atualiza o total final com acréscimo no cupom
  document.getElementById("totalCartao").innerHTML =
    "Cartão: R$ " + totalCartao.toFixed(2).replace(".", ",");
  document.getElementById("totalCartao").classList.remove("oculto");

  // Limpa os inputs após gerar o recibo
  document.getElementById("inputCliente").value = "";
  document.getElementById("inputPet").value = "";
  document.getElementById("inputEndereco").value = "";
  document.getElementById("inputQuantidade").value = "";
  document.getElementById("inputProduto").value = "";
  document.getElementById("inputValorUnitario").value = "";

  // Atualiza a prévia
  atualizarPrevia();

  // Oculta a div do formulário e exibe a div do cupom
  document.getElementById("divFormulario").style.display = "none";
  document.getElementById("cupom").style.display = "block";

  // Exibe a janela de impressão
  window.print();

  location.reload();
}

function atualizarPrevia() {
  var tabela = document.querySelector(".tbp tbody");
  var linhas = tabela.getElementsByTagName("tr");
  var previa = document.querySelector(".previa");

  // Constrói o HTML das linhas da tabela
  var htmlLinhas = "";
  for (var i = 0; i < linhas.length; i++) {
    var celulas = linhas[i].getElementsByTagName("td");
    htmlLinhas += "<p>";
    for (var j = 0; j < celulas.length; j++) {
      htmlLinhas += celulas[j].textContent + " - ";
    }
    htmlLinhas += "</p>";
  }

  // Atualiza a prévia com as linhas da tabela
  previa.innerHTML = htmlLinhas;
}

function gerarImg() {
  // Recupera os valores dos inputs
  var tutor = document.getElementById("inputCliente").value.trim();
  var pet = document.getElementById("inputPet").value.trim();
  var endereco = document.getElementById("inputEndereco").value.trim();

  // Validação: Garante que os campos necessários foram preenchidos
  if (!tutor || !pet) {
    alert("Preencha todos os campos do cliente.");
    return;
  }

  // Atualiza os dados do cliente no cupom
  document.getElementById("dadosClienteImg").innerHTML =
    "<p>TUTOR: " +
    tutor +
    "</p>" +
    "<p>PET: " +
    pet +
    "</p>" +
    "<p>ENDEREÇO: " +
    endereco +
    "</p>";

  // Adiciona a data e hora formatadas à div com a classe "dataImg"
  var dataHora = new Date();
  var dataHoraFormatada =
    dataHora.toLocaleDateString("pt-BR") +
    " - " +
    dataHora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  document.querySelector(".dataImg").innerHTML = dataHoraFormatada;

  // Copia os dados da tabela original para a tabela de imagem
  var tabelaOriginal = document.querySelector(".tbp tbody");
  var tabelaImagem = document.querySelector("#tabelaProdutosImg tbody");
  tabelaImagem.innerHTML = tabelaOriginal.innerHTML;
  // Soma todos os totais dos itens da tabela
  var totalItens = 0;
  var linhas = tabelaImagem.getElementsByTagName("tr");
  for (var i = 0; i < linhas.length; i++) {
    var totalCelula = linhas[i].getElementsByTagName("td")[3].textContent;
    totalItens += parseFloat(totalCelula.replace("R$ ", "").replace(",", "."));
  }
  var totalFinal = totalItens;

  // Calcula o total final com acréscimo de 6%
  var totalCartao = totalFinal * 1.06;

  // Atualiza o total final no recibo
  document.getElementById("totalFinalImg").innerHTML =
    "Total: R$ " + totalFinal.toFixed(2).replace(".", ",");

  // Atualiza o total final com acréscimo no recibo
  document.getElementById("totalCartaoImg").innerHTML =
    "Cartão: R$ " + totalCartao.toFixed(2).replace(".", ",");

  // Limpa os inputs após gerar o recibo
  document.getElementById("inputCliente").value = "";
  document.getElementById("inputPet").value = "";
  document.getElementById("inputEndereco").value = "";
  document.getElementById("inputQuantidade").value = "";
  document.getElementById("inputProduto").value = "";
  document.getElementById("inputValorUnitario").value = "";

  // Atualiza a prévia, se houver essa função definida
  atualizarPrevia();

  // Seleciona o elemento HTML que contém o recibo
  const reciboElement = document.getElementById("reciboImg");
  if (!reciboElement) {
    console.error("Elemento com ID 'reciboImg' não encontrado.");
    return;
  }

  reciboElement.style.display = "block";

  // Usa a biblioteca html2canvas para capturar o recibo como uma imagem
  html2canvas(reciboElement, {
    scale: 4, // Aumenta a escala para melhorar a qualidade da imagem
    useCORS: true, // Permite o uso de recursos de outras origens, como fontes externas
  })
    .then((canvas) => {
      // Converte o canvas para um Blob (representação binária dos dados)
      canvas.toBlob(function (blob) {
        // Cria um item de área de transferência contendo a imagem
        const item = new ClipboardItem({ "image/png": blob });
        // Copia a imagem para a área de transferência
        navigator.clipboard.write([item]).then(
          function () {
            alert("Recibo copiado para a área de transferência!");
            location.reload();
          },
          function (err) {
            // Trata qualquer erro que possa ocorrer
            console.error("Erro ao copiar para a área de transferência: ", err);
            location.reload();
          }
        );
      });
    })
    .catch((err) => {
      // Trata qualquer erro que possa ocorrer durante a geração da imagem
      console.error("Erro ao gerar a imagem: ", err);
    });
}
