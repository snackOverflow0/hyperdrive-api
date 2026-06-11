import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TripStatus } from '@prisma/client';

@Injectable()
export class TripsService {
  constructor(private prisma: PrismaService) {}

  async createTrip(riderId: string, dto: CreateTripDto) {
    const trip = await this.prisma.trip.create({
      data: {
        riderId,
        pickupAddress: dto.pickupAddress,
        dropoffAddress: dto.dropoffAddress,
        pickupLat: dto.pickupLat,
        pickupLng: dto.pickupLng,
        dropoffLat: dto.dropoffLat,
        dropoffLng: dto.dropoffLng,
        fare: dto.fare,
        status: TripStatus.REQUESTED
      }
    })

    return {
      message: 'Ride requested successfully. Searching for available drivers...',
      trip,
    }
  }
}
