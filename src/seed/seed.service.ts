import { Injectable } from '@nestjs/common';
import { BrandsService } from 'src/brands/brands.service';
import { CarsService } from 'src/cars/cars.service';
import { BRAND_SEED, CARS_SEED } from './data';

@Injectable()
export class SeedService {

    constructor(
        private readonly carsService: CarsService,
        private readonly brandsService: BrandsService
    ) { }
    populateDB() {
        this.carsService.fillCarsWithData( CARS_SEED );
        this.brandsService.fillBrandsWithData( BRAND_SEED );

        return 'Seed executed';
    }

}
