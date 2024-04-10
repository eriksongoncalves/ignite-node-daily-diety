# IGNITE - CHALLENGE DAILY DIETY - REST

Nesse desafio desenvolveremos uma API para controle de dieta diária, a Daily Diet API.

### Regras da aplicação

- [x] - Deve ser possível criar um usuário
    <br >
- [x] - Deve ser possível identificar o usuário entre as requisições
    <br >
- [x] - Deve ser possível registrar uma refeição feita, com as seguintes informações:
    <br >
    `As refeições devem ser relacionadas a um usuário.`

- Nome
- Descrição
- Data e Hora
- Está dentro ou não da dieta

<br >
- [ ] - Deve ser possível editar uma refeição, podendo alterar todos os dados acima<br >
- [ ] - Deve ser possível apagar uma refeição<br >
- [ ] - Deve ser possível listar todas as refeições de um usuário<br >
- [ ] - Deve ser possível visualizar uma única refeição<br >
- [ ] - Deve ser possível recuperar as métricas de um usuário<br >

- Quantidade total de refeições registradas
- Quantidade total de refeições dentro da dieta
- Quantidade total de refeições fora da dieta
- Melhor sequência de refeições dentro da dieta
  <br >

[] - O usuário só pode visualizar, editar e apagar as refeições o qual ele criou <br >

## Instalação

Duplique e renomeie o arquivo `.env.example` para `.env`

```sh
  npm install
  npm run knex -- migrate:latest
```

## Executando a aplicação

Execute o comando abaixo para inicializar:

```sh
  npm run start
```
