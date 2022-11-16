import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from 'src/interfaces/car/car.interface';
import { v4 as uuid } from 'uuid';
import { UpdateCarDto, CreateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // { id: uuid(), brand: 'Toyota', model: 'Corolla' },
    // { id: uuid(), brand: 'Honda', model: 'Civid' },
    // { id: uuid(), brand: 'Jeep', model: 'Cherokee' },
  ];

  allCars() {
    return this.cars;
  }

  findOneById( id: string ) {
    const car = this.cars.find( car => car.id === id );
    const errorMessage = `El carro con id ${id} no existe`;
    if ( !car ) throw new NotFoundException( errorMessage );

    return car;
  }

  create( createCarDto: CreateCarDto ) {
    const car: Car = {
      id: uuid(),
      ...createCarDto
    }
    this.cars.push( car );

    return car;
  }

  update( id: string, updateCarDto: UpdateCarDto ) {

    let carDB = this.findOneById( id );

    this.cars = this.cars.map( car => {
      if ( car.id === id ) {
        carDB = {
          ...carDB,
          ...updateCarDto,
          id
        }
        return carDB;
      }
      return car;
    } );

    return carDB;

  }

  delete( id: string ) {
    const car = this.findOneById( id );
    this.cars = this.cars.filter( ( car => car.id !== id ) );
    return { message: 'Registro eliminado' }
  }


  fillCarsWithData( cars: Car[] ) {
    this.cars = cars;
  }

}
