document.addEventListener('DOMContentLoaded', function () {
    // Exemplo de dados para o gráfico 1
    const data1 = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            label: 'Dataset 1',
            backgroundColor: 'rgba(27, 59, 111, 0.5)', // Azul marinho
            borderColor: 'rgba(27, 59, 111, 1)', // Azul marinho
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    };

    // Configuração do gráfico 1
    const config1 = {
        type: 'line',
        data: data1,
        options: {}
    };

    // Renderiza o gráfico 1 no canvas
    const chart1 = new Chart(
        document.getElementById('chart1'),
        config1
    );

    // Exemplo de dados para o gráfico 2
    const data2 = {
        labels: ['July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'Dataset 2',
            backgroundColor: 'rgba(59, 89, 152, 0.5)', // Azul claro
            borderColor: 'rgba(59, 89, 152, 1)', // Azul claro
            data: [10, 20, 30, 40, 50, 60]
        }]
    };

    // Configuração do gráfico 2
    const config2 = {
        type: 'bar',
        data: data2,
        options: {}
    };

    // Renderiza o gráfico 2 no canvas
    const chart2 = new Chart(
        document.getElementById('chart2'),
        config2
    );

    // Exemplo de tabela de dados
    const tableData = [
        ['Janeiro', 10],
        ['Fevereiro', 20],
        ['Março', 30],
        ['Abril', 40],
        ['Maio', 50]
    ];

    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Mês</th>
                <th>Valor</th>
            </tr>
        </thead>
        <tbody>
            ${tableData.map(row => `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`).join('')}
        </tbody>
    `;
    document.getElementById('data-table').appendChild(table);
});
