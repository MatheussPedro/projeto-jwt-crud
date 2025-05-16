# Projeto JWT CRUD com Docker

## Descrição

Este projeto é uma API RESTful em Node.js com autenticação JWT, conectada a um banco de dados PostgreSQL, que realiza operações CRUD em uma tabela simples. Além da API, há um frontend básico com telas em HTML/CSS/JS para login e manipulação dos dados via interface.

A API gera tokens JWT com tempo de expiração para autenticação, e as rotas protegidas exigem um token válido para acesso.

---

## Como Rodar o Projeto

1. Certifique-se que Docker e Docker Compose estão instalados.

2. No terminal, na raiz do projeto, rode:

```bash
git clone git@github.com:MatheussPedro/projeto-jwt-crud.git

cd projeto-jwt-crud

docker-compose up --build
```

3. Após os containers subirem:

- Frontend estará disponível em: [http://localhost:8080](http://localhost:8080)
- Banco de dados PostgreSQL estará na porta `5432` (local)

4. Você pode acessar o banco com

```bash
docker exec -it projeto-jwt-crud-db-1 psql -U postgres -d projeto_jwt
```

---

## Como Testar o Login

- Envie uma requisição POST para `http://localhost:3000/login` com JSON no corpo:
- ou faça login pelo front.

```json
{
  "email": "teste@teste.com",
  "password": "123456"
}
```

---

## Medidas de Segurança Implementadas

- Autenticação via JWT com expiração
- Validação de token em rotas protegidas (middleware)

---

## Estrutura do Banco

Tabela: `Tasks`

| Campo     | Tipo                    | Descrição           |
| --------- | ----------------------- | ------------------- |
| id        | BIGSERIAL (primary key) | Identificador único |
| title     | VARCHAR(255)            | Título da tarefa    |
| userId    | INTEGER                 | ID do usuário       |
| createdAt | TIMESTAMP WITH TIME ZONE| Criação             |
| updatedAt | TIMESTAMP WITH TIME ZONE| Atualização         |

