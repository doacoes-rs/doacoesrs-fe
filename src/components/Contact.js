import React from 'react';
import { Container, Typography, Button } from '@mui/material';

function Home() {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Bem-vindo ao site de organização de doações para vítimas da enchente no Rio Grande do Sul!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Nosso objetivo é facilitar a integração dos voluntários e ajudar na organização das doações para as vítimas da enchente.
      </Typography>
      <Typography variant="body1" gutterBottom>
        É importante ressaltar que não temos responsabilidade sobre o conteúdo das doações, uma vez que o cadastro é público.
      </Typography>
      <Button variant="contained" color="primary" href="/locaiscoleta">
        Onde doar
      </Button>
    </Container>
  );
}

export default Home;