import React, { useState, useEffect } from 'react';

function Donate() {
  const [cidadesRS, setCidadesRS] = useState([]); // Estado para armazenar as cidades do RS
  const [selectedCidade, setSelectedCidade] = useState(''); // Estado para armazenar a cidade selecionada

  useEffect(() => {
    const fetchCidadesRS = async () => {
      try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/RS/municipios');
        const data = await response.json();
        setCidadesRS(data); // Atualiza o estado com os dados das cidades do RS
      } catch (error) {
        console.error('Erro ao buscar as cidades do RS:', error);
      }
    };

    fetchCidadesRS(); // Chama a função para buscar as cidades do RS assim que o componente for montado
  }, []);

  // Manipulador de eventos para quando a cidade é selecionada
  const handleCidadeChange = (event) => {
    const cidadeSelecionada = event.target.value;
    setSelectedCidade(cidadeSelecionada);
  };
  // Função para lidar com a pesquisa
  const handlePesquisar = async () => {
    try {
      // Constrói o objeto payload
      const payload = {
        cidade: selectedCidade
      };

      // Faz a requisição para a API
      const response = await fetch('URL_DA_API', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      // Verifica se a requisição foi bem-sucedida
      if (response.ok) {
        // Se sim, exibe uma mensagem de sucesso
        alert('Pesquisa realizada com sucesso!');
      } else {
        // Se a resposta não estiver OK, lança um erro
        throw new Error('Erro ao fazer a requisição para a API');
      }
    } catch (error) {
      console.error('Erro ao pesquisar:', error);
    }
  };

  return (
    <div>
      <div>
        <h2>Cidades que precisam de doação</h2>
        <p>Selecione a cidade do Rio Grande do Sul que deseja levar a doação</p>
        {/* Campo de seleção para as cidades do RS */}
        <select name="cidade" id="cidade" onChange={handleCidadeChange}>
          <option value="">Selecione uma cidade</option>
          {cidadesRS.map(cidade => (
            <option key={cidade.id} value={cidade.nome}>{cidade.nome}</option>
          ))}
        </select>
      </div>

      {/* Exibir a cidade selecionada */}
      {selectedCidade && (
        <button onClick={handlePesquisar}>Pesquisar</button>
      )}
    </div>
  );
}

export default Donate;
