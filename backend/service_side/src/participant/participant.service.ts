import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ParticipantService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createParticipantDto: CreateParticipantDto) {
    return this.prisma.participant.create({
      data: createParticipantDto,
    });
  }

  async findAll() {
    return this.prisma.participant.findMany();
  }

  async findOne(id: string) {
    return this.prisma.participant.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateParticipantDto: UpdateParticipantDto) {
    return this.prisma.participant.update({
      where: { id },
      data: updateParticipantDto,
    });
  }

  async remove(id: string) {
    return this.prisma.participant.delete({
      where: { id },
    });
  }
}
