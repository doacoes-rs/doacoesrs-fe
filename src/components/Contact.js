import React from 'react';
import { Container, Typography, Card, CardContent, Box } from '@mui/material';

function Contact() {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', marginTop: '50px' }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Entre em contato conosco
          </Typography>
          <Typography variant="body1" gutterBottom>
            Estamos aqui para ajudar! Se você tiver alguma dúvida, sugestão, ou desejar fazer alguma contribuição para melhorar nosso serviço e ajudar as vítimas da enchente, por favor, não hesite em nos contatar, nosso email é administrador@doacoesrs.com.br
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <img src="https://www.estado.rs.gov.br/upload/recortes/201707/20075647_1210628_GDO.jpg" alt="Bandeira do Rio Grande do Sul" style={{ maxWidth: '200px', height: 'auto' }} />
          </Box>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Estamos constantemente trabalhando para melhorar nossos serviços e sua opinião é muito importante para nós. Agradecemos antecipadamente por entrar em contato!
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Contact;
