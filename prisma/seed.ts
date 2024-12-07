const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const hashedPasswordAdmin = await bcrypt.hash("Medalizorgui", 10);
  const hashedPasswordClient = await bcrypt.hash("Medalizorgui", 10);

  // Create customers
  await prisma.customer.createMany({
    data: [
      {
        email: "zorguimohamedali25@gmail.com",
        nom: "dali",
        role: "admin",
        phone: "1234567890",
        password: hashedPasswordAdmin,
      },
      {
        email: "client@example.com",
        nom: "Client User",
        role: "client",
        phone: "0987654321",
        password: hashedPasswordClient,
      },
    ],
  });

  // Create products
  const products = await prisma.product.createMany({
    data: [
      {
        nom: "WIND FLAG",
        description: "Description of WIND FLAG",
        image: "/LeoImg/Flags-page-home.png",
        prix: "100.0",
        type: ["Courbé", "Droit", "Incliné", "Rectangulaire"],
        barre: ["Metalique", "Non Metalique"],
      },
      {
        nom: "STAND PARAPLUIE",
        description: "Description of STAND PARAPLUIE",
        image: "/LeoImg/Stand-Parapluie-Pop-Up.png",
        prix: "200.0",
        type: ["Plat", "Curve"],
        barre: [],
      },
      {
        nom: "STAND MODULAIRE",
        description: "Description of STAND MODULAIRE",
        image: "/LeoImg/STAND-MODULAIRE.png",
        prix: "300.0",
        type: [],
        barre: [],
      },
    ],
  });

  // Get product IDs for relational inserts
  const windFlag = await prisma.product.findUnique({
    where: { nom: "WIND FLAG" },
  });
  const standParapluie = await prisma.product.findUnique({
    where: { nom: "STAND PARAPLUIE" },
  });

  // Create bases
  await prisma.base.createMany({
    data: [
      {
        name: "Water",
        price: 20.0,
        productId: windFlag.id,
        image: "/LeoImg/base-a-eau-150x150.png",
      },
      {
        name: "Beton",
        price: 25.0,
        productId: windFlag.id,
        image: "/LeoImg/base-en-beton-leodisplay.png",
      },
      {
        name: "Platine Metalique",
        price: 25.0,
        productId: windFlag.id,
        image: "/LeoImg/platine-metalique-150x150.png",
      },
    ],
  });

  // Create tailles
  await prisma.taille.createMany({
    data: [
      {
        name: "2m50",
        price: 10.0,
        productId: windFlag.id,
        image: "/LeoImg/2m50-300x225-1-150x150.png",
        downloadLinks: [
          '/LeoPdf/Gabarit_Flag-2m50-Courbe.pdf',
          '/LeoPdf/Gabarit_Flag-2m50-Droit.pdf',
          '/LeoPdf/Gabarit_Flag-2m50-Incline.pdf',
        ],
        ficheTechniqueLink: '/LeoPdf/Fiche-technique-Flag-2m50.pdf',
      },
      {
        name: "2m80",
        price: 10.0,
        productId: windFlag.id,
        image: "/LeoImg/2m80-300x225-1-150x150.png",
        downloadLinks: [
          '/LeoPdf/Gabarit_Flag-2m80-Courbe.pdf',
          '/LeoPdf/Gabarit_Flag-2m80-Droit.pdf',
          '/LeoPdf/Gabarit_Flag-2m80-Incline.pdf',
        ],
        ficheTechniqueLink: '/LeoPdf/Fiche-technique-Flag-2m80.pdf',
      },
      {
        name: "3m20",
        price: 10.0,
        productId: windFlag.id,
        image: "/LeoImg/3m20-300x225-1-150x150.png",
        downloadLinks: [
          '/LeoPdf/Gabarit_Flag-3m20-Courbe.pdf',
          '/LeoPdf/Gabarit_Flag-3m20-Droit.pdf',
          '/LeoPdf/Gabarit_Flag-3m20-Incline.pdf',
        ],
        ficheTechniqueLink: '/LeoPdf/Fiche-technique-Flag-3m20.pdf',
      },
      {
        name: "3m80",
        price: 10.0,
        productId: windFlag.id,
        image: "/LeoImg/3m80-300x225-1-150x150.png",
        downloadLinks: [
          '/LeoPdf/Gabarit_Flag-3m80-Courbe.pdf',
          '/LeoPdf/Gabarit_Flag-3m80-Droit.pdf',
          '/LeoPdf/Gabarit_Flag-3m80-Incline.pdf',
        ],
        ficheTechniqueLink: '/LeoPdf/Fiche-technique-Flag-3m80.pdf',
      },
      {
        name: "4m50",
        price: 10.0,
        productId: windFlag.id,
        image: "/LeoImg/4m50-300x225-1-150x150.png",
        downloadLinks: [
          '/LeoPdf/Gabarit_Flag-4m50-Courbe.pdf',
          '/LeoPdf/Gabarit_Flag-4m50-Droit.pdf',
          '/LeoPdf/Gabarit_Flag-4m50-Incline.pdf',
        ],
        ficheTechniqueLink: '/LeoPdf/Fiche-technique-Flag-4m50.pdf',
      },
      {
        name: "5m00",
        price: 10.0,
        productId: windFlag.id,
        image: "/LeoImg/5m-300x225-1-150x150.png",
        downloadLinks: [
          '/LeoPdf/Gabarit_Flag-5m-Courbe.pdf',
          '/LeoPdf/Gabarit_Flag-5m-Droit.pdf',
          '/LeoPdf/Gabarit_Flag-5m-Incline.pdf',
        ],
        ficheTechniqueLink: '/LeoPdf/Fiche-technique-Flag-5m00.pdf',
      },
      {
        name: "1x3 Plat",
        price: 10.0,
        productId: standParapluie.id,
        image: "/LeoImg/LEODisplay-Stand-Plat-1x3-1-150x150.png",
        downloadLinks: [
          '/LeoPdf/Gabarit-stand-plat-3-1.pdf',
        ],
      },
      {
        name: "2x3 Plat",
        price: 10.0,
        productId: standParapluie.id,
        image: "/LeoImg/LEODisplay-Stand-Plat-2x3-1-150x150.png",
        downloadLinks: [
          '/LeoPdf/Gabarit-stand-plat-3-2.pdf',
        ],
      },
      {
        name: "3x3 Plat",
        price: 10.0,
        productId: standParapluie.id,
        image: "/LeoImg/LEODisplay-Stand-Plat-3x3-1-150x150.png",
        downloadLinks: [
          '/LeoPdf/Gabarit-stand-plat-3-3.pdf',
        ],
      },
      {
        name: "4x3 Plat",
        price: 10.0,
        productId: standParapluie.id,
        image: "/LeoImg/LEODisplay-Stand-Plat-4x3-1-150x150.png",
        downloadLinks: [
          '/LeoPdf/Gabarit-stand-plat-3-4.pdf',
        ],
      },
      {
        name: "3x3 Curve",
        price: 10.0,
        productId: standParapluie.id,
        image: "/LeoImg/LEODisplay-Stand-Curve-3x3-1-150x150.png",
        downloadLinks: [
          '/LeoPdf/Gabarit-stand-curve-3-3-1.pdf',
        ],
      },
      {
        name: "4x3 Curve",
        price: 10.0,
        productId: standParapluie.id,
        image: "/LeoImg/LEODisplay-Stand-Curve-4x3-1-150x150.png",
        downloadLinks: [
          '/LeoPdf/Gabarit-stand-curve-3-4-1.pdf',
        ],
      },
    ],
  });

  // Create orders
  await prisma.order.createMany({
    data: [
      {
        orderGroupId: "1",
        status: "attente",
        image: "/LeoImg/order_1.jpg",
        qty: 2,
        email: "client@example.com",
        name: "Client User",
        productNom: "WIND FLAG",
        selectedType: "Courbé",
        selectedBaseName: "Water",
        baseQuantity: 1,
        selectedTailleName: "2m50",
        tailleQuantity: 2,
        selectedBarre: "Metalique",
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
