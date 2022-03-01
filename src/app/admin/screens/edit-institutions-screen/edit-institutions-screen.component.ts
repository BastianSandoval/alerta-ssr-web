import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ReportProviderService } from '@core/providers/report/report-provider.service';
import { NotificationService } from '@core/services/notification/notification.service';

@Component({
  selector: 'app-edit-institutions-screen',
  templateUrl: './edit-institutions-screen.component.html',
  styleUrls: ['./edit-institutions-screen.component.css']
})
export class EditInstitutionsScreenComponent implements OnInit {

  id:string;
  form: FormGroup;

  constructor(private notificationService:NotificationService, private activatedRoute : ActivatedRoute,private reportProviderService: ReportProviderService) { // sin private no funciona
    this.id='';
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id || '';
      /* console.log('Id a buscar = ' +this.id + ' el perro encontrado = ' + this.wantedDog._id) */
    });
  }

}
