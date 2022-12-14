# what to do

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
