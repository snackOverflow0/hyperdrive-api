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
    @Request() req,
    @Body() dto: CreateTripDto
  ) {
    const riderId = req.user.id
    return this.tripsService.createTrip(riderId, dto);
  }
}
