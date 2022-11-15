import { Controller, Get, Param, ParseIntPipe, ParseUUIDPipe, UsePipes } from '@nestjs/common';
import { Body, Delete, Patch, Post } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Car } from 'src/interfaces/car/car.interface';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller( 'cars' )
// @UsePipes(ValidationPipe)
export class CarsController {

  constructor(
    private readonly carsSrv: CarsService
  ) { }

  @Get()
  getAllCars() {
    return this.carsSrv.allCars();
  }

  @Get( ':id' )
  getCarById( @Param( 'id', new ParseUUIDPipe( { version: '4' } ) ) id: string ) {
    return this.carsSrv.findOneById( id );
  }

  @Post()
  // @UsePipes(ValidationPipe)
  create(
    @Body() createCarDto: CreateCarDto
  ) {
    return this.carsSrv.create( createCarDto );
  }

  @Patch( ':id' )
  update(
    @Param( 'id', ParseUUIDPipe ) id: string,
    @Body() updateCarDto: UpdateCarDto ) {
    return this.carsSrv.update( id, updateCarDto );
  }

  @Delete( ':id' )
  delete( @Param( 'id', ParseUUIDPipe ) id: string ) {
    return this.carsSrv.delete( id )
  }

}
