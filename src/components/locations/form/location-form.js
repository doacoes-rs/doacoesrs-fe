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
  const [cep, setCep] = useState(''); // Estado para armazenar o CEP
  const [endereco, setEndereco] = useState(''); // Estado para armazenar o endereço encontrado com base no CEP
  const [complemento, setComplemento] = useState(''); // Estado para armazenar o complemento
  const [itensNecessarios, setItensNecessarios] = useState([]); // Estado para armazenar os itens necessários
  const [nomeLocal, setNomeLocal] = useState(''); // Estado para armazenar o nome do local de coleta
  const [numero, setNumero] = useState(''); // Estado para armazenar o número
  const [responsavel, setResponsavel] = useState(''); // Estado para armazenar o nome do local de coleta
  const [comentarios, setComentarios] = useState(''); // Estado para armazenar os comentários
  const [localidade, setLocalidade] = useState(''); // Estado para armazenar a localidade
  const [uf, setUf] = useState(''); // Estado para armazenar a UF
  // Função para buscar a localização com base no CEP

 // const defaultDate = addDays(new Date(), 15);


  const buscarLocalizacaoPorCep = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        const enderecoCompleto = `${data.logradouro}, ${data.localidade} - ${data.uf}`;
        setEndereco(enderecoCompleto);
        setUf(data.uf);
        setLocalidade(data.localidade);
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
        uf,
        localidade,
        endereco,
        numero,
        complemento,
        itensNecessarios,
        nomeLocal,
        responsavel,
        comentarios // Incluindo o campo de comentários no payload
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
            onChange={handleCepChange}
            onBlur={handlePesquisarCep}
            />
          </Box>
          <Box className="form-input">
            <TextField
              required
              sx={{ width: '100%', maxWidth: '480px' }}
              id="endereco"
              label="Endereço"
              defaultValue={endereco}
              value={endereco}
              variant="standard"
              disabled
              onChange={(e) => setEndereco(e.target.value)}
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
                  value={numero}
                  variant="standard"
                  onChange={(e) => setNumero(e.target.value)}
                />
              </Box>
              <Box className="form-input">
                <TextField
                  sx={{ width: '100%', maxWidth: '480px' }}
                  id="complemento"
                  label="Complemento"
                  value={complemento}
                  variant="standard"
                  onChange={(e) => setComplemento(e.target.value)}
                />
              </Box>
              <Box className="form-input" sx={{ width: '100%' }}>
                <TextField
                  sx={{ width: '100%', maxWidth: '480px' }}
                  required
                  variant="standard"
                  id="nomeLocal"
                  label="Nome do local de coleta"
                  value={nomeLocal}
                  onChange={(e) => setNomeLocal(e.target.value)}
                />
              </Box>
              <Box>

              </Box>
              <Box className="form-input" sx={{ width: '100%' }}>
                <TextField
                  sx={{ width: '100%', maxWidth: '480px' }}
                  required
                  variant="standard"
                  id="responsavel"
                  label="Contatos do responsável"
                  value={responsavel}
                  onChange={(e) => setResponsavel(e.target.value)}
                />
              </Box>
              <Box className="form-input">
                <TextField
                  sx={{ width: '100%', maxWidth: '480px' }}
                  id="comentarios"
                  label="Comentários"
                  value={comentarios}
                  onChange={handleComentariosChange}
                  multiline
                  rows={5}
                />
              </Box>

          {/* Checkboxes para os itens necessários */}
          <Box className="form-input">
            <p>Itens de doação necessários:</p>
            <FormControlLabel
              control={<Checkbox onChange={handleItemNecessarioChange} />}
              label="Alimentos"
            />
            <FormControlLabel
              control={<Checkbox onChange={handleItemNecessarioChange} />}
              label="Roupas"
            />
            <FormControlLabel
              control={<Checkbox onChange={handleItemNecessarioChange} />}
              label="Remédios"
            />
            <FormControlLabel
              control={<Checkbox onChange={handleItemNecessarioChange} />}
              label="Produtos de Higiene"
            />
            <FormControlLabel
              control={<Checkbox onChange={handleItemNecessarioChange} />}
              label="Materias de limpeza"
            />
            <FormControlLabel
              control={<Checkbox onChange={handleItemNecessarioChange} />}
              label="Produtos Pet"
            />
            <FormControlLabel
              control={<Checkbox onChange={handleItemNecessarioChange} />}
              label="Outros"
            />
          </Box>

          {/* Botão de envio */}
          {endereco && responsavel && nomeLocal &&(
            <Button variant="contained" onClick={enviarDadosParaApi}>Cadastrar</Button>
          )}
      </CardContent>
    </Card>
  );
}

export default CadCollect;
