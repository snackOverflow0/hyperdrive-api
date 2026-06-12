import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('trips')
@UseGuards(AuthGuard('jwt'))
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  async createTrip(
    @Request() req: any,
    @Body() dto: CreateTripDto
  ) {
    const riderId = req.user.id
    return this.tripsService.createTrip(riderId, dto);
  }

  @Patch(':id/accept') // PATCH /api/v1/trips/:id/accept
  async acceptTrip(@Param('id') tripId: string, @Request() req: any) {
    const driverId = req.user.id
    const driverRole = req.user.role
    return this.tripsService.acceptTrip(driverId, tripId, driverRole)
  }

  @Patch(':id/cancel') // PATCH /api/v1/trips/:id/cancel
  async cancelTrip(@Param('id') tripId: string, @Request() req: any) {
    const userId = req.user.id;
    return this.tripsService.cancelTrip(userId, tripId);
  }
}
