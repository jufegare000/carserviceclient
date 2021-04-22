
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarEditModule } from '../car-edit/car-edit.module';
import { Owner } from '../owner/owner.model';
import { OwnerService } from '../shared/owner/owner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.css']
})
export class OwnersListComponent implements OnInit, OnDestroy {
  owners: Array<Owner>;
  toDelete: Array<Owner>;
  sub: Subscription;

  constructor(
              private route: ActivatedRoute,
              private router: Router,
              private ownerService: OwnerService,
              private cardEditModue: CarEditModule) { }

  ngOnInit() {
    this.sub =  this.ownerService.getAll().subscribe(data => {
      this.owners = this.cardEditModue.mapResultToArray(data);
      console.log(this.owners);
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

    this.toDelete.forEach((owner)=> {
      const res = this.ownerService.remove(owner.href).subscribe(res => {
        console.log(res);
        this.owners = this.owners.filter(owner => !owner.selected)
      });
      
      //this.gotoMain();
    })
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
