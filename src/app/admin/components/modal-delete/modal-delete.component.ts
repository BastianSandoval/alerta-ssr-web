import { Component, Input, OnInit } from '@angular/core';
import { DogService } from '@core/services/dogs/dogs.service';
import { NotificationService } from '@core/services/notification/notification.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit {


  @Input() nameDog!: string;
  @Input() id!: string;
  constructor(
    private notificationService: NotificationService,
    private dogService: DogService) {}

  ngOnInit(): void {
  }

  deleteDog(id: string){
    if(this.dogService.deleteDog(id) === null){
      this.notificationService.error('Error al eliminar perro intente nuevamente');

    }else{
      this.notificationService.success('Perro eliminado exitosamente');
    }



    /* console.log(id) */
  }
}
