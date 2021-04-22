import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { NgForm } from '@angular/forms';
import {CarEditModule} from './car-edit.module';
import {Owner} from '../owner/owner.model';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit, OnDestroy {
  car: any = {};
  owners: Array<Owner>;
  sub: Subscription;
  ownerSelected: Owner;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private carService: CarService,
              private giphyService: GiphyService,
              private cardEditModule: CarEditModule) {
  }

  async ngOnInit() {

    this.loadOwners();

    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.carService.get(id).subscribe((car: any) => {
          if (car) {
            this.car = car;
            this.car.href = car._links.self.href;
            // this.showCarOwnerInSelect();
            this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
          } else {
            console.log(`Car with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  showCarOwnerInSelect(){
  }

  loadOwners() {
    this.cardEditModule.getOwnerList().subscribe((data: any)=> {
      this.owners = this.cardEditModule.mapResultToArray(data);
     } );
  }


  eventSelection(event){
    this.ownerSelected = event.name;
   }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/car-list']);
  }

  save(form: any) {
    console.log(form);
    form.ownerDni = this.ownerSelected;
    this.carService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.carService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
}

