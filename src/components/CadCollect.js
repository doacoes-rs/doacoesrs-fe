import React, { useState } from 'react';

function CadCollect() {
  const [cep, setCep] = useState(''); // Estado para armazenar o CEP
  const [endereco, setEndereco] = useState(''); // Estado para armazenar o endereço encontrado com base no CEP
  const [complemento, setComplemento] = useState(''); // Estado para armazenar o complemento
  const [itensNecessarios, setItensNecessarios] = useState(''); // Estado para armazenar os itens necessários
  const [nomeLocal, setNomeLocal] = useState(''); // Estado para armazenar o nome do local de coleta

  // Função para buscar a localização com base no CEP
  const buscarLocalizacaoPorCep = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        const enderecoCompleto = `${data.logradouro}, ${data.localidade} - ${data.uf}`;
        setEndereco(enderecoCompleto);
      } else {
        setEndereco('Endereço não encontrado para o CEP fornecido.');
      }
    } catch (error) {
      console.error('Erro ao buscar localização por CEP:', error);
    }
  };

  // Manipulador de eventos para o campo de CEP
  const handleCepChange = (event) => {
    const cepDigitado = event.target.value;
    setCep(cepDigitado);
  };

  // Manipulador de eventos para o botão de pesquisa de CEP
  const handlePesquisarCep = () => {
    buscarLocalizacaoPorCep();
  };

  // Função para enviar os dados para a API
  const enviarDadosParaApi = async () => {
    try {
      const payload = {
        cep,
        endereco,
        complemento,
        itensNecessarios,
        nomeLocal
      };

      // Aqui você deve substituir 'URL_DA_API' pela URL da sua API
      const response = await fetch('URL_DA_API', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Dados enviados com sucesso!');
      } else {
        throw new Error('Erro ao enviar os dados para a API');
      }
    } catch (error) {
      console.error('Erro ao enviar dados para a API:', error);
    }
  };

  return (
    <div>
      <h2>Cadastrar local para coleta de doações</h2>
      <p>Informe o CEP para encontrar o endereço:</p>

      {/* Campo de entrada para o CEP */}
      <div>
        <label htmlFor="cep">CEP:</label>
        <input type="text" id="cep" value={cep} onChange={handleCepChange} />
        <button onClick={handlePesquisarCep}>Buscar CEP</button>
      </div>

      {/* Exibição do endereço */}
      <p>{endereco}</p>

      {/* Campos de texto livre para complemento, itens necessários e nome do local */}
      {endereco && (
        <>
          <div>
            <label htmlFor="complemento">Complemento:</label>
            <input type="text" id="complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
          </div>
          <div>
            <label htmlFor="itensNecessarios">Itens necessários:</label>
            <textarea
              id="itensNecessarios"
              value={itensNecessarios}
              onChange={(e) => setItensNecessarios(e.target.value)}
              maxLength={250}
              rows={5}
              cols={40}
            />
          </div>
          <div>
            <label htmlFor="nomeLocal">Nome do local de coleta:</label>
            <input type="text" id="nomeLocal" value={nomeLocal} onChange={(e) => setNomeLocal(e.target.value)} />
          </div>
        </>
      )}

      {/* Botão de envio */}
      {endereco && (
        <button onClick={enviarDadosParaApi}>Enviar</button>
      )}
    </div>
  );
}

export default CadCollect;
