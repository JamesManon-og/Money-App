import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto) {
    try {
      const createdPayment = await this.prisma.payment.create({
        data: createPaymentDto,
      });
      return createdPayment;
    } catch (error: any) {
      if (error.code === 'P2003') {
        throw new HttpException(
          'Invalid participant ID',
          HttpStatus.BAD_REQUEST,
        );
      }
      console.error('Error creating payment:', error);
      throw new HttpException(
        'Failed to create payment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.payment.findMany();
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw new HttpException(
        'Failed to fetch payments',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const payment = await this.prisma.payment.findUnique({
        where: { id },
      });
      if (!payment) {
        throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
      }
      return payment;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Error fetching payment:', error);
      throw new HttpException(
        'Failed to fetch payment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    try {
      const updatedPayment = await this.prisma.payment.update({
        where: { id },
        data: updatePaymentDto,
      });
      return updatedPayment;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
      }
      if (error.code === 'P2003') {
        throw new HttpException(
          'Invalid participant ID',
          HttpStatus.BAD_REQUEST,
        );
      }
      console.error('Error updating payment:', error);
      throw new HttpException(
        'Failed to update payment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const deletedPayment = await this.prisma.payment.delete({
        where: { id },
      });
      return deletedPayment;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
      }
      console.error('Error deleting payment:', error);
      throw new HttpException(
        'Failed to delete payment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
