const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const hashedPasswordAdmin = await bcrypt.hash('admin-password', 10);
  const hashedPasswordClient = await bcrypt.hash('client-password', 10);

  // Create customers
  await prisma.customer.createMany({
    data: [
      {
        id: 1,
        email: 'admin@example.com',
        nom: 'Admin User',
        role: 'admin',
        phone: '1234567890',  // Add a phone number if needed
        password: hashedPasswordAdmin,  // Use hashed password
      },
      {
        id: 2,
        email: 'client@example.com',
        nom: 'Client User',
        role: 'client',
        phone: '0987654321',  // Add a phone number if needed
        password: hashedPasswordClient,  // Use hashed password
      },
    ],
  });

  // Create products
  await prisma.product.createMany({
    data: [
      {
        id: 1,
        nom: 'WIND FLAG',
        description: 'Description of WIND FLAG',
        image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
        prix: 100.0,
        type: ['Courbé', 'Droit','Incliné','Rectangulaire'],
        base: ['Water', 'Beton','Metal 7kg','Metal 7.5kg','Metal 10kg'],
        taille: ['2m50', '2m80', '3m20','3m80'],
        barre: ['Metalique', 'Non Metalique'],
      },
      {
        id: 2,
        nom: 'STAND PARAPLUIE',
        description: 'Description of STAND PARAPLUIE',
        image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
        prix: 200.0,
        type: ['Plat', 'Curve'],
        base: [''],
        taille: ['1x3', '2x3','3x3','4x3'],
        barre: [''],
      },
      {
        id: 3,
        nom: 'STAND MODULAIRE',
        description: 'Description of STAND MODULAIRE',
        image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
        prix: 300.0,
        type: [''],
        base: [''],
        taille: [''],
        barre: [''],
      },
    ],
  });

  // Create orders with selected values from the Product arrays
  await prisma.order.createMany({
    data: [
      {
        id: 1,
        status: 'attente',
        image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
        qty: 2,
        email: 'client@example.com',
        name: 'Client User',
        productId: 1,
        selectedType: 'Courbé', // Client-selected value
        selectedBase: 'Water', // Client-selected value
        selectedTaille: '2m50', // Client-selected value
        selectedBarre: 'Metalique', // Client-selected value
      },
      {
        id: 2,
        status: 'attente',
        image: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
        qty: 1,
        email: 'client@example.com',
        name: 'Client User',
        productId: 2,
        selectedType: 'Plat', // Client-selected value
        selectedBase: '', // Client-selected value
        selectedTaille: '1x3', // Client-selected value
        selectedBarre: '', // Client-selected value
      },
    ],
  });

  console.log("Seeding complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
