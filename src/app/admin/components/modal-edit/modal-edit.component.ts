import { Component, Input, OnInit } from '@angular/core';
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
    private notificationService: NotificationService,
  ){ }

  ngOnInit(): void {
  }

}
