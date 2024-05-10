import "./location-form.scss"
import React, { useState } from 'react';
import Button from '@mui/material/Button';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
//import { addDays } from 'date-fns';



function CadCollect() {
  const [zip_code, setZip_code] = useState(''); // Estado para armazenar o CEP
  const [address, setAddress] = useState(''); // Estado para armazenar o endereço encontrado com base no CEP
  const [complement, setComplement] = useState(''); // Estado para armazenar o complemento
  const [items, setItems] = useState([]); // Estado para armazenar os itens necessários
  const [name, setName] = useState(''); // Estado para armazenar o nome do local de coleta
  const [days, setDays] = useState(''); // Estado para armazenar o nome do local de coleta
  const [number, setNumber] = useState(''); // Estado para armazenar o número
  const [contacts, setContacts] = useState(''); // Estado para armazenar o nome do local de coleta
  const [comments, setComments] = useState(''); // Estado para armazenar os comentários
  const [city, setCity] = useState(''); // Estado para armazenar a localidade
  const [state, setState] = useState(''); // Estado para armazenar a UF
  const [fullAddress, setFullAddress] = useState(''); // Estado para armazenar a UF
 // const defaultDate = addDays(new Date(), 15);


  const buscarLocalizacaoPorZip_code = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${zip_code}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setFullAddress(`${data.logradouro}, ${data.localidade} - ${data.uf}`);
        setAddress(data.logradouro);
        setState(data.uf);
        setCity(data.localidade);
      } else {
        setAddress('Endereço não encontrado para o CEP fornecido.');
      }
    } catch (error) {
      console.error('Erro ao buscar localização por CEP:', error);
    }
  };

  // Manipulador de eventos para o campo de CEP
  const handleZip_codeChange = (event) => {
    const cepDigitado = event.target.value;
    setZip_code(cepDigitado);
  };

  // Manipulador de eventos para o botão de pesquisa de CEP
  const handlePesquisarZip_code = () => {
    buscarLocalizacaoPorZip_code();
  };

  // Função para enviar os dados para a API
  const enviarDadosParaApi = async () => {
    const dataInicial = new Date();
    const expiration = new Date(dataInicial);
    expiration.setDate(expiration.getDate() + parseInt(days));
    const expiration_date = expiration.getTime();
    console.log(zip_code)
    try {
      const payload = {
        zip_code,
        state,
        city,
        address,
        number,
        complement,
        items,
        name,
        contacts,
        expiration_date,
        comments // Incluindo o campo de comentários no payload
      };


      // Aqui você deve substituir 'URL_DA_API' pela URL da sua API
      const response = await fetch('https://api.doacoesrs.com.br/locations', {
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
    const itemLabel = event.target.name; // Obtém o nome do label do item selecionado
    const isChecked = event.target.checked;

    if (isChecked) {
      setItems([...items, itemLabel]); // Adiciona o nome do label aos itens selecionados
    } else {
      setItems(items.filter(item => item !== itemLabel)); // Remove o nome do label dos itens selecionados
    }
  };

  // Manipulador de eventos para o campo de comentários
  const handleCommentsChange = (event) => {
    const comentariosDigitados = event.target.value;
    setComments(comentariosDigitados);
  };
  return (
    <Card sx={{ maxWidth: 500 }} className="form-container">
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Cadastrar local para receber doações
          </Typography>

          {/* Campo de entrada para o CEP */}
          <Box className="form-input">
            <TextField
            sx={{ width: '100%', maxWidth: '480px' }}
            id="outlined-required"
            label="CEP"
            placeholder="09810-100"
            variant="standard"
            onChange={handleZip_codeChange}
            onBlur={handlePesquisarZip_code}
            />
          </Box>
          <Box className="form-input">
            <TextField
              required
              sx={{ width: '100%', maxWidth: '480px' }}
              id="fullAddress"
              label="Endereço"
              defaultValue={fullAddress}
              value={fullAddress}
              variant="standard"
              disabled
              />
           </Box>

          {/* Campos de texto livre para complemento, nome do local e comentários */}
              <Box className="form-input">
                <TextField
                  sx={{ width: '100%', maxWidth: '480px' }}
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
                  id="number"
                  label="Número"
                  type="number" // Definindo o tipo como "number"
                  value={number}
                  variant="standard"
                  onChange={(e) => setNumber(e.target.value)}
                />
              </Box>
              <Box className="form-input">
                <TextField
                  sx={{ width: '100%', maxWidth: '480px' }}
                  id="complement"
                  label="Complemento"
                  value={complement}
                  variant="standard"
                  onChange={(e) => setComplement(e.target.value)}
                />
              </Box>
              <Box className="form-input" sx={{ width: '100%' }}>
                <TextField
                  sx={{ width: '100%', maxWidth: '480px' }}
                  required
                  variant="standard"
                  id="name"
                  label="Nome do local de coleta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box className="form-input" sx={{ width: '100%' }}>
                <TextField
                  sx={{ width: '100%', maxWidth: '480px' }}
                  variant="standard"
                  id="days"
                  defaultValue={15}
                  label="Receberemos doações por quantos dias?"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                />
              </Box>
              <Box className="form-input" sx={{ width: '100%' }}>
                <TextField
                  sx={{ width: '100%', maxWidth: '480px' }}
                  required
                  variant="standard"
                  id="contacts"
                  label="Contatos do responsável"
                  value={contacts}
                  onChange={(e) => setContacts(e.target.value)}
                />
              </Box>
              <Box className="form-input">
                <TextField
                  sx={{ width: '100%', maxWidth: '480px' }}
                  id="comments"
                  label="Comentários"
                  value={comments}
                  onChange={handleCommentsChange}
                  multiline
                  rows={5}
                />
              </Box>

          {/* Checkboxes para os itens necessários */}
          <Box className="form-input">
            <p>Itens de doação necessários:</p>
            <FormControlLabel
              control={<Checkbox name="Alimentos" onChange={handleItemNecessarioChange} />}
              label="Alimentos"
            />
            <FormControlLabel
              control={<Checkbox name="Roupas" onChange={handleItemNecessarioChange} />}
              label="Roupas"
            />
            <FormControlLabel
              control={<Checkbox name="Remédios" onChange={handleItemNecessarioChange} />}
              label="Remédios"
            />
            <FormControlLabel
              control={<Checkbox name="Produtos de higiene" onChange={handleItemNecessarioChange} />}
              label="Produtos de Higiene"
            />
            <FormControlLabel
              control={<Checkbox name="Produtos de limpeza" onChange={handleItemNecessarioChange} />}
              label="Produtos de limpeza"
            />
            <FormControlLabel
              control={<Checkbox name="Produtos para PETs"onChange={handleItemNecessarioChange} />}
              label="Produtos para PETs"
            />
            <FormControlLabel
              control={<Checkbox name="Outros" onChange={handleItemNecessarioChange} />}
              label="Outros"
            />
          </Box>

          {/* Botão de envio */}
          {address && contacts && name &&(
            <Button variant="contained" onClick={enviarDadosParaApi}>Cadastrar</Button>
          )}
      </CardContent>
    </Card>
  );
}

export default CadCollect;
