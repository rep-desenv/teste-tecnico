# Teste Técnico

🧪 Teste Técnico – Desenvolvedor PHP
Objetivo: 

Desenvolver um sistema web simples de cadastro de Produtos e Categorias, contendo dois módulos com operações completas de CRUD (Create, Read, Update, Delete) para ambas as entidades.

✅ Requisitos Funcionais:
CRUD de Categorias
Criar, listar, editar e excluir categorias.
Cada categoria deve conter:
id (gerado automaticamente)
nome (obrigatório)
CRUD de Produtos
Criar, listar, editar e excluir produtos.
Cada produto deve conter:
id (gerado automaticamente)
nome (obrigatório)
preço (obrigatório)
categoria (selecionada entre as categorias cadastradas)
Relacionamento
Ao cadastrar ou editar um produto, o sistema deve permitir selecionar uma categoria existente (ex.: via dropdown)
📦 Entrega:
O código deve ser entregue em um repositório no GitHub ou compactado (.zip/.rar).
Incluir um arquivo README.md com:
Instruções para executar o projeto localmente
Estrutura do banco de dados (ou migrations, se houver)
Tecnologias utilizadas

## BECKEND

### `Instalação e execução`

1 - Descocompactar a pasta com os arquivos;

2 - No terminal de comando, navegar até a pasta ./backend

3 - Executar o comando:

    npm install

4 - ajustar o arquivo ".env_template" com as credenciais do banco de dados utilizado;

    DATABASE_URL="mysql://user:psw@host:port/bd_name"

5 - Renomear o arquivo alterado no passo anterior para:

    .env

5 - Executar o migrate do ORM Prisma através do seu terminal posicionado na raiz da pasta beckend:

    npx prisma init                         => utilizado para inicializar o prisma (criando a estutura, pasta ./prima e arquivo schema.prisma)
    npx prisma migrate dev --name init      => executar migrate sempre que o modelo for alterado ./prisma/schema.prisma
    npx prisma generate --sql               => gerar o client prisma (schema e comandos sql da pasta ./prisma/sql cada vez que for criado uma nova consulta)

5 - Startar o backend

    npm run dev

### `Estrutura do banco de dados`

-- CreateTable
CREATE TABLE `Categorias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `nome` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Categorias_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produtos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `preco` DOUBLE NOT NULL,
    `categoriaId` INTEGER NOT NULL,

    UNIQUE INDEX `Produtos_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Produtos` ADD CONSTRAINT `Produtos_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

### `Tecnologias`

"axios": "^1.9.0",
"body-parser": "^1.20.3",
"cors": "^2.8.5",
"dotenv": "^16.5.0",
"express": "^4.21.2",
"http-status-codes": "^2.3.0",
"react-router-dom": "^7.6.0"
"prisma": "^6.8.2"
"typescript": "^5.8.3"



## FRONTEND

### `Instalação`

1 - Descocompactar a pasta com os arquivos;

2 - No terminal de comando, navegar até a pasta ./frontend

3 - Executar o comando:

    npm install

4 - Após o start do backend executar o comando para startar a aplicação frontend

    npm start


### `Tecnologias`
    
    "axios": "^1.9.0"
    "bootstrap": "^5.3.6"
    "react": "^19.1.0"
    "react-dom": "^19.1.0"
    "react-router-dom": "^7.6.0"
    "react-scripts": "5.0.1"