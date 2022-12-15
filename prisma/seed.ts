import { PrismaClient } from '@prisma/client'
import { v4 } from "uuid";

const prisma = new PrismaClient()

const product1Id = 'fbfb89f4-ede8-4c12-a37b-69e043dd8194';
const product2Id = '2134a357-1a0d-4294-b74a-940537ae6b4d';


async function seedProduct() {
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

}

async function seedUser() {
  
  await prisma.user.upsert({
    where: { userName: 'user 01' },
    update: {},
    create: {
      userName: 'user 01',
      email: 'user01@email.com',
      password: '123',
      carts: {
        create: { //cart
          id: v4(),
          total: 120,
          items: {
            create: [ //cartItems
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

}

async function main() {

  await seedProduct();
  await seedUser();

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