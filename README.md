# Project

> projeto final de oi devs
>
> Carrinho de compras utilizando node, express, prisma and postgres


## Dependencies
To run it, you need:
* docker installed on your computer
  
## How to run

```bash
docker compose up
```

## install

```bash
npm i express
```

```bash
npm i -D @types/express prisma ts-node-dev typescript
```

Attention! For this one, you don't need to put "type":"module" on package.json -> transpiles automaticalyy to commonJs

## prisma

To use **PRISMA**

```bash
npm i @prisma/client express
```

```bash
npm i -D  prisma
```

it will generate a schema.prisma file

everytime you change anything on schema.prisma file, you need to run the code below to update prisma client

```bash
npx prisma generate
```
after creating your schema, run to push it to the database

```bash
npx prisma db push
```

migration and seeders

1) create a seeder file inside prisma folder
2) on package.json add:
   
```json
"prisma": {
    "seed": "ts-node prisma/seed.ts"
},
```

when you migrate for the first time, it will also seed your database

```bash
npx prisma migrate dev --name migration-name
```

or you can seed it manually using:

```bash
npx prisma db seed
```