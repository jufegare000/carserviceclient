import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Owner } from '../owner/owner.model';
import { OwnerService } from '../shared/owner/owner.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CarEditModule {

  constructor(private ownerService: OwnerService) { }

  getOwnerList()
  {
    return this.ownerService.getAll();
  }

  mapResultToArray(result: any) {
    const ownerList: Array<Owner> = [];
    for (const owner of result._embedded.owners) {
      let currentOwner: Owner = {
        dni: owner.dni,
        name: owner.name,
        profession: owner.profession
      };
      ownerList.push(currentOwner);
    }
    return ownerList;
  }

  loadCarOwner() {
    
  }

 }
