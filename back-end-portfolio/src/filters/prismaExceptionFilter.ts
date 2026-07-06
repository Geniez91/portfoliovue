import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ) {
    this.logger.error(
      `Prisma error ${exception.code}: ${exception.message}`,
      exception.stack,
    );

    switch (exception.code) {
      case 'P2025':
        throw new NotFoundException('Resource not found');

      case 'P2002':
        throw new ConflictException('Resource already exists');

      case 'P2003':
        throw new BadRequestException('Invalid relation');

      default:
        throw exception;
    }
  }
}