# :computer: API de Livros e Autores - Node.js, Express e MongoDB
Este projeto é uma API RESTful desenvolvida em Node.js utilizando o framework Express e banco de dados não relacional MongoDB. O objetivo é gerenciar um catálogo de livros e autores, permitindo operações de CRUD, filtros avançados e paginação.

## :hammer_and_wrench: Funcionalidades
- CRUD de Livros: cadastrar, listar, buscar por ID, atualizar e remover livros.
- CRUD de Autores: cadastrar, listar, buscar por ID, atualizar e remover autores.
- Filtros Avançados: busca de livros por editora, título (com regex), quantidade de páginas (intervalos), e nome do autor.
- Paginação: todas as listagens suportam paginação, ordenação e limite de resultados.
- Validações: validação de campos obrigatórios, valores permitidos e mensagens de erro customizadas.
- População de Dados: os dados de autor são populados automaticamente nos resultados dos livros.
- Tratamento de Erros: middleware global para tratamento de erros e respostas padronizadas.

## :rocket: Principais Processos
### 1. Conexão com o MongoDB
- Configurada em dbConnect.js usando Mongoose.
- String de conexão via variável de ambiente.
### 2. Modelagem dos Dados
- **Autor:** nome e nacionalidade.
- **Livro:** título, autor (referência), editora, número de páginas.
- Validações customizadas e uso do plugin mongoose-autopopulate.
### 3. Rotas
- Definidas em routes.
- Rotas para livros e autores, incluindo filtros e paginação.
### 4. Controllers
- Lógica de negócio separada em controllers.
- Métodos assíncronos para cada operação.
- Busca por filtros avançados em livros (editora, título, páginas, autor).
- Utilização de operadores nativos do mongoose como $gte e $lte, no filtro de livros por número de páginas e $regex para filtrar pelos títulos dos livros.
### 5. Paginação
- Middleware paginar.js permite uso de parâmetros limite, pagina e ordenacao nas requisições GET.
### 6. Validação e Tratamento de Erros
- Validações de campos obrigatórios e valores permitidos nos models.
- Middlewares para tratamento de erros (manipuladorDeErros.js) e rotas não encontradas (manipulador404.js).
### 7. População Automática
- O campo autor em livros é populado automaticamente com os dados do autor.

## :bulb: Exemplos de Uso
- Listar todos os livros (com paginação) >> GET http://localhost:3000/livros?limite=10&pagina=1
- Buscar livros por intervalo de páginas >> GET http://localhost:3000/livros?minPaginas=300&maxPaginas=500
- Buscar livros por editora >> GET http://localhost:3000/livros?editora=Abril
- Buscar livros por nome do autor >> GET http://localhost:3000/livros?nomeAutor=Fulano

## :package: Como rodar o projeto
### 1. Clone o repositório
```
git clone [https://github.com/thitoGuimaraes/API-RESTful-MongoDB.git](https://github.com/thitoGuimaraes/API-RESTful-MongoDB.git)
```
### 2. Instale as dependências
```
npm install
```
### 3. Configure a string de conexão do MongoDB
##### Crie um arquivo .env na raiz do projeto: 
```
STRING_CONEXAO_DB=mongodb://localhost:27017/sua-base
```
### 4. Inicie o servidor
```
npm start
```

## :memo: Contribuição
Livre! Sinta-se à vontade para abrir issues ou pull requests!

## :star2: Origem do projeto
Desenvolvido para fins de estudo com base em cursos da Alura. Gratidão aos queridos Antonio Evaldo e Ju Amoasei pelo conhecimento compartilhado.




