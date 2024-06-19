document.addEventListener('DOMContentLoaded', function() {
    // Função para obter dados da API
    async function fetchData() {
        try {
            const response = await fetch('URL_DA_API'); // Substitua 'URL_DA_API' pela URL real da API
            const data = await response.json();
            
            // Atualize os campos com os dados da API
            document.getElementById('total-exemplos').textContent = data.totalExemplos;
            document.getElementById('com-baixo-peso').textContent = data.comBaixoPeso;
            document.getElementById('sem-baixo-peso').textContent = data.semBaixoPeso;
            document.getElementById('risco-baixo-peso').textContent = data.riscoBaixoPeso;
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    }

    // Chame a função para buscar dados ao carregar a página
    fetchData();
});
