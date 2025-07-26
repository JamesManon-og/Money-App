import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.create({
    data: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      password: hashedPassword,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob Smith',
      email: 'bob@example.com',
      password: hashedPassword,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      password: hashedPassword,
    },
  });

  const user4 = await prisma.user.create({
    data: {
      name: 'Diana Prince',
      email: 'diana@example.com',
      password: hashedPassword,
    },
  });

  const expense1 = await prisma.expense.create({
    data: {
      name: 'Dinner at Restaurant',
      totalAmount: 120.5,
      paidById: user1.id,
      date: new Date('2025-07-20'),
      notes: 'Italian restaurant downtown',
    },
  });

  const expense2 = await prisma.expense.create({
    data: {
      name: 'Grocery Shopping',
      totalAmount: 85.3,
      paidById: user2.id,
      date: new Date('2025-07-22'),
      notes: 'Weekly groceries for the house',
    },
  });

  const expense3 = await prisma.expense.create({
    data: {
      name: 'Movie Tickets',
      totalAmount: 48.0,
      paidById: user3.id,
      date: new Date('2025-07-24'),
      notes: 'Avengers movie night',
    },
  });

  const participant1_3 = await prisma.participant.create({
    data: {
      expenseId: expense1.id,
      userId: user3.id,
      shareAmount: 30.12,
      isSettled: true,
      settledAt: new Date('2025-07-21'),
    },
  });

  const participant2_1 = await prisma.participant.create({
    data: {
      expenseId: expense2.id,
      userId: user1.id,
      shareAmount: 21.33,
      isSettled: true,
      settledAt: new Date('2025-07-23'),
    },
  });

  const participant2_4 = await prisma.participant.create({
    data: {
      expenseId: expense2.id,
      userId: user4.id,
      shareAmount: 21.32,
      isSettled: true,
      settledAt: new Date('2025-07-23'),
    },
  });

  const participant3_2 = await prisma.participant.create({
    data: {
      expenseId: expense3.id,
      userId: user2.id,
      shareAmount: 12.0,
      isSettled: true,
      settledAt: new Date('2025-07-25'),
    },
  });

  const participant3_4 = await prisma.participant.create({
    data: {
      expenseId: expense3.id,
      userId: user4.id,
      shareAmount: 12.0,
      isSettled: true,
      settledAt: new Date('2025-07-25'),
    },
  });

  await prisma.payment.create({
    data: {
      participantId: participant1_3.id,
      amountPaid: 30.12,
      paidAt: new Date('2025-07-21'),
    },
  });

  await prisma.payment.create({
    data: {
      participantId: participant2_1.id,
      amountPaid: 21.33,
      paidAt: new Date('2025-07-23'),
    },
  });

  await prisma.payment.create({
    data: {
      participantId: participant2_4.id,
      amountPaid: 21.32,
      paidAt: new Date('2025-07-23'),
    },
  });

  await prisma.payment.create({
    data: {
      participantId: participant3_2.id,
      amountPaid: 12.0,
      paidAt: new Date('2025-07-25'),
    },
  });

  await prisma.payment.create({
    data: {
      participantId: participant3_4.id,
      amountPaid: 12.0,
      paidAt: new Date('2025-07-25'),
    },
  });
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
