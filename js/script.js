document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('.nav-link');

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
                    { nome: 'Subgrupo A', quantidade: 100 },
                    { nome: 'Subgrupo B', quantidade: 150 }
                ];
            case '10k':
                return [
                    { nome: 'Subgrupo C', quantidade: 80 },
                    { nome: 'Subgrupo D', quantidade: 120 }
                ];
            case 'Rural':
                return [
                    { nome: 'Subgrupo E', quantidade: 50 },
                    { nome: 'Subgrupo F', quantidade: 70 }
                ];

            case 'Indígenas':
                return [
                    { nome: 'Subgrupo H', quantidade: 50 },
                    { nome: 'Subgrupo w', quantidade: 70 }
                ];
            case 'Quilombolas':
                return [
                    { nome: 'Subgrupo E', quantidade: 50 },
                    { nome: 'Subgrupo F', quantidade: 70 }
                ];
            case 'Mães Analfabetas':
                return [
                    { nome: 'Subgrupo E', quantidade: 50 },
                    { nome: 'Subgrupo F', quantidade: 70 }
                ];
            case 'Menores que 15 Anos':
                return [
                    { nome: 'Subgrupo E', quantidade: 50 },
                    { nome: 'Subgrupo F', quantidade: 70 }
                ];
            case 'Bolsa Família':
                return [
                    { nome: 'Subgrupo E', quantidade: 50 },
                    { nome: 'Subgrupo F', quantidade: 70 }
                ];    
            case 'Por Cidade':
                const response = await fetch(`https://baixopeso.onrender.com/api/subgroups/by-nome-cidade/?city=${citySearchValue}`);
                return await response.json();
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
                <td>${item.Base}</td>
                <td>${item.quantidade}</td>
                <td>${item.TP}</td>
                <td>${item.FP}</td>
                <td>${item.lift}</td>
                <td>${item.supp}</td>
                <td>${item.sup_p}</td>
                <td>${item.conf}</td>
                <td>${item.D}</td>
                <td>${item.Dp}</td>
            `;
                subgruposBody.appendChild(row);
            });
        } else {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="10">Nenhum resultado encontrado.</td>`;
            subgruposBody.appendChild(row);
        }
    }

    async function loadSectionData(section) {
        try {
            // Limpa o conteúdo da seção de subgrupos
            const subgruposBody = document.getElementById('subgrupos-body');
            subgruposBody.innerHTML = '';

            if (section === 'Por Cidade') {
                // Mostra o campo de busca por cidade
                showCitySearch();

                // Obtém o valor do campo de busca por cidade
                const citySearchValue = document.getElementById('city-search-input').value;

                // Carrega dados da seção 'Por Cidade' usando o valor do campo de busca por cidade
                const data = await fetchFakeData(section, citySearchValue);
                displayData(data);
            } else {
                // ... restante do código ...
            }
        } catch (error) {
            console.error('Erro ao carregar dados da seção:', error);
        }
    }
});
