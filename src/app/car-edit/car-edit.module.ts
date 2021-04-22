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
    console.log('result of query',result);
    for (const owner of result._embedded.owners) {
      const indexOfSlash = owner._links.self.href.lastIndexOf("/");
      const id = owner._links.self.href.substring(indexOfSlash+1, 100);
      console.log('index: ', indexOfSlash, 'id:', id);
      if(owner.dni){
      let currentOwner: Owner = {
        dni: owner.dni,
        name: owner.name,
        profession: owner.profession,
        href: owner._links.self.href,
        id: id
        };
        ownerList.push(currentOwner);
        
      }
    }
    return ownerList;
  }

  loadCarOwner() {

  }

 }
