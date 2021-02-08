import { Component, Input, OnInit } from '@angular/core';
import { DogService } from '@core/services/dogs/dogs.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit {


  @Input() nameDog!: string;
  @Input() id!: string;
  constructor(
    private dogService: DogService) {}

  ngOnInit(): void {
  }

  deleteDog(id: string){
    this.dogService.deleteDog(id)
    /* console.log(id) */
  }
}
