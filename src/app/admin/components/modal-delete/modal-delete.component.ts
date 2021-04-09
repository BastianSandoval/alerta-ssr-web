import { Component, Input, OnInit } from '@angular/core';
import { ReportsService } from '@core/services/reports/reports.service';
import { NotificationService } from '@core/services/notification/notification.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit {


  @Input() report!: string;
  @Input() id!: string;
  constructor(
    private notificationService: NotificationService,
    private reportsService: ReportsService) {}

  ngOnInit(): void {
  }

  deleteReport(id: string){
    if(this.reportsService.deleteReport(id) === null){
      this.notificationService.error('Error al eliminar reporte intente nuevamente');

    }else{
      this.notificationService.success('Reporte eliminado exitosamente');
    }



    /* console.log(id) */
  }
}
