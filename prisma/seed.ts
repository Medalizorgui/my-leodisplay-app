const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const hashedPasswordAdmin = await bcrypt.hash('Medalizordui', 10);
  const hashedPasswordClient = await bcrypt.hash('Medalizorgui', 10);

  // Create customers
  await prisma.customer.createMany({
    data: [
      {
        email: 'zorguimohamedali25@gmail.com',
        nom: 'dali',
        role: 'admin',
        phone: '1234567890',
        password: hashedPasswordAdmin,
      },
      {
        email: 'client@example.com',
        nom: 'Client User',
        role: 'client',
        phone: '0987654321',
        password: hashedPasswordClient,
      },
    ],
  });

  // Create products
  const products = await prisma.product.createMany({
    data: [
      {
        nom: 'WIND FLAG',
        description: 'Description of WIND FLAG',
        image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
        prix: '100.0',
        type: ['Courbé', 'Droit', 'Incliné', 'Rectangulaire'],
        barre: ['Metalique', 'Non Metalique'],
      },
      {
        nom: 'STAND PARAPLUIE',
        description: 'Description of STAND PARAPLUIE',
        image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
        prix: '200.0',
        type: ['Plat', 'Curve'],
        barre: [],
      },
      {
        nom: 'STAND MODULAIRE',
        description: 'Description of STAND MODULAIRE',
        image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
        prix: '300.0',
        type: [],
        barre: [],
      },
    ],
  });

  // Get product IDs for relational inserts
  const windFlag = await prisma.product.findUnique({ where: { nom: 'WIND FLAG' } });
  const standParapluie = await prisma.product.findUnique({ where: { nom: 'STAND PARAPLUIE' } });

  // Create bases
  const bases = await prisma.base.createMany({
    data: [
      { name: 'Water', price: 20.0, productId: windFlag.id, image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp' },
      { name: 'Beton', price: 25.0, productId: windFlag.id, image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp' },
      { name: 'Platine Metalique', price: 25.0, productId: windFlag.id, image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp' },
    ],
  });

  // Create tailles
  const tailles = await prisma.taille.createMany({
    data: [
      { name: '2m50', price: 10.0, productId: windFlag.id, image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp' },
      { name: '2m80', price: 10.0, productId: windFlag.id, image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp' },
      { name: '3m20', price: 10.0, productId: windFlag.id, image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp' },
      { name: '3m80', price: 10.0, productId: windFlag.id, image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp' },
      { name: '4m50', price: 10.0, productId: windFlag.id, image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp' },
      { name: '5m00', price: 10.0, productId: windFlag.id, image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp' },
      { name: '1x3', price: 50.0, productId: standParapluie.id, image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp' },
      { name: '2x3', price: 50.0, productId: standParapluie.id, image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp' },
      { name: '3x3', price: 50.0, productId: standParapluie.id, image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp' },
      { name: '4x3', price: 50.0, productId: standParapluie.id, image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp' },
    ],
  });

  // Create orders
  await prisma.order.createMany({
    data: [
      {
        orderGroupId: 1,
        status: 'attente',
        image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
        qty: 2,
        email: 'client@example.com',
        name: 'Client User',
        productNom: 'WIND FLAG',
        selectedType: 'Courbé',
        selectedBaseName: 'Water',
        baseQuantity: 1,
        selectedTailleName: '2m50',
        tailleQuantity: 2,
        selectedBarre: 'Metalique',
      },
    ],
  });

  console.log('Seeding complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
