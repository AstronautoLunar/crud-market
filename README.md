<h1 align="center">CRUD-market</h1>

<p align="center">Um back-end para gerenciamento de produtos de mercado</p>

* [Sobre](#Sobre)
* [Pre Requisitos](#Pre-requisitos)
* [Como usar](#Como-user)
  * [GET](#GET)
  * [POST](#POST)
  * [PUT](#PUT)
  * [DELETE](#DELETE)
* [Tecnologias](#Tecnologias)

<h4 align="center">
 :construction: Em construção :construction:
</h4>

## Sobre
Mais um projeto pratico sem fins lucrativos, como todo projeto meu como esse não irei dar deploy, apenas fiz para estudos e aperfeiçoamento de minhas habilidades
em back-end, Fique livre para explorar e estudar meu código, criticas são bem vindas e contribuições também 

Esse projeto gerencia dados de produtos de supermercado, Fiz tratamento de error tentei deixar o código o mais limpo possível

## Pre Requisitos
Você vai precisar do node.js instalado em sua máquina, segue o link da instalação

- [Nodejs](https://nodejs.org/en/download/)

e também precisará instalar um gerenciador de pacotes

- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable);

Copie e cole no seu GIT

```
  git clone https://github.com/Pyedrown/crud-market.git
```
e em seguida use

```
  cd crud-market
```

## Como usar

Entre na pasta do projeto através do terminal e execute o seguinte comando

```
  yarn serve
```

O servidor possui ao todo 5 endpoints, sendo 1 get, 1 post, 2 put, 1 delete

### GET 

```
  localhost:4444/api/getAllProducts
```

Retorna um json com os dados da api

Os dados serão retornados no seguinte formato:

<pre>
{
  "products": [
        {
            "id": "fdsaçjflsafhusaof",
            "name": "Manteiga",
            "brand": "BomDemais",
            "price": 5.99,
            "shelfLive": 1
        },
    ]
}
</pre>

- id: 
    - tipo: string
    - definição: identificador da tarefa

- name:
  - tipo: string,
  - definição: Armazena o nome do produto
  
- brand:
  - tipo: string,
  - definição: Armazena a marca do produto
  
- price:
  - tipo: number
  - definição: Armazena o preço do produto

- shelfLive:
  - tipo: number
  - definição: Armazena o ciclo de vida do produto em anos

### POST

```
localhost:4444/api/sendProduct
```

Envia para o servidor o produto no formato de json com a seguinte estrutura:

<pre>
{
  "name": "Frango",
  "brand": "BomDemais",
  "price": 1.99,
  "shelfLive": 0.2
}
</pre>

### PUT

Fiz duas rotas do tipo put para resolver problemas diferentes

A rota para modificar o produto todo é esse:

```
localhost:4444/api/modifyProduct
```

envia no formato json com a seguinte estrutura:

<pre>
{
  "id": "4792014701740104",
  "name": "Batata",
  "brand": "BomDemais",
  "price": 2,
  "shelfLive": 1
}
</pre>

Já a outra rota é usada para alterar propriedades especificas do objeto de produto

```
localhost:4444/api/modifyProductSpecific/:<propriedade do produto>
```

Somente será permitidos as seguintes propriedades para modificação

```
name
brand
price
shelfLive
```

Fora deles o servidor vai retornar uma resposta com status 500 indicando que o tipo é invalido, ainda
vai ser feito modificações para alterar esse tipo de resposta, pois ela faz com que o servidor pare de funcionar
e não é isso que queremos que aconteça

Caso queira modificar o "name" do produto em especifico, você envia da seguinte maneira:

<pre>
{
  "id": "4792014701740104",
  "name": "Bom Demais"
}
</pre>

Na URL:

<pre>
 localhost:4444/api/modifyProductSpecific/name
</pre>

Isso vale para as outras opção, troque "name" por outro parâmetro e pegue o id do produto e adicione a mesma propriedade escolhida nos parâmetros da url

### DELETE

```
  localhost:4444/api/deleteProduct
```

Deleta o produto, envia em formato json com a seguinte estrutura:

<pre>
{
  "id": "4792014701740104"
}
</pre>

## Tecnologias

- [Typescript](https://www.typescriptlang.org)
- [Expressjs](https://expressjs.com/pt-br/)
