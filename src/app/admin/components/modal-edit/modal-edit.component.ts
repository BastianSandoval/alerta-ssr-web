import { Component, Input, OnInit } from '@angular/core';
import { Dog } from '@core/models/dog.model';
import { DogService } from '@core/services/dogs/dogs.service';
import { NotificationService } from '@core/services/notification/notification.service';

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
    private dogService: DogService,
    private notificationService: NotificationService,
  ){ }

  ngOnInit(): void {
  }

  editDog(id: string, newDog: any){
    
    if(this.dogService.editDog(id,newDog) === null){
      this.notificationService.error('Error al editar perro intente nuevamente');
    }else{
      this.notificationService.success('Perro editado correctamente');
    }
  }

}
