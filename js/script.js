document.addEventListener("DOMContentLoaded", function () {
  // alert('Pode demorar até 120 segundos para o servidor iniciar. Após isso, o site funcionará normalmente.');
  const sidebarLinks = document.querySelectorAll(".nav-link");

  // Carrega os dados do "Geral" por padrão
  buscaDadosGrupoDeCaracteristicas("Geral");

  

  buscaDadosGrupoDeCaracteristicas("Geral");

  // Obtém uma referência ao botão de busca
  const searchButton = document.getElementById("btnSearch");

  // Adiciona um ouvinte de evento de clique ao botão de busca
  searchButton.addEventListener("click", function () {
    // Executa a busca quando o botão de busca é clicad
    loadSectionData("Por Cidade");
  });

  // Adicionando a funcionalidade para o botão que altera para Malformação
  const malformacaoButton = document.querySelector(".tipobase");
  const tituloBPN = document.getElementById("titulo-bpn"); // Adicionado

  malformacaoButton.addEventListener("click", function () {
    // Alternar entre 'Baixo Peso' e 'Malformação'
    if (malformacaoButton.textContent.includes("Baixo Peso")) {
      malformacaoButton.textContent = "Base: Malformação";
      tituloBPN.textContent = "Malformação";
      atualizaLegendas("Malformação");
      buscaDadosGrupoDeCaracteristicas("Malformação");
    } else {
      malformacaoButton.textContent = "Base: Baixo Peso";
      tituloBPN.textContent = "Baixo Peso ao Nascer (BPN)";
      atualizaLegendas("Baixo Peso");
      buscaDadosGrupoDeCaracteristicas("Geral");
    }
  });

  function atualizaLegendas(base) {
    // Selecionando todos os elementos que possuem a classe "card-header"
    const legendas = document.querySelectorAll('.card-header h5');

    // Alterando as legendas dos cards "Sem Baixo Peso" e "Com Baixo Peso"
    legendas.forEach((legenda) => {
      if (legenda.textContent.includes('Sem Baixo Peso') || legenda.textContent.includes('Sem Malformação')) {
        legenda.textContent = base === 'Malformação' ? 'Sem Malformação' : 'Sem Baixo Peso';
      } else if (legenda.textContent.includes('Com Baixo Peso') || legenda.textContent.includes('Com Malformação')) {
        legenda.textContent = base === 'Malformação' ? 'Com Malformação' : 'Com Baixo Peso';
      }
    });

    // Atualizando as legendas da tabela de análise dos subgrupos
    const tableHeaders = document.querySelectorAll('.table thead th');
    tableHeaders.forEach((header) => {
      if (header.textContent.includes('Com Baixo Peso') || header.textContent.includes('Com Malformação')) {
        header.textContent = base === 'Malformação' ? 'Com Malformação' : 'Com Baixo Peso';
      } else if (header.textContent.includes('Sem Baixo Peso') || header.textContent.includes('Sem Malformação')) {
        header.textContent = base === 'Malformação' ? 'Sem Malformação' : 'Sem Baixo Peso';
      } else if (header.textContent.includes('Aumento taxa PBN')) {
        header.textContent = base === 'Malformação' ? 'Aumento taxa de Malformação' : 'Aumento taxa PBN';
      }
    });
  }


    function atualizaCabecalhosTabela(base) {
        // Selecionando os cabeçalhos da tabela "Análise dos Subgrupos"
        const cabecalhoTabela = document.querySelectorAll('#subgrupos-body').closest('table').querySelectorAll('th');

        // Alterando os títulos das colunas da tabela "Análise dos Subgrupos"
        cabecalhoTabela.forEach((cabecalho) => {
            if (cabecalho.textContent.includes('Com Baixo Peso') || cabecalho.textContent.includes('Com Malformação')) {
                cabecalho.textContent = base === 'Malformação' ? 'Com Malformação' : 'Com Baixo Peso';
            } else if (cabecalho.textContent.includes('Sem Baixo Peso') || cabecalho.textContent.includes('Sem Malformação')) {
                cabecalho.textContent = base === 'Malformação' ? 'Sem Malformação' : 'Sem Baixo Peso';
            } else if (cabecalho.textContent.includes('Aumento taxa PBN') || cabecalho.textContent.includes('Aumento taxa Malformação')) {
                cabecalho.textContent = base === 'Malformação' ? 'Aumento taxa Malformação' : 'Aumento taxa PBN';
            }
        });
    }

  // Adiciona o evento de clique ao título para alternar entre BPN, Malformação, APGAR e Prematuridade
  tituloBPN.addEventListener("click", function () {
    const currentText = tituloBPN.textContent.trim();
    switch (currentText) {
      case "Baixo Peso ao Nascer (BPN)":
        tituloBPN.textContent = "Malformação";
        buscaDadosGrupoDeCaracteristicas("Malformação");
        break;
      // case 'Malformação':
      //     tituloBPN.textContent = 'APGAR';
      //     buscaDadosGrupoDeCaracteristicas('APGAR');
      //     break;
      // case 'APGAR':
      //     tituloBPN.textContent = 'Prematuridade';
      //     buscaDadosGrupoDeCaracteristicas('Prematuridade');
      //     break;
      default:
        tituloBPN.textContent = "Baixo Peso ao Nascer (BPN)";
        buscaDadosGrupoDeCaracteristicas("Geral");
    }
  });

  // Itera sobre os links da barra lateral para adicionar os eventos
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const section = this.textContent.trim(); // Obtém o texto do link clicado

      // Remove a classe 'active' de todos os links
      sidebarLinks.forEach((link) => link.classList.remove("active"));

      // Adiciona a classe 'active' ao link clicado
      this.classList.add("active");

      // Se a seção selecionada for diferente de 'Por Cidade', altera o texto do campo 'Cidade' para 'Base'
      // e atualiza o valor para o nome da seção selecionada
      if (section !== "Por Cidade") {
        document.getElementById("spinner").style.display = "none";
        const baseField = document.getElementById("cidade");
        const baseTitle = document.querySelector(".card-header h5");
        baseField.textContent = section;
        baseTitle.textContent = "Base";
      }

      // Função para carregar dados da API de acordo com a seção selecionada
      loadSectionData(section);
    });
  });

  // Função para carregar dados da API de acordo com a seção selecionada
  async function loadSectionData(section) {
    try {
      document.getElementById("spinner").style.display = "block";
      // Limpa o conteúdo da seção de subgrupos
      const subgruposBody = document.getElementById("subgrupos-body");
      subgruposBody.innerHTML = "";

      if (section === "Por Cidade") {
        // Mostra o campo de busca por cidade
        showCitySearch();

        // Obtém o valor do campo de busca por cidade
        const citySearchValue = document
          .getElementById("city-search-input")
          .value.trim();

        // Verifica se foi digitado algo no campo de busca
        if (citySearchValue) {
          // Obtém os valores de APGAR e prematuridade
          const apgarValue = document.getElementById("apgar-input").value;
          const prematuridadeValue = document.getElementById(
            "prematuridade-input"
          ).value;

          // Carrega dados da seção 'Por Cidade' usando o valor do campo de busca por cidade, APGAR e prematuridade
          const data = await fetchFakeData(
            section,
            citySearchValue,
            apgarValue,
            prematuridadeValue
          );
          // Atualiza o campo 'Total de Exemplos' com o valor de 'd'
          const cidade = document.getElementById("cidade");
          const totalExemplosField = document.getElementById("total-exemplos");
          const comBaixoPeso = document.getElementById("com-baixo-peso");
          const semBaixoPeso = document.getElementById("sem-baixo-peso");

          cidade.textContent = data[0].nomeCidade;
          totalExemplosField.textContent = data[0].d;
          comBaixoPeso.textContent = data[0].dp;
          semBaixoPeso.textContent = data[0].dn;
          // riscoDeBaixoPeso.textContent =  (data[0].lift  * 100).toFixed(2) + '%';

          createBarChartRelative(data[0].d, data[0].dp, data[0].dn);
          createBarChart(data[0].d, data[0].dp, data[0].dn);
          displayData(data);
        } else {
          // Caso não haja valor digitado, exibe uma mensagem
          const row = document.createElement("tr");
          row.innerHTML = `<td colspan="10">Digite uma cidade para buscar.</td>`;
          subgruposBody.appendChild(row);
        }
      } else if (section === "Geral") {
        buscaDadosGrupoDeCaracteristicas(section);
      } else if (section === "Cidades Pequenas") {
        buscaDadosGrupoDeCaracteristicas(section);
      } else if (section === "Rural") {
        buscaDadosGrupoDeCaracteristicas(section);
      } else if (section === "Indígenas") {
        buscaDadosGrupoDeCaracteristicas(section);
      } else if (section === "Quilombolas") {
        buscaDadosGrupoDeCaracteristicas(section);
      } else if (section === "Mães Baixa Escolaridade") {
        buscaDadosGrupoDeCaracteristicas(section);
      } else if (section === "Mães Adolescentes") {
        buscaDadosGrupoDeCaracteristicas(section);
      } else {
        // Esconde o campo de busca por cidade
        hideCitySearch();
        // Carrega dados de outras seções (simulado com exemplo)
        const fakeData = await fetchFakeData(section);
        displayData(fakeData);
      }
      document.getElementById("spinner").style.display = "none";
    } catch (error) {
      console.error("Erro ao carregar dados da seção:", error);
    }
  }

  // Mostra o campo de busca por cidade
  function showCitySearch() {
    const citySearchDiv = document.getElementById("city-search");
    if (citySearchDiv) {
      citySearchDiv.style.display = "block";
    }
  }

  // Esconde o campo de busca por cidade
  function hideCitySearch() {
    const citySearchDiv = document.getElementById("city-search");
    if (citySearchDiv) {
      citySearchDiv.style.display = "none";
    }
  }

  async function fetchData(section, citySearchValue, apgarValue, prematuridadeValue) {
    const baseURL = "https://baixopeso.onrender.com/api/subgroups";

    switch (section) {
        case "Geral":
            const urlGeral = `${baseURL}/by-base/GERAL`;
            return await (await fetch(urlGeral)).json();

        case "Cidades Pequenas":
            const url10k = `${baseURL}/by-base/10K`;
            return await (await fetch(url10k)).json();

        case "Rural":
            const urlRural = `${baseURL}/by-base/RURAL`;
            return await (await fetch(urlRural)).json();

        case "Indígenas":
            const urlIndigenas = `${baseURL}/by-base/INDIGENA`;
            return await (await fetch(urlIndigenas)).json();

        case "Quilombolas":
            const urlQuilombola = `${baseURL}/by-base/QUILOMBOLA`;
            return await (await fetch(urlQuilombola)).json();

        case "Mães Baixa Escolaridade":
            const urlMAEANALFABETA = `${baseURL}/by-base/MAEANALFABETA`;
            return await (await fetch(urlMAEANALFABETA)).json();

        case "Mães Adolescentes":
            const urlMENOR15 = `${baseURL}/by-base/MENOR15`;
            return await (await fetch(urlMENOR15)).json();

        case "Malformação":
            const urlMalformacao = `${baseURL}/by-base/malformacaoanalfabeta`;
            return await (await fetch(urlMalformacao)).json();

        case "Por Cidade":
            if (!citySearchValue) {
                console.error("Nome da cidade é necessário para a busca por cidade.");
                return [];
            }
            const urlPorCidade = `${baseURL}/by-nome-cidade/${encodeURIComponent(citySearchValue)}`;
            return await (await fetch(urlPorCidade)).json();

        default:
            console.warn("Seção não encontrada:", section);
            return [];
    }
}

  // Exibe os dados na tabela de subgrupos
  function displayData(data) {
    const subgruposBody = document.getElementById("subgrupos-body");
    subgruposBody.innerHTML = "";

    if (data.length > 0) {
      data.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
<!--                    <td>${item.nomeCidade}</td>-->
                    <td>${item.descr}</td>
                    <td>${item.tp}</td>
                    <td>${item.fp}</td>
                    <td>${((item.lift - 1) * 100).toFixed(2) + "%"}</td>
<!--                    <td>${item.supp}</td>-->
<!--                    <td>${item.sup_p}</td>-->
<!--                    <td>${item.conf}</td>-->

                `;
        subgruposBody.appendChild(row);
      });
    } else {
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="10">Nenhum resultado encontrado.</td>`;
      subgruposBody.appendChild(row);
    }
  }

  async function buscaDadosGrupoDeCaracteristicas(section) {
    // Limpa o conteúdo da seção de subgrupos
    // const subgruposBody = document.getElementById('subgrupos-body');
    // subgruposBody.innerHTML = '';

    // Esconde o campo de busca por cidade
    hideCitySearch();

    // Carrega dados da seção selecionada
    const data = await fetchFakeData(section); // o await faz com que a função espere a resposta da API

    // Atualiza os campos com os dados obtidos
    const totalExemplosField = document.getElementById("total-exemplos");
    const comBaixoPeso = document.getElementById("com-baixo-peso");
    const semBaixoPeso = document.getElementById("sem-baixo-peso");

    var d = data[0].d;
    var dp = data[0].dp;
    var dn = data[0].d - data[0].dp;

    createBarChartRelative(d, dp, dn);
    createBarChart(d, dp, dn);

    totalExemplosField.textContent = d;
    comBaixoPeso.textContent = dp;
    semBaixoPeso.textContent = dn;

    // Exibe os dados na tabela de subgrupos

    displayData(data);
  }

  var barChartRelative = null;

  async function createBarChartRelative(d, dp, dn) {
    const ctx = document.getElementById("barChartRelative").getContext("2d");

    var dpGeral = 380321;
    var dnGeral = 4861894;
    var dGeral = dpGeral + dnGeral;

    // Calcula os percentuais
    const dpPercent = (dp / d) * 100;
    const dnPercent = (dn / d) * 100;

    const dpGeralPercent = (dpGeral / dGeral) * 100;
    const dnGeralPercent = (dnGeral / dGeral) * 100;

    // Destroi o gráfico existente, se houver
    if (barChartRelative) {
      barChartRelative.destroy();
      barChartRelative = null;
    }

    barChartRelative = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Com baixo Peso",
          "Com baixo Peso (Geral)",
          "Sem Baixo Peso",
          "Sem Baixo Peso (Geral)",
        ],
        datasets: [
          {
            label: "Percentual",
            data: [dpPercent, dpGeralPercent, dnPercent, dnGeralPercent],
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Seu título aqui", // Substitua 'Seu título aqui' pelo título desejado
          fontSize: 20,
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              // Inclui o símbolo de porcentagem nos rótulos das marcas
              callback: function (value, index, values) {
                return value + "%";
              },
            },
          },
        },
        tooltips: {
          callbacks: {
            // Inclui o símbolo de porcentagem nas dicas de ferramentas
            label: function (tooltipItem, data) {
              return (
                data.datasets[tooltipItem.datasetIndex].label +
                ": " +
                tooltipItem.yLabel +
                "%"
              );
            },
          },
        },
      },
    });
  }
  // Variável global para armazenar a instância do gráfico
  let myChart = null;

  function createBarChart(d, dp, dn) {
    const ctx = document.getElementById("myChart").getContext("2d");

    // Destroi o gráfico existente, se houver
    if (myChart) {
      myChart.destroy();
      myChart = null;
    }

    myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Total", "Com baixo Peso", "Sem Baixo Peso"],
        datasets: [
          {
            label: "Valores Absolutos",
            data: [d, dp, dn],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
});
