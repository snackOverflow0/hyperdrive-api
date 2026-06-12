import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

  async acceptTrip(driverId: string, tripId: string, driverRole: string) {
    if (driverRole !== 'DRIVER') {
      throw new ForbiddenException('Only verified drivers can accept trip requests.')
    }

    const trip = await this.prisma.trip.findUnique({
      where: { id: tripId }
    })

    if (!trip) {
      throw new NotFoundException('The requested trip was not found')
    }

    if (trip.status !== TripStatus.REQUESTED) {
      throw new BadRequestException('This trip is no longer available. It may have been accepted or cancelled.')
    }

    const updatedTrip = await this.prisma.trip.update({
      where: { id: tripId },
      data: {
        status: TripStatus.ACCEPTED,
        driverId: driverId
      }
    })

    return {
      message: 'Trip accepted successfully. Proceed to the pickup location.',
      trip: updatedTrip
    }
  }

  async cancelTrip(userId: string, tripId: string) {
    const trip = await this.prisma.trip.findUnique({
      where: { id: tripId }
    })

    if (!trip) {
      throw new NotFoundException('The requested trip was not found.')
    }

    if (trip.status !== TripStatus.REQUESTED && trip.status !== TripStatus.ACCEPTED) {
      throw new BadRequestException('Cannot cancel a trip that is already in transit or completed.')
    }

    if (trip.riderId !== userId && trip.driverId !== userId) {
      throw new ForbiddenException('You do not have permission to cancel this trip.')
    }

    const cancelledTrip = await this.prisma.trip.update({
      where: { id: tripId },
      data: {
        status: TripStatus.CANCELLED
      }
    })

    return {
      message: 'Trip has been successfully cancelled',
      trip: cancelledTrip
    }
  }
}
