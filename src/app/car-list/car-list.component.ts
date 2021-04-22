import { Component, OnInit } from '@angular/core';
import { CarEditModule } from '../car-edit/car-edit.module';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Array<any>;

  constructor(
     private carService: CarService,
     private giphyService: GiphyService,
     private ownerSerivce: OwnerService,
     private carEditModule: CarEditModule) { }

  ngOnInit() {
    this.carService.getAll().subscribe(data => {
      this.cars = data;
      for (const car of this.cars) {
        this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
        this.mapCarOwner(car);
      }
    });
  }

  mapCarOwner(car: any){
    console.log(car);
    if(car.ownerDni){
      this.ownerSerivce.get(car.ownerDni).subscribe(res => {
        console.log(res)
        const ownerRes = this.carEditModule.mapResultToArray(res);
        car.owner = 'Propietatio: ' +  ownerRes[0].name;
      });
    }
  }

}
