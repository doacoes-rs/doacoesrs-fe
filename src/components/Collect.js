import React, { useEffect, useState } from 'react';

function Collect() {
  const [estados, setEstados] = useState([]); // Estado para armazenar os estados
  const [cidades, setCidades] = useState([]); // Estado para armazenar as cidades
  const [selectedEstado, setSelectedEstado] = useState(''); // Estado para armazenar o estado selecionado
  const [selectedCidade, setSelectedCidade] = useState(''); // Estado para armazenar a cidade selecionada

  useEffect(() => {
    // Função para buscar os estados do Brasil na API do IBGE
    const carregarEstados = async () => {
      try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const data = await response.json();
        setEstados(data); // Atualiza o estado com os dados dos estados
      } catch (error) {
        console.error('Erro ao buscar os estados:', error);
      }
    };

    carregarEstados(); // Chama a função para buscar os estados assim que o componente for montado
  }, []); // Passa um array vazio como segundo argumento para garantir que a função só seja chamada uma vez

  // Função para carregar as cidades com base no estado selecionado
  const carregarCidades = async (estado) => {
    try {
      const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`);
      const data = await response.json();
      setCidades(data); // Atualiza o estado com os dados das cidades
    } catch (error) {
      console.error('Erro ao buscar as cidades:', error);
    }
  };

  // Manipulador de eventos para quando o estado é selecionado
  const handleEstadoChange = (event) => {
    const estadoSelecionado = event.target.value;
    setSelectedEstado(estadoSelecionado);
    carregarCidades(estadoSelecionado); // Chama a função para buscar as cidades do estado selecionado
  };

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
        estado: selectedEstado,
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
      <h2>Locais que estão coletando doações</h2>
      <p>Selecione o estado e a cidade onde você deseja entregar suas doações</p>

      {/* Campo de seleção para os estados */}
      <label htmlFor="estado">Selecione um estado:</label>
      <select name="estado" id="estado" onChange={handleEstadoChange}>
        <option value="">Selecione um estado</option>
        {estados.map(estado => (
          <option key={estado.sigla} value={estado.sigla}>{estado.nome}</option>
        ))}
      </select>

      {/* Campo de seleção para as cidades */}
      <div style={{ display: selectedEstado ? 'block' : 'none' }}>
        <label htmlFor="cidade">Selecione uma cidade:</label>
        <select name="cidade" id="cidade" onChange={handleCidadeChange} disabled={!selectedEstado}>
          <option value="">Selecione uma cidade</option>
          {cidades.map(cidade => (
            <option key={cidade.id} value={cidade.nome}>{cidade.nome}</option>
          ))}
        </select>
      </div>

      {/* Botão de pesquisa */}
      {selectedCidade && (
        <button onClick={handlePesquisar}>Pesquisar</button>
      )}
    </div>
  );
}

export default Collect;
