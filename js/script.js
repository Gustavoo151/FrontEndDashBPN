document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('.nav-link');

    // Obtém uma referência ao botão de busca
    const searchButton = document.getElementById('btnSearch');

    // Adiciona um ouvinte de evento de clique ao botão de busca
    searchButton.addEventListener('click', function() {
        // Executa a busca quando o botão de busca é clicado
        loadSectionData('Por Cidade');
    });

    // Itera sobre os links da barra lateral para adicionar os eventos
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const section = this.textContent.trim(); // Obtém o texto do link clicado

            // Remove a classe 'active' de todos os links
            sidebarLinks.forEach(link => link.classList.remove('active'));

            // Adiciona a classe 'active' ao link clicado
            this.classList.add('active');

            // Função para carregar dados da API de acordo com a seção selecionada
            loadSectionData(section);
        });
    });



    // Função para carregar dados da API de acordo com a seção selecionada
    async function loadSectionData(section) {
        try {
            // Limpa o conteúdo da seção de subgrupos
            const subgruposBody = document.getElementById('subgrupos-body');
            subgruposBody.innerHTML = '';

            if (section === 'Por Cidade') {
                // Mostra o campo de busca por cidade
                showCitySearch();

                // Obtém o valor do campo de busca por cidade
                const citySearchValue = document.getElementById('city-search-input').value.trim();

                // Verifica se foi digitado algo no campo de busca
                if (citySearchValue) {
                    // Carrega dados da seção 'Por Cidade' usando o valor do campo de busca por cidade
                    const data = await fetchFakeData(section, citySearchValue);
                    // Atualiza o campo 'Total de Exemplos' com o valor de 'd'
                    const cidade  = document.getElementById('cidade');
                    const totalExemplosField = document.getElementById('total-exemplos');
                    const comBaixoPeso = document.getElementById('com-baixo-peso');
                    const semBaixoPeso = document.getElementById('sem-baixo-peso');

                    cidade.textContent = data[0].nomeCidade;
                    totalExemplosField.textContent = data[0].d;
                    comBaixoPeso.textContent = data[0].dp;
                    semBaixoPeso.textContent = data[0].dn;
                    // riscoDeBaixoPeso.textContent =  (data[0].lift  * 100).toFixed(2) + '%';

                    // Cria o gráfico de barras
                    createBarChart(data[0].d, data[0].dp, data[0].dn);

                    cidade.textContent = data[0].nomeCidade;
                    totalExemplosField.textContent = data[0].d;
                    comBaixoPeso.textContent = data[0].dp;
                    semBaixoPeso.textContent = data[0].dn;

                    displayData(data);
                } else {
                    // Caso não haja valor digitado, exibe uma mensagem
                    const row = document.createElement('tr');
                    row.innerHTML = `<td colspan="10">Digite uma cidade para buscar.</td>`;
                    subgruposBody.appendChild(row);
                }
            } else {
                // Esconde o campo de busca por cidade
                hideCitySearch();

                // Carrega dados de outras seções (simulado com exemplo)
                const fakeData = await fetchFakeData(section);
                displayData(fakeData);
            }
        } catch (error) {
            console.error('Erro ao carregar dados da seção:', error);
        }
    }

    // Mostra o campo de busca por cidade
    function showCitySearch() {
        const citySearchDiv = document.getElementById('city-search');
        if (citySearchDiv) {
            citySearchDiv.style.display = 'block';
        }
    }

    // Esconde o campo de busca por cidade
    function hideCitySearch() {
        const citySearchDiv = document.getElementById('city-search');
        if (citySearchDiv) {
            citySearchDiv.style.display = 'none';
        }
    }

    // Simulação de busca de dados da API
    async function fetchFakeData(section, citySearchValue) {
        // Simula uma consulta à API baseada na seção selecionada
        switch (section) {
            case 'Geral':
                return [
                    { Base: 'Subgrupo A', quantidade: 100, TP: 1, FP: 2, lift: 3, supp: 4, supp_p: 5, conf: 6, D: 7, Dp: 8 },
                    { Base: 'Subgrupo B', quantidade: 150, TP: 1, FP: 2, lift: 3, supp: 4, supp_p: 5, conf: 6, D: 7, Dp: 8 }
                ];
            case '10k':
                return [
                    { Base: 'Subgrupo C', quantidade: 80, TP: 1, FP: 2, lift: 3, supp: 4, supp_p: 5, conf: 6, D: 7, Dp: 8 },
                    { Base: 'Subgrupo D', quantidade: 120, TP: 1, FP: 2, lift: 3, supp: 4, supp_p: 5, conf: 6, D: 7, Dp: 8 }
                ];
            case 'Rural':
                return [
                    { Base: 'Subgrupo E', quantidade: 50, TP: 1, FP: 2, lift: 3, supp: 4, supp_p: 5, conf: 6, D: 7, Dp: 8 },
                    { Base: 'Subgrupo F', quantidade: 70, TP: 1, FP: 2, lift: 3, supp: 4, supp_p: 5, conf: 6, D: 7, Dp: 8 }
                ];
            case 'Indígenas':
                return [
                    { Base: 'Subgrupo H', quantidade: 50, TP: 1, FP: 2, lift: 3, supp: 4, supp_p: 5, conf: 6, D: 7, Dp: 8 },
                    { Base: 'Subgrupo W', quantidade: 70, TP: 1, FP: 2, lift: 3, supp: 4, supp_p: 5, conf: 6, D: 7, Dp: 8 }
                ];
            case 'Quilombolas':
                return [
                    { Base: 'Subgrupo E', quantidade: 50, TP: 1, FP: 2, lift: 3, supp: 4, supp_p: 5, conf: 6, D: 7, Dp: 8 },
                    { Base: 'Subgrupo F', quantidade: 70, TP: 1, FP: 2, lift: 3, supp: 4, supp_p: 5, conf: 6, D: 7, Dp: 8 }
                ];
            case 'Mães Analfabetas':
                return [
                    { Base: 'Subgrupo E', quantidade: 50, TP: 1, FP: 2, lift: 3, supp: 4, supp_p: 5, conf: 6, D: 7, Dp: 8 },
                    { Base: 'Subgrupo F', quantidade: 70, TP: 1, FP: 2, lift: 3, supp: 4, supp_p: 5, conf: 6, D: 7, Dp: 8 }
                ];
            case 'Menores que 15 Anos':
                return [
                    { Base: 'Subgrupo E', quantidade: 50, TP: 1, FP: 2, lift: 3, supp: 4, supp_p: 5, conf: 6, D: 7, Dp: 8 },
                    { Base: 'Subgrupo F', quantidade: 70, TP: 1, FP: 2, lift: 3, supp: 4, supp_p: 5, conf: 6, D: 7, Dp: 8 }
                ];
            case 'Bolsa Família':
                return [
                    { Base: 'Subgrupo E', quantidade: 50, TP: 1, FP: 2, lift: 3, supp: 4, supp_p: 5, conf: 6, D: 7, Dp: 8 },
                    { Base: 'Subgrupo F', quantidade: 70, TP: 1, FP: 2, lift: 3, supp: 4, supp_p: 5, conf: 6, D: 7, Dp: 8 }
                ];
            case 'Por Cidade':
                const url = `https://baixopeso.onrender.com/api/subgroups/by-nome-cidade/${encodeURIComponent(citySearchValue)}`;
                const response = await fetch(url);
                const data = await response.json();
                return data;
            default:
                return [];
        }
    }

    // Exibe os dados na tabela de subgrupos
    function displayData(data) {
        const subgruposBody = document.getElementById('subgrupos-body');
        subgruposBody.innerHTML = '';

        if (data.length > 0) {
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
<!--                    <td>${item.nomeCidade}</td>-->
                    <td>${item.descr}</td>
                    <td>${item.tp}</td>
                    <td>${item.fp}</td>
                    <td>${(item.lift * 100).toFixed(2) + '%'}</td>
<!--                    <td>${item.supp}</td>-->
<!--                    <td>${item.sup_p}</td>-->
<!--                    <td>${item.conf}</td>-->

                `;
                subgruposBody.appendChild(row);
            });
        } else {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="10">Nenhum resultado encontrado.</td>`;
            subgruposBody.appendChild(row);
        }
    }


    function createBarChart(d, dp, dn) {
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['D', 'Dp', 'Dn'],
                datasets: [{
                    label: 'Valores',
                    data: [d, dp, dn],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
