import React, { useState } from 'react';

function CadCollect() {
  const [cep, setCep] = useState(''); // Estado para armazenar o CEP
  const [endereco, setEndereco] = useState(''); // Estado para armazenar o endereço encontrado com base no CEP
  const [complemento, setComplemento] = useState(''); // Estado para armazenar o complemento
  const [itensNecessarios, setItensNecessarios] = useState([]); // Estado para armazenar os itens necessários
  const [nomeLocal, setNomeLocal] = useState(''); // Estado para armazenar o nome do local de coleta
  const [comentarios, setComentarios] = useState(''); // Estado para armazenar os comentários

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
        nomeLocal,
        comentarios // Incluindo o campo de comentários no payload
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

  // Manipulador de eventos para a seleção de itens necessários
  const handleItemNecessarioChange = (event) => {
    const itemSelecionado = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setItensNecessarios([...itensNecessarios, itemSelecionado]);
    } else {
      setItensNecessarios(itensNecessarios.filter(item => item !== itemSelecionado));
    }
  };

  // Manipulador de eventos para o campo de comentários
  const handleComentariosChange = (event) => {
    const comentariosDigitados = event.target.value;
    setComentarios(comentariosDigitados);
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

      {/* Campos de texto livre para complemento, nome do local e comentários */}
      {endereco && (
        <>
          <div>
            <label htmlFor="complemento">Complemento:</label>
            <input type="text" id="complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
          </div>
          <div>
            <label htmlFor="nomeLocal">Nome do local de coleta:</label>
            <input type="text" id="nomeLocal" value={nomeLocal} onChange={(e) => setNomeLocal(e.target.value)} />
          </div>
          <div>
            <label htmlFor="comentarios">Comentários:</label>
            <textarea
              id="comentarios"
              value={comentarios}
              onChange={handleComentariosChange}
              rows={5}
              cols={40}
            />
          </div>
        </>
      )}

      {/* Checkboxes para os itens necessários */}
      <div>
        <p>Itens necessários:</p>
        <label>
          <input type="checkbox" value="Alimentos" onChange={handleItemNecessarioChange} />
          Alimentos
        </label>
        <label>
          <input type="checkbox" value="Roupas" onChange={handleItemNecessarioChange} />
          Roupas
        </label>
        <label>
          <input type="checkbox" value="Produtos de Higiene" onChange={handleItemNecessarioChange} />
          Produtos de Higiene
        </label>
        <label>
          <input type="checkbox" value="Materias de limpeza" onChange={handleItemNecessarioChange} />
          Materias de limpeza
        </label>
        <label>
          <input type="checkbox" value="Produtos Pet" onChange={handleItemNecessarioChange} />
          Produtos Pet
        </label>
        <label>
          <input type="checkbox" value="Pix" onChange={handleItemNecessarioChange} />
          Pix
        </label>
        <label>
          <input type="checkbox" value="Outros" onChange={handleItemNecessarioChange} />
          Outros
        </label>
      </div>

      {/* Botão de envio */}
      {endereco && (
        <button onClick={enviarDadosParaApi}>Enviar</button>
      )}
    </div>
  );
}

export default CadCollect;
