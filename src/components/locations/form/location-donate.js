import "./location-form.scss"
import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Box, Typography, Card, CardContent, Alert, AlertTitle  } from '@mui/material';

function Donate() {
  const [items, setItems] = useState([]);
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
        const estadosOrdenados = data.sort((a, b) => {
          if (a.nome < b.nome) return -1;
          if (a.nome > b.nome) return 1;
          return 0;
        });
        setEstados(estadosOrdenados); // Atualiza o estado com os dados dos estados ordenados
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
      const url = `https://doacoesrs-be-sjg4ytffja-uc.a.run.app/locations?city=${selectedCidade}&state=${selectedEstado}`;

      // Faz a requisição para a API
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      // Verifica se a requisição foi bem-sucedida
      if (response.ok) {
        // Obtém os dados da resposta
        const data = await response.json();
        // Atualiza o estado com os dados recebidos
        setItems(data);
      } else {
        // Se a resposta não estiver OK, lança um erro
        throw new Error('Erro ao fazer a requisição para a API');
      }
    } catch (error) {
      console.error('Erro ao pesquisar:', error);
    }
  };

  return (
    <Card sx={{ maxWidth: 500 }} className="form-container">
        <Alert severity="warning">
          <AlertTitle>Cuidado</AlertTitle>
          Por favor, verifique as referências dos locais de doação antes de se deslocar ou enviar doações. Não se coloque em risco tentando ajudar.
        </Alert>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Locais que estão coletando doações
          </Typography>
      <p>Selecione o estado e a cidade onde você deseja entregar suas doações</p>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Campo de seleção para os estados */}
      <FormControl sx={{ width: '100%', marginBottom: 2 }}>
        <InputLabel id="estado-label">Selecione um estado</InputLabel>
        <Select
          labelId="estado-label"
          id="estado"
          value={selectedEstado}
          onChange={handleEstadoChange}
          label="Selecione um estado"
        >
          <MenuItem value="">
            <em>Selecione um estado</em>
          </MenuItem>
          {estados.map((estado) => (
            <MenuItem key={estado.sigla} value={estado.sigla}>
              {estado.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Campo de seleção para as cidades */}
      {selectedEstado && (
        <FormControl sx={{ width: '100%', marginBottom: 2 }}>
          <InputLabel id="cidade-label">Selecione uma cidade</InputLabel>
          <Select
            labelId="cidade-label"
            id="cidade"
            value={selectedCidade}
            onChange={handleCidadeChange}
            label="Selecione uma cidade"
            disabled={!selectedEstado}
          >
            <MenuItem value="">
              <em>Selecione uma cidade</em>
            </MenuItem>
            {cidades.map((cidade) => (
              <MenuItem key={cidade.id} value={cidade.nome}>
                {cidade.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Botão de pesquisa */}
      {selectedCidade && (
        <Button variant="contained" onClick={handlePesquisar}>
          Pesquisar
        </Button>
      )}
        {items.map((item, index) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Card key={index} sx={{ maxWidth: 400, marginTop: 2 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {item.name}
              </Typography>
              <Typography variant="body1">
                Endereço: {item.address}, {item.number} - {item.complement}, {item.zip_code}
              </Typography>
              <Typography variant="body2">
                Contatos: {item.contacts.join(', ')}
              </Typography>
              <Typography variant="body2">
                Comentários: {item.comments}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        ))}
    </Box>
    </CardContent>
    </Card>
  );
}

export default Donate;
