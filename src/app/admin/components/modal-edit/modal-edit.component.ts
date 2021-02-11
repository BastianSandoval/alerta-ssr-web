import { Component, Input, OnInit } from '@angular/core';
import { Dog } from '@core/models/dog.model';
import { DogService } from '@core/services/dogs/dogs.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent implements OnInit {

  @Input() nameDog!: any;
  @Input() id!: any;
  @Input() newDog: any
  

  constructor(
    private dogService: DogService
  ){ }

  ngOnInit(): void {
  }

  editDog(id: string, newDog: any){
    this.dogService.editDog(id,newDog);
  }

}
