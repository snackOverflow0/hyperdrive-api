// src/trips/dto/create-trip.dto.ts
import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateTripDto {
  @IsString()
  @IsNotEmpty({ message: 'Pickup address string is required' })
  pickupAddress!: string;

  @IsString()
  @IsNotEmpty({ message: 'Dropoff address string is required' })
  dropoffAddress!: string;

  // Enforce strict GPS latitude bounds (-90 to +90 degrees)
  @IsNumber()
  @Min(-90)
  @Max(90)
  pickupLat!: number;

  // Enforce strict GPS longitude bounds (-180 to +180 degrees)
  @IsNumber()
  @Min(-180)
  @Max(180)
  pickupLng!: number;

  @IsNumber()
  @Min(-90)
  @Max(90)
  dropoffLat!: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  dropoffLng!: number;

  @IsNumber()
  @Min(1.0, { message: 'Fare amount cannot be free or negative' })
  fare!: number;
}