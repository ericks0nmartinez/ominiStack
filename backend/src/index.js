const express = require('express');
const cors = require('cors');
const routes = require('./routes');


const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);

/* rota / recursos */
/*
Get: Buscar uma infomação do back-end
POST: Criar uma informação no back-end
PUT: Alterar um informação no back-end
DELETE: Deletar uma informação no back-end
*/

/*
Tipos de Parametros

Query: Parametros nomeados enviados na rota aós a "?"
(Filtros e paginação)

Route Params: PArametros para identificar recursos

Request Body: Corpo da requisição, utilizando para criar
ou alterar recursos 
*/



app.listen(3333);
