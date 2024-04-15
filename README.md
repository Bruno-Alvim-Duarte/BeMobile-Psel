# Teste Técnico BeMobile

Esse projeto que desenvolvi pra um teste técnico da empresa BeMobile. Nesse projeto utilizei  AdonisJS (NodeJS), Typescript, Docker, MySQL, Lucid entre outras tecnologias.

Trata-se de uma aplicação backend API RESTful sendo possível cadastrar e fazer login de usuários. Uma vez logados o usuário ganha acesso ao CRUD de Clientes, Produtos e Vendas. 

## Tutorial de instalação
### Clone o repositório
    git clone git@github.com:Bruno-Alvim-Duarte/BeMobile-Psel.git
### Vá para pasta da aplicação
    cd BeMobile-Psel
###  Rodar os container Docker da aplicação
    docker compose up -d --build
###  Rodar a migration dentro da aplicação backend (migration é o que criará as tabelas do banco)
    docker exec -it beMobile-backend sh
    node ace migration:run


## Documentação da API
## Login
####  Rota para cadastrar um usuário

    POST /signup
Exemplo de body:

    {
      "email": "bruno@gmail.com",
      "senha": "123456"
    }
Exemplo de resposta: 

    {
	  "email": "bruno@gmail.com",
	  "senha": "$scrypt$n=16384,r=8,p=1$+JSFJnqPimCvRwCUELiJZA$T9Fu1m34/C4dGBYdxXm9xElSzzu1kYcLOPdt/g1dznFIJBMLdKTT/Qoio8obDLDQNDNnCUEwANCNf7Vbs0W06A",
	  "id": 1
	}

#### Rota para fazer login

    POST /login
   
Exemplo de body:

    {
      "email": "bruno@gmail.com",
      "senha": "123456"
    }
Exemplo de resposta:

    {
	  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJydW5vQGdtYWlsLmNvbSIsImlhdCI6MTcxMzA5MjM2Nn0.tHznszg1wW4B72eVOo8Ly09y1gW1YboqQw-cR-y8GZQ"
	}

>#### A partir daqui todas as rotas exigem autorização com o token JWT o header das requisições precisará ter:
> ##### Header:
 
	 {
	  Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJydW5vQGdtYWlsLmNvbSIsImlhdCI6MTcxMzA5MjM2Nn0.tHznszg1wW4B72eVOo8Ly09y1gW1YboqQw-cR-y8GZQ
	 }

## Clientes

#### Rota para registrar um cliente

    POST /clientes/store
Exemplo de body:

    {
	  "nome": "bruno",
	  "cpf": "12345678931",
	  "telefone": "21984725062",
	  "rua": "rua do arquiteto",
	  "numero": 10,
	  "bairro": "Caxias",
	  "cidade": "Rio",
	  "estado": "Rio",
	  "cep": "22601796"
	}
Exemplo de resposta:

    {
	  "id": 2,
	  "nome": "bruno",
	  "cpf": "12345678931",
	  "telefones": [
	    {
	      "id": 2,
	      "numero": "21984725062",
	      "clienteId": 2
	    }
       ],
	  "endereco": {
		"id": 2,
	    "rua": "rua do arquiteto",
	    "numero": 10,
	    "bairro": "Caxias",
	    "cidade": "Rio",
	    "estado": "Rio",
	    "cep": "22601796",
	    "clienteId": 2
		}
	}

#### Rota para visualizar todos os clientes registrados

    GET /clientes

##### Exemplo de Response:

    [
	  {
	    "id": 1,
	    "nome": "bruno",
	    "cpf": "12345678931"
	  }
	]

#### Rota para visualizar detalhadamente e as vendas de um cliente

> OBS: Nessa rota você pode passar um ano e um mês para filtrar as vendas que o cliente participou por essa data 

    GET /clientes/show/id/?ano=2004&mes=08

##### Exemplo de Response:

    {
	  "id": 1,
	  "nome": "bruno",
	  "cpf": "12345678931",
	  "telefones": [
	    {
	      "id": 1,
	      "numero": "21984725062",
	      "clienteId": 1
	    }
	  ],
	  "endereco": {
	    "id": 1,
	    "rua": "rua do arquiteto",
	    "numero": 10,
	    "bairro": "Caxias",
	    "cidade": "Rio",
	    "estado": "Rio",
	    "cep": "22601796",
	    "clienteId": 1
	  },
	  "vendas": []
	}
#### Rota para editar os dados de um cliente

    PUT /clientes/update/id
    
##### Exemplo de request:
##### Body:
	
> OBS: todos os campos são opcionais, a aplicação so vai editar os campos que você adicionar, e no caso do telefone ela vai adicionar um novo telefone

    {
	  "nome": "bruno",
	  "telefone": "21984725663",
	  "rua": "rua do engenheiro",
	  "numero": 2,
	  "bairro": "Caxias",
	  "cidade": "Niteroi",
	  "estado": "Rio de Janeiro",
	  "cep": "22601797"
	}

##### Exemplo de Resposta:

    {
	  "id": 1,
	  "nome": "bruno",
	  "cpf": "12345678931",
	  "telefones": [
	    {
	      "id": 1,
	      "numero": "21984725062",
	      "clienteId": 1
	    },
	    {
	      "id": 2,
	      "numero": "21984725663",
	      "clienteId": 1
	    }
	  ],
	  "endereco": {
	    "id": 1,
	    "rua": "rua do engenheiro",
	    "numero": 2,
	    "bairro": "Caxias",
	    "cidade": "Niteroi",
	    "estado": "Rio de Janeiro",
	    "cep": "22601797",
	    "clienteId": 1
	  }
	}
	
#### Rota para deletar um cliente

    DELETE /clientes/delete/1
##### Exemplo de resposta:

    204: No content
    
## Categorias
    
#### Rota para criar uma categoria de produto

    POST /categorias/store
##### Exemplo de requisição:

    {
	  "nome": "Cocção Modular"
	}
##### Exemplo de resposta:

    {
	  "nome": "Cocção Modular",
	  "id": 1
	}

#### Rota para visualizar todas as categorias criadas

    GET categorias
##### Exemplo de resposta:
    
	[
	  {
	    "id": 1,
	    "nome": "Cocção Modular"
	  }
	]
## Produtos
#### Rota para criar um produto

    POST /produtos/store
##### Exemplo de requisição:
	{
	  "nome": "Refrigerador Ultimate",
	  (opcional) "descricao": "este é um refrigerador que congela sua comida",
	  "preco": 5.33,
	  "quantidade_em_estoque": 5,
	  (opcional) "imagem_url": "https://media.licdn.com/dms/image/D4D03AQFVSlXBP_-udw/profile-displayphoto-shrink_800_800/0/1670523170262?e=1718841600&v=beta&t=Nv0THpQgfYIQ7Qvg-PjeXwPH7Qlc343U1F27AocVvM4",
	 (opcional) "categorias_ids": [1]
	}
##### Exemplo de resposta:
	[
	  {
	    "id": 5,
	    "nome": "Refrigerador Ultimate",
	    "descricao": "este é um refrigerador que congela sua comida",
	    "preco": 5.33,
	    "quantidadeEmEstoque": 5,
	    "imagemUrl": "https://media.licdn.com/dms/image/D4D03AQFVSlXBP_-udw/profile-displayphoto-shrink_800_800/0/1670523170262?e=1718841600&v=beta&t=Nv0THpQgfYIQ7Qvg-PjeXwPH7Qlc343U1F27AocVvM4",
	    "categorias": [
	      {
	        "id": 1,
	        "nome": "Cocção Modular"
	      }
	    ]
	  }
	]
#### Rota para visualizar todos os produtos cadastrados (sem detalhes)

    GET produtos
##### Exemplo de resposta:
	[
		{
		    "id": 5,
		    "preco": 5.33,
		    "nome": "Refrigerador Ultimate"
	     },
	]
#### Rota para visualizar um produto detalhadamente
	GET /produtos/show/id
##### Exemplo de resposta:
	[
	  {
	    "id": 5,
	    "nome": "Refrigerador Ultimate",
	    "descricao": "este é um refrigerador que congela sua comida",
	    "preco": 5.33,
	    "quantidadeEmEstoque": 5,
	    "imagemUrl": "https://media.licdn.com/dms/image/D4D03AQFVSlXBP_-udw/profile-displayphoto-shrink_800_800/0/1670523170262?e=1718841600&v=beta&t=Nv0THpQgfYIQ7Qvg-PjeXwPH7Qlc343U1F27AocVvM4",
	    "categorias": [
	      {
	        "id": 1,
	        "nome": "Cocção Modular"
	      }
	    ]
	  }
	]
#### Rota para atualização de dados de um produto
	PUT produtos/update/id
##### Exemplo de Requisição:
> OBS: todos os campos são opcionais, a aplicação so vai editar os campos que você adicionar
>OBS 2: o campo de categorias_ids, vai substituir as categorias do produto pelas categorias que você mandar na requisição

	{
	  "nome": "Refrigerador Ultimate Atualizado",
	  "descricao": "este é um refrigerador que congela sua comida rapidamente",
	  "preco": 10.30,
	  "quantidade_em_estoque": 2,
	  "imagem_url": "https://urldiferente.com",
	  "categorias_ids": [1,2]
	}

##### Exemplo de Resposta:
	[
	  {
	    "id": 5,
	    "nome": "Refrigerador Ultimate Atualizado",
	    "descricao": "este é um refrigerador que congela sua comida rapidamente",
	    "preco": 10.3,
	    "quantidadeEmEstoque": 2,
	    "imagemUrl": "https://urldiferente.com",
	    "categorias": [
	      {
	        "id": 1,
	        "nome": "Cocção Modular"
	      },
	      {
	        "id": 2,
	        "nome": "Refrigeração"
	      }
	    ]
	  }
	]
	
#### Rota para deletar  um produto (Soft Delete)

    DELETE produtos/delete/id

##### Exemplo de Resposta:

    204: No Content
## Vendas

#### Rota para criar uma venda
##### Exemplo de requisição:
	{
	  "cliente_id": 1,
	  "produto_id": 5,
	  "quantidade": 3
	}

##### Exemplo de resposta:
	{
	  "clienteId": 1,
	  "produtoId": 5,
	  "quantidade": 3,
	  "precoUnitario": 10.3,
	  "precoTotal": 30.9,
	  "createdAt": "2024-04-15T15:24:14.732+00:00",
	  "updatedAt": "2024-04-15T15:24:14.733+00:00",
	  "id": 1
	}
