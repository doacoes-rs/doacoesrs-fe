import "./location-form.scss"
import React, { useState, useEffect } from 'react';
import { FormControl, Button, Box, Typography, Card, CardContent, Alert, AlertTitle, Link, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Autocomplete, TextField} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';


function Donate() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null); // Novo estado para armazenar o item a ser excluído
  const [items, setItems] = useState([]);
  const [estados, setEstados] = useState([]); // Estado para armazenar os estados
  const [cidades, setCidades] = useState([]); // Estado para armazenar as cidades
  const [selectedEstado, setSelectedEstado] = useState(''); // Estado para armazenar o estado selecionado
  const [selectedCidade, setSelectedCidade] = useState(''); // Estado para armazenar a cidade selecionada
  const [isMobile, setIsMobile] = useState(false); // Estado para armazenar se a tela é mobile

  useEffect(() => {
    const setMobileView = () => {
      setIsMobile(window.innerWidth < 600); // Define isMobile como verdadeiro se a largura da tela for menor que 600 pixels
    };

    setMobileView(); // Define o estado inicial de isMobile

    window.addEventListener('resize', setMobileView); // Adiciona um listener para o evento de redimensionamento da tela

    return () => {
      window.removeEventListener('resize', setMobileView); // Remove o listener quando o componente é desmontado para evitar vazamento de memória
    };
  }, []);

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
  const handleEstadoChange = (event, value) => {
    const estadoSelecionado = value?.sigla;
    setSelectedEstado(estadoSelecionado);
    carregarCidades(estadoSelecionado); // Chama a função para buscar as cidades do estado selecionado
  };

  // Manipulador de eventos para quando a cidade é selecionada
  const handleCidadeChange = (event, value) => {
    const cidadeSelecionada = value?.nome;
    setSelectedCidade(cidadeSelecionada);
  };

  // Função para lidar com a pesquisa
  const handlePesquisar = async () => {
    var url = `https://api.doacoesrs.com.br/locations`;
    const filters = []

    if (selectedEstado) {
      filters.push(`state=${selectedEstado}`)
    }

    if (selectedCidade) {
      filters.push(`city=${selectedCidade}`)
    }

    if (filters.length > 0) {
      const query = filters.join("&")
      url = url.concat(`?${query}`)
    }

    try {
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

  const handleDeletePush = async () => {
    if (!itemToDelete) return;

    try {
      const url = `https://api.doacoesrs.com.br/locations/${itemToDelete.id}`;
      // Faz a requisição POST para a API
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Verifica se a requisição foi bem-sucedida
      if (response.ok) {
        // Atualiza os itens após a exclusão
        handlePesquisar();
        console.log('Item excluído com sucesso!');
      } else {
        // Se a resposta não estiver OK, lança um erro
        throw new Error('Erro ao excluir o item');
      }
    } catch (error) {
      console.error('Erro ao excluir o item:', error);
    } finally {
      // Fecha o diálogo de exclusão
      setOpenDeleteDialog(false);
    }
  };

  const openDeleteConfirmation = (itemId) => {
    setItemToDelete(items.find(item => item.id === itemId)); // Define o item a ser excluído com base no ID
    setOpenDeleteDialog(true);
  };

  const handleShare = async (item) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Conheça um local que recolhe doações para o RS:',
          text: `Veja as informações sobre a doação ${item.name}:
          Endereço: ${item.address}, ${item.number} - ${item.complement}, ${item.zip_code}
          Contatos: ${item.contacts}
          ${item.comments ? `Comentários: ${item.comments}` : ""}
          ${item.items ? `O que precisamos: ${formatItems(item.items)}` : ""}
          Acesse o link para mais informações: https://doacoesrs.com.br`
        });
        console.log('Conteúdo compartilhado com sucesso!');
      } else {
        // Se o navigator.share() não estiver disponível, ofereça uma alternativa
        console.log('navigator.share() não suportado. Oferecer uma alternativa.');
      }
    } catch (error) {
      console.error('Erro ao compartilhar conteúdo:', error);
    }
  };

  const formatItems = items => {
    const itemsMap = {
      "ALIMENTOS": "Alimentos",
      "AGUA": "Água",
      "ROUPAS": "Roupas",
      "REMEDIOS": "Remédios",
      "HIGIENE": "Produtos de higiene",
      "LIMPEZA": "Produtos de limpeza",
      "PETS": "Produtos para PETs",
      "OUTROS": "Outros",
    }

    return items.map((item) => itemsMap[item]).join(", ")
  }

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
      <p>
        Selecione o estado e a cidade onde você deseja entregar suas doações ou
        <Link href="https://blog.correios.com.br/2024/05/07/ampliamos-nossa-rede-de-apoio-as-vitimas-saiba-onde-e-o-que-doar-para-ajudar-2/" target="_blank"> envie por qualquer unidade dos Correios
          <MailOutlineIcon fontSize="small" style={{ verticalAlign: 'middle', marginLeft: '4px' }} />
        </Link>
      </p>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Campo de seleção para os estados */}
      <FormControl sx={{ width: '100%', marginBottom: 2 }}>
        <Autocomplete
          id="estado"
          options={estados}
          getOptionLabel={(option) => option.nome}
          renderInput={(params) => <TextField {...params} label="Selecione um estado" />}
          onChange={handleEstadoChange}
        />
      </FormControl>

      {/* Campo de seleção para as cidades */}
      {selectedEstado && (
        <FormControl sx={{ width: '100%', marginBottom: 2 }}>
          <Autocomplete
            id="estado"
            options={cidades}
            getOptionLabel={(option) => option.nome}
            renderInput={(params) => <TextField {...params} label="Selecione uma cidade" />}
            onChange={handleCidadeChange}
            disabled={!selectedEstado}
          />
        </FormControl>
      )}

      {/* Botão de pesquisa */}
        <Button variant="contained" onClick={handlePesquisar}>
          Pesquisar
        </Button>
        {items.map((item, index) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Card key={index} id={`card-${index}`} sx={{ maxWidth: 400, marginTop: 2 }}>
            <CardContent>
              {isMobile && (
                <IconButton sx ={{justifyContent: 'flex-end'}}
                  onClick={() => handleShare(item)}
                  aria-label="share">
                  <ShareIcon />
                </IconButton>
              )}
              <Typography variant="h6" component="div">
                {item.name}
              </Typography>
              <Typography variant="body1">
                Endereço: {item.address}, {item.number}{item.complement ? `, ${item.complement}` : ""}, {item.neighborhood}, {item.city}/{item.state}. CEP: {item.zip_code}
              </Typography>
              <Typography variant="body2">
                Contatos: {item.contacts}
              </Typography>
              {
                item.comments &&
                <Typography variant="body2">
                  Comentários: {item.comments}
                </Typography>
              }
              {
                item.items &&
                <Typography variant="body2">
                  O que precisamos: {formatItems(item.items)}
                </Typography>
              }
              <IconButton
                onClick={() => openDeleteConfirmation(item.id)} // Passa o ID do item para a função
                aria-label="delete">
                <DeleteIcon />
              </IconButton>
              <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
              <DialogTitle>Confirmação</DialogTitle>
              <DialogContent>
                <Typography variant="body1">Tem certeza de que deseja excluir este o local de coleta {itemToDelete ? itemToDelete.name : ""} Endereço: {itemToDelete ? itemToDelete.address : ""}, {itemToDelete ? itemToDelete.number : ""} - {itemToDelete ? itemToDelete.complement : ""}, {itemToDelete ? itemToDelete.zip_code : ""} </Typography>
              </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
                  <Button onClick={handleDeletePush} variant="contained" color="error">Confirmar</Button>
                </DialogActions>
              </Dialog>
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
