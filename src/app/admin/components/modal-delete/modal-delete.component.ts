import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificationService } from '@core/services/notification/notification.service';
import { ReportProviderService} from '../../../core/providers/report/report-provider.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit {


  @Input() id!: string;
  @Output() idDelete:EventEmitter<string>;
  constructor(
    private notificationService: NotificationService,
    private reportProviderService: ReportProviderService) 
    {
      this.idDelete= new EventEmitter<string>();
    }


  ngOnInit(): void {
  }

  async deleteReport(){
    if (this.id) {
      this.idDelete.emit(this.id);
      // this.notificationService.success('Reporte eliminado exitosamente');
    }
    else {}
      // this.notificationService.error('Error al eliminar reporte intente nuevamente');
  }
}
