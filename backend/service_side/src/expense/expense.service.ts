import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExpenseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createExpenseDto: CreateExpenseDto) {
    try {
      const createdExpense = await this.prisma.expense.create({
        data: createExpenseDto,
      });
      return createdExpense;
    } catch (error) {
      console.error('Error creating expense:', error);
      throw new HttpException(
        'Failed to create expense',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.expense.findMany();
    } catch (error) {
      console.error('Error fetching expenses:', error);
      throw new HttpException(
        'Failed to fetch expenses',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const expense = await this.prisma.expense.findUnique({
        where: { id },
      });
      if (!expense) {
        throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
      }
      return expense;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Error fetching expense:', error);
      throw new HttpException(
        'Failed to fetch expense',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    try {
      const updatedExpense = await this.prisma.expense.update({
        where: { id },
        data: updateExpenseDto,
      });
      return updatedExpense;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
      }
      console.error('Error updating expense:', error);
      throw new HttpException(
        'Failed to update expense',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const deletedExpense = await this.prisma.expense.delete({
        where: { id },
      });
      return deletedExpense;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
      }
      console.error('Error deleting expense:', error);
      throw new HttpException(
        'Failed to delete expense',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
