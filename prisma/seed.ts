require('dotenv').config({ path: __dirname + '/../.env' });

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear usuarios de ejemplo en español
  const juan = await prisma.user.create({
    data: {
      email: 'juanperez@example.com',
      firstname: 'Juan',
      lastname: 'Pérez',
      username: 'juanp',
      password: 'hashedpassword1',
      description: 'Amante de la tecnología y el café.',
      color: '#FF5733',
      imageurl: null,
    },
  });

  const maria = await prisma.user.create({
    data: {
      email: 'mariagomez@example.com',
      firstname: 'María',
      lastname: 'Gómez',
      username: 'mariag',
      password: 'hashedpassword2',
      description: 'Me encanta viajar y leer.',
      color: '#33C1FF',
      imageurl: null,
    },
  });

  const carlos = await prisma.user.create({
    data: {
      email: 'carloslopez@example.com',
      firstname: 'Carlos',
      lastname: 'López',
      username: 'carlosl',
      password: 'hashedpassword3',
      description: 'Fanático del fútbol y la música.',
      color: '#28A745',
      imageurl: null,
    },
  });

  // Crear 7 publicaciones variadas
  await prisma.publication.create({
    data: {
      content: '¡Buenos días a todos! ¿Listos para un gran día?',
      imageurl: null,
      userid: juan.userid,
    },
  });
  await prisma.publication.create({
    data: {
      content: 'Hoy terminé de leer un libro increíble.',
      imageurl: null,
      userid: maria.userid,
    },
  });
  await prisma.publication.create({
    data: {
      content: '¿Alguien quiere jugar fútbol este fin de semana?',
      imageurl: null,
      userid: carlos.userid,
    },
  });
  await prisma.publication.create({
    data: {
      content: 'El café de la mañana es lo mejor para empezar el día.',
      imageurl: null,
      userid: juan.userid,
    },
  });
  await prisma.publication.create({
    data: {
      content: 'Extraño viajar a la playa.',
      imageurl: null,
      userid: maria.userid,
    },
  });
  await prisma.publication.create({
    data: {
      content: '¡Vamos equipo! Hoy ganamos el partido.',
      imageurl: null,
      userid: carlos.userid,
    },
  });
  await prisma.publication.create({
    data: {
      content: '¿Cuál es su libro favorito?',
      imageurl: null,
      userid: maria.userid,
    },
  });

  console.log('Seed ejecutado correctamente con usuarios y publicaciones en español');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
