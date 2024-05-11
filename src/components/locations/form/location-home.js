import React from 'react';
import { Container, Typography, Button, Card, CardContent, Box, CardMedia } from '@mui/material';
import Carousel from 'react-material-ui-carousel'

function Home() {
  // Array de objetos com as informações das fotos
  const photos = [
    { image: 'https://s2-g1.glbimg.com/EwScC4yKACnT7w0oe8Hz58-_GRU=/0x0:4000x2250/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2024/9/Y/ziwIyiS7O2H5RtKsKzyQ/des20240506019.jpg', link: 'https://s2-g1.glbimg.com/EwScC4yKACnT7w0oe8Hz58-_GRU=/0x0:4000x2250/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2024/9/Y/ziwIyiS7O2H5RtKsKzyQ/des20240506019.jpg' },
    { image: 'https://s2-g1.glbimg.com/SEDoGFgGz-yDIWZcS4guCQof8GA=/0x184:1024x760/1080x608/smart/filters:max_age(3600)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2024/n/w/bMtv26QlGiKs7Vd5XZRQ/000-34r66ud.jpg', link: 'https://s2-g1.glbimg.com/SEDoGFgGz-yDIWZcS4guCQof8GA=/0x184:1024x760/1080x608/smart/filters:max_age(3600)/https://i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2024/n/w/bMtv26QlGiKs7Vd5XZRQ/000-34r66ud.jpg' },
    { image: 'https://s2-g1.glbimg.com/zYzp4F_0_9zrUKTizKEande223Q=/0x0:1700x1065/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2024/p/m/7O4e3TQt6CDKZHyDXfEw/fotojet-2024-05-08t090100.780.jpg', link: 'https://s2-g1.glbimg.com/zYzp4F_0_9zrUKTizKEande223Q=/0x0:1700x1065/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2024/p/m/7O4e3TQt6CDKZHyDXfEw/fotojet-2024-05-08t090100.780.jpg' },
    // Adicione mais objetos conforme necessário
  ];

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', marginTop: '50px' }}>
      <Card variant="outlined">
        <CardContent>
          {/* Conteúdo do card */}
          <Typography variant="h4" gutterBottom>
            Bem-vindo ao site de organização de doações para vítimas da enchente no Rio Grande do Sul!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Em momentos de crise, como uma enchente, a solidariedade e a união se tornam ferramentas essenciais para superar os desafios enfrentados pelas comunidades afetadas. Facilitar a integração dos voluntários e organizar as doações desempenha um papel crucial nesse processo de reconstrução e apoio mútuo.

            Ao aproximar as pessoas, criamos um ambiente propício para a colaboração e a troca de recursos.
          </Typography>
          {/* Carrossel de imagens */}
          <Carousel>
            {photos.map((photo, index) => (
              <Card key={index} sx={{ marginBottom: '20px' }}>
                <CardMedia component="img" height="400" image={photo.image} alt={`Foto ${index + 1}`} />
              </Card>
            ))}
          </Carousel>
          <Typography variant="body1" gutterBottom>
          Além disso, a organização eficiente das doações garante que os recursos sejam distribuídos de maneira equitativa e atendam às necessidades reais daqueles que foram afetados pelo desastre. Isso evita desperdícios e maximiza o impacto positivo das contribuições recebidas.

          Nesse contexto, cada voluntário se torna um elo vital na cadeia de ajuda, oferecendo seu tempo, habilidades e recursos para ajudar aqueles que mais precisam.
          </Typography>
          <Typography variant="body1" sx={{ backgroundColor: '#ffe0b2', padding: '12px', borderRadius: '4px', marginBottom: '16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', }}>
            É importante ressaltar que não temos responsabilidade sobre o conteúdo das doações e nem sobre os locais de doações, uma vez que o cadastro é público. Nesse momento, estamos apenas facilitando a conexão entre quem quer doar e quem precisa de doações.
          </Typography>
          <Box mt={2}>
            <Button variant="contained" color="primary" href="/locaisdoacao">
              Encontre locais para doar
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Home;
