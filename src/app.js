const express = require('express');
const nunjucks = require('nunjucks');
const axios = require('axios');

const fb_token = 'EAAOIkfok98oBO0j1zO5hQLmwNfVjBEbcua8diKQAWHaa3U7HcETEiTca4Gh498ltFbPKssbA3LLXB1FhK1eXUh2cNvCimKnr0Xevhcneo5WnEi38EQDUjT7WDwrgrf4SGf8gHYvWQNTqXWPVOVTwEeGoVaTRWyYGQFGJWUOfhi7d2nvBTvlI4up8DbBNrVUjgmIjBGZBjBNHqHgZDZD'

const app = express();
const port = 3000;

app.use(express.static('public'));
app.set('view engine', 'njk');

nunjucks.configure('src/views', {
  autoescape: true,
  express: app,
});

// Rota principal
app.get('/', (req, res) => {
  // Aqui você deve implementar a lógica para obter a lista de contas do Facebook Ads
  let accounts = []; // Variável para armazenar os dados

  axios.get(`https://graph.facebook.com/v18.0/196378719691847?fields=id%2Cname%2Cclient_ad_accounts%7Bname%7D&access_token=${fb_token}`)
    .then((response) => {
      const data = response.data;
      dataArray = data.client_ad_accounts.data; // Armazena os dados na variável
      
      // accounts = dataArray.map((item) => item.name);

      // e passá-la para a renderização da página
      res.render('index.njk', { accounts: dataArray });
    })
    .catch((error) => {
      console.error('Erro na requisição:', error);
    });
});

// Rota para obter campanhas de uma conta específica
app.get('/campanhas/:contaId', async (req, res) => {
  const { contaId } = req.params;

  try {
    // Aqui você deve implementar a lógica para fazer uma requisição à API do Facebook Ads
    // para obter as campanhas da conta especificada
    const response = await axios.get(`https://graph.facebook.com/v18.0/${contaId}?fields=name%2Ccampaigns%7Bname%2Cinsights%7Bcpc%2Ccpm%2Cctr%2Cimpressions%2Cclicks%2Cspend%7D%7D&access_token=${fb_token}`);

    const data = response.data;
    campanhas = data.campaigns.data; 
    console.log(campanhas)
    // Supondo que o formato da resposta seja JSON
    res.json(campanhas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter campanhas.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});
