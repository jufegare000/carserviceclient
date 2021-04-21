import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../shared/owner/owner.service';
import { CarEditModule } from '../car-edit/car-edit.module';
import { Owner } from '../owner/owner.model';


@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.css']
})
export class OwnersListComponent implements OnInit {
  owners: Array<Owner>;
  toDelete: Array<Owner>;

  constructor(private ownerService: OwnerService, private cardEditModue: CarEditModule) { }

  ngOnInit() {
    this.ownerService.getAll().subscribe(data => {
      this.owners = this.cardEditModue.mapResultToArray(data);
      console.log(this.owners);
    });
  }

  selectToDelete(event: any){
    this.toDelete = this.owners.filter(owner => owner.selected);
    console.log(this.toDelete);
  }

  deleteOwners(event: any){

    this.toDelete.forEach((owner)=> {
      this.ownerService.remove(owner.dni);
    })
  }

}
