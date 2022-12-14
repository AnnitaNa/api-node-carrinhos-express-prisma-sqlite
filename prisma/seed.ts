import { PrismaClient } from '@prisma/client'
import { v4 } from "uuid";

const prisma = new PrismaClient()

const product1Id = v4();
const product2Id = v4();


async function main() {

//*******************************************************************
//************************** PRODUCTS *******************************
//*******************************************************************

  await prisma.product.upsert({
    where: { description: 'product 01' },
    update: {},
    create: {
      id: product1Id,
      description: 'product 01',
      price: 150,
      brand: 'brand 01',
      qtd: 3
    }
  })

  await prisma.product.upsert({
    where: { description: 'product 02' },
    update: {},
    create: {
      id: product2Id,
      description: 'product 02',
      price: 15,
      brand: 'brand 02',
      qtd: 10
    }
  })

//*******************************************************************
//************************** USER ***********************************
//*******************************************************************

  await prisma.user.upsert({
    where: { userName: 'user 01' },
    update: {},
    create: {
      userName: 'user 01',
      email: 'user01@email.com',
      password: '123',
      carts: {
        create: {
          id: v4(),
          total: 120,
          items: {
            create: [
              {
                id: v4(),
                productId: product1Id,
                qtd: 1
              },
              {
                id: v4(),
                productId: product2Id,
                qtd: 10
              }
            ]
          }
        }
      }
    },
  })

 

  // await prisma.user.upsert({
  //   where: { userName: 'user 02' },
  //   update: {},
  //   create: {
  //     userName: 'user 02',
  //     email: 'user02@email.com',
  //     password: '123'
  //   },
  // })

  // PRODUCTS


  // await prisma.product.upsert({
  //   where: { email: 'bob@prisma.io' },
  //   update: {},
  //   create: {
  //     email: 'bob@prisma.io',
  //     name: 'Bob',
  //     posts: {
  //       create: [
  //         {
  //           title: 'Follow Prisma on Twitter',
  //           content: 'https://twitter.com/prisma',
  //           published: true,
  //         },
  //         {
  //           title: 'Follow Nexus on Twitter',
  //           content: 'https://twitter.com/nexusgql',
  //           published: true,
  //         },
  //       ],
  //     },
  //   },
  // })
 
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })