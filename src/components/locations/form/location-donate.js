import "./location-form.scss"
import React, { useState, useEffect } from 'react';
import { FormControl, Button, Box, Typography, Card, CardContent, Alert, AlertTitle, Link, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Autocomplete, TextField} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';


function Donate() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null); // Novo estado para armazenar o item a ser excluído
  const [items, setItems] = useState([]);
  const [estados, setEstados] = useState([]); // Estado para armazenar os estados
  const [cidades, setCidades] = useState([]); // Estado para armazenar as cidades
  const [selectedEstado, setSelectedEstado] = useState(''); // Estado para armazenar o estado selecionado
  const [selectedCidade, setSelectedCidade] = useState(''); // Estado para armazenar a cidade selecionada
  const [isMobile, setIsMobile] = useState(false); // Estado para armazenar se a tela é mobile
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);


  useEffect(() => {
    const items = [
      { latitude: -23.55052, longitude: -46.633308, nome: "São Paulo", endereco: "Av. Paulista, 1000", cidade: "São Paulo", estado: "SP" },
      { latitude: -15.794229, longitude: -47.882166, nome: "Brasília", endereco: "Esplanada dos Ministérios", cidade: "Brasília", estado: "DF" },
      { latitude: -3.71839, longitude: -38.543398, nome: "Fortaleza", endereco: "Av. Beira Mar", cidade: "Fortaleza", estado: "CE" },
      { latitude: -22.906847, longitude: -43.172897, nome: "Rio de Janeiro", endereco: "Cristo Redentor", cidade: "Rio de Janeiro", estado: "RJ" },
      { latitude: -25.4295963, longitude: -49.2712724, nome: "Curitiba", endereco: "Rua das Flores", cidade: "Curitiba", estado: "PR" },
      { latitude: -16.67992, longitude: -49.253268, nome: "Goiânia", endereco: "Parque Vaca Brava", cidade: "Goiânia", estado: "GO" },
      { latitude: -22.9068, longitude: -43.1729, nome: "Salvador", endereco: "Pelourinho", cidade: "Salvador", estado: "BA" },
      { latitude: -30.034631, longitude: -51.217698, nome: "Porto Alegre", endereco: "Usina do Gasômetro", cidade: "Porto Alegre", estado: "RS" },
      { latitude: -19.9166813, longitude: -43.9344931, nome: "Belo Horizonte", endereco: "Praça da Liberdade", cidade: "Belo Horizonte", estado: "MG" },
      { latitude: -15.794157, longitude: -47.882486, nome: "Palmas", endereco: "Praça dos Girassóis", cidade: "Palmas", estado: "TO" },
    ];

    setMarkers(items);
  }, []);

  useEffect(() => {
    // Função para obter a localização do usuário
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error('Erro ao obter a localização do usuário:', error);
          }
        );
      } else {
        console.error('Geolocalização não é suportada neste navegador.');
      }
    };

    // Obtém a localização do usuário quando o componente é montado
    getLocation();
  }, []);
  // Função para inicializar o mapa do Google Maps
  const initMap = () => {
    // Código para inicializar o mapa aqui
  };

  useEffect(() => {
    // Chama initMap quando a página é carregada
    initMap();
  }, []);

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
        <LoadScript googleMapsApiKey="AIzaSyAU9qV8JOd8aty-k2JSqdkMmAqz5lAJ0I8">
          <GoogleMap
            center={userLocation} // Define o centro do mapa como a localização do usuário
            zoom={userLocation ? 3 : 3} // Ajusta o zoom do mapa com base na localização do usuário
            options={{
              zoomControl: false, // Remove o controle de zoom
              mapTypeControl: false, // Remove o controle de tipo de mapa
            }}
            mapContainerStyle={{ width: '100%', height: '400px' }}
            >
            {markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.latitude, lng: marker.longitude }}
              onClick={() => setSelectedMarker(marker)}
            />
          ))}
          </GoogleMap>
        </LoadScript>
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
