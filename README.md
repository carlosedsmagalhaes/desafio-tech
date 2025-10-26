# 📜 Desafio-Tech

O **desafio-tech** é um repositório simples que aborda os conceitos básicos de uma aplicação web.  
Nele foram implementados **3 CRUDs**: **usuário**, **cliente** e **venda**.

---

## 📌 Problema

Você deve desenvolver uma aplicação que contenha:

- Uma tela de login para autenticação de usuários:
  - **Opção 1:** Login tradicional por email e senha;
  - **Opção 2:** Login via OAuth (Google, GitHub ou outro provedor de sua escolha).
- Um **CRUD de usuários** (criar, listar, atualizar e excluir);
- Um **CRUD de clientes** (criar, listar, atualizar e excluir);
- Um **CRUD de vendas** (criar, listar, atualizar e excluir), onde cada venda deve estar vinculada a um cliente.

---

## 💡 Solução

A aplicação foi desenvolvida em **JavaScript**, utilizando **Express** e a ORM **Sequelize** para gerenciamento da base de dados.  
O **Sequelize** facilita operações como inserções, consultas, atualizações e remoções, tornando o código mais limpo e garantindo portabilidade entre diferentes bancos de dados.

A estrutura das tabelas está localizada em **`./src/models`**.  
Os **controllers** foram criados para abstrair as entidades definidas nos *models* e realizar as operações necessárias (**create**, **read**, **update** e **delete**).  

As **APIs REST** estão definidas em **`./src/routes`** e centralizadas no arquivo **`server.js`**.  
Essas rotas podem ser acessadas pelo frontend — como no formulário de login — ou testadas via **Postman**, utilizando o arquivo **`./docs/routes.json`**.

---

## 🔗 Estrutura de comunicação

A aplicação segue uma **arquitetura cliente-servidor**, onde o **frontend** atua como cliente que consome as **APIs REST** do **backend**, e este intermedia a comunicação com o **banco de dados** por meio da ORM **Sequelize**.

A comunicação entre **frontend**, **backend** e **banco de dados** foi estruturada priorizando o backend.

O **frontend** contém apenas um formulário de login, responsável por enviar as credenciais ao backend via **requisição HTTP POST** em formato **JSON**.  
O **backend**, implementado com **Express** e **Sequelize**, trata as requisições, valida os dados e executa as operações no banco de dados relacional.  

O fluxo de comunicação é o seguinte:

1. O usuário preenche o formulário de login (frontend);
2. O frontend envia os dados ao backend via HTTP (JSON);
3. O backend valida e executa as operações via Sequelize;
4. O Sequelize traduz os comandos para SQL e interage com o banco;
5. O backend retorna uma resposta JSON ao frontend.

As credenciais e configurações estão definidas em variáveis de ambiente utilizando **dotenv**, garantindo segurança e portabilidade.

---

## 🚀 Como executar o projeto

```bash
# Clone este repositório
git clone https://github.com/carlosedsmagalhaes/desafio-tech.git

# Acesse a pasta do projeto
cd desafio-tech

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
