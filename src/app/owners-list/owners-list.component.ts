
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarEditModule } from '../car-edit/car-edit.module';
import { Owner } from '../owner/owner.model';
import { OwnerService } from '../shared/owner/owner.service';
import { Subscription } from 'rxjs';
import { CarService } from '../shared/car/car.service';

@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.css']
})
export class OwnersListComponent implements OnInit, OnDestroy {
  owners: Array<Owner>;
  toDelete: Array<Owner>;
  sub: Subscription;
  cars: Array<any>;

  constructor(
              private route: ActivatedRoute,
              private router: Router,
              private ownerService: OwnerService,
              private cardEditModue: CarEditModule,
              private carService: CarService) { }

  ngOnInit() {
    this.sub =  this.ownerService.getAll().subscribe(data => {
      this.owners = this.cardEditModue.mapResultToArray(data);
      console.log(this.owners);
    });
    this.carService.getAll().subscribe(data => {
      this.cars = data.filter(car => {
        car.ownerDni !== null;
      });
    });
  }

  selectToDelete(event: any){
    this.toDelete = this.owners.filter(owner => owner.selected);
    console.log(this.toDelete);
  }
  gotoMain() {
    this.router.navigate(['/']);
  }

  deleteOwners(event: any){


    console.log(this.cars)
    
    
    this.toDelete.forEach((owner)=> {
      this.cars.forEach(car => {
        if(car.ownerDni === owner.dni){
          car.ownerDni = null;
          this.carService.save(car).subscribe(res => {

          });
        }
      });
      const res = this.ownerService.remove(owner.href).subscribe(res => {
        console.log(res);
        this.owners = this.owners.filter(owner => !owner.selected)
      });
    })
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
