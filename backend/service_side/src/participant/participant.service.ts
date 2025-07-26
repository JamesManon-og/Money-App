import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ParticipantService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createParticipantDto: CreateParticipantDto) {
    try {
      const createdParticipant = await this.prisma.participant.create({
        data: createParticipantDto,
      });
      return createdParticipant;
    } catch (error: any) {
      if (error.code === 'P2003') {
        throw new HttpException(
          'Invalid expense or user ID',
          HttpStatus.BAD_REQUEST,
        );
      }
      console.error('Error creating participant:', error);
      throw new HttpException(
        'Failed to create participant',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.participant.findMany();
    } catch (error) {
      console.error('Error fetching participants:', error);
      throw new HttpException(
        'Failed to fetch participants',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const participant = await this.prisma.participant.findUnique({
        where: { id },
      });
      if (!participant) {
        throw new HttpException('Participant not found', HttpStatus.NOT_FOUND);
      }
      return participant;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Error fetching participant:', error);
      throw new HttpException(
        'Failed to fetch participant',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateParticipantDto: UpdateParticipantDto) {
    try {
      const updatedParticipant = await this.prisma.participant.update({
        where: { id },
        data: updateParticipantDto,
      });
      return updatedParticipant;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new HttpException('Participant not found', HttpStatus.NOT_FOUND);
      }
      if (error.code === 'P2003') {
        throw new HttpException(
          'Invalid expense or user ID',
          HttpStatus.BAD_REQUEST,
        );
      }
      console.error('Error updating participant:', error);
      throw new HttpException(
        'Failed to update participant',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const deletedParticipant = await this.prisma.participant.delete({
        where: { id },
      });
      return deletedParticipant;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new HttpException('Participant not found', HttpStatus.NOT_FOUND);
      }
      console.error('Error deleting participant:', error);
      throw new HttpException(
        'Failed to delete participant',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
