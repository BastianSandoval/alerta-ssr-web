import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

import { Comment } from 'src/app/core/models/comment.model';
import { Report } from '../../../core/models/report.model';
import { Location } from '../../../core/models/location.model';
import { Institution } from '@core/models/institution.model';


import { ReportProviderService } from '../../../core/providers/report/report-provider.service';
import { CommentProviderService } from '../../../core/providers/comment/comment-provider.service';
import { LocationProviderService } from '../../../core/providers/location/location-provider.service';
import { InstitutionProviderService } from '../../../core/providers/institution/institution-provider.service';


import { FormService } from '../../../core/services/form/form.service';
import { TokenService } from '../../../core/services/token/token.service';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { UserProviderService } from '@core/providers/user/user-provider.service';


@Component({
  selector: 'app-detail-report',
  templateUrl: './detail-report.component.html',
  styleUrls: ['./detail-report.component.css']
})
export class DetailReportComponent implements OnInit {

  public report$: Observable<any>;
  public review: any;
  public validator: any;
  public reviewId: string;
  //public comments$: Observable<Comment[]>;
  public comments: any[];
  public location: any;
  public reportId: string;
  public reportTitle: string;
  public checkoutForm: FormGroup;
  idComment: any;
  userId! : any; 

  constructor(
    private reportProviderService: ReportProviderService, 
    private userProviderService: UserProviderService, 
    private commentProviderService: CommentProviderService,
    private institutionProviderService: InstitutionProviderService,
    private activeRoute: ActivatedRoute,
    private formService: FormService,
    private tokenService: TokenService,
    private notificationService: NotificationService
  ) { 
    this.reportId = this.activeRoute.snapshot.params['id'];
    this.report$ = this.reportProviderService.getReport(this.reportId);
    this.report$ = this.reportProviderService.getReport(this.reportId);

    this.report$.subscribe(data => {
      this.reportTitle = data.title  
      console.log(data);
      if(data.hasReview)
      this.reviewId = data.review;
      this.setReview();
    })
    
    // this.comments$ = this.commentProviderService.getAllComments();
    // console.log(this.comments$);
    this.comments = [];
    this.createFormGroup();
    }

  ngOnInit(){

  }

  private createFormGroup(){
    this.checkoutForm = this.formService.buildFormGroup({
      comentario: new FormControl('',[Validators.required])
    });
  }

  async setReview() {
    if(!!this.reviewId)
    this.review = await this.reportProviderService.getReportReview(this.reviewId).toPromise();
    if(!!this.review)
    this.validator = await this.userProviderService.getValidator(this.review.checker).toPromise();
  }

  async saveComment(event: any, form: FormGroupDirective){
    event.preventDefault;
    if(this.checkoutForm.valid){
      try{
        const commentDescription: string = this.checkoutForm.value.comentario;
        this.userId = JSON.parse(this.tokenService.getToken()).userId; //se obtiene la id del usuario       
                
        const comment: Comment = {  //se construye el objeto comentario
          description: commentDescription,
          entity: this.userId,
          complaint: this.reportId,
        }       
        
        //se agrega a la BDD de comments y se recibe la id asignada
        try {
          this.commentProviderService.addComment(comment)
          .subscribe((data) =>{
            this.idComment = data._id
          });
          this.checkoutForm.reset();
          form.resetForm();
          this.notificationService.success('Comentario agregado exitosamente')
        } catch (error) {          
          this.notificationService.error('Error al comentar')
        }  
      }
      catch(error){
        console.log(error)
      }
    }
    
  }

  toDate(date: any){
    return date.toDate();
  }

  getRandom(){
    return Math.random() * 12
  }

  public controlIsRequired(formControlName: string): boolean {
    return this.formService.controlIsRequired(this.checkoutForm, formControlName);
  }

  public controlIsInvalid(formControlName: string): boolean {
      return this.formService.controlIsInvalid(this.checkoutForm, formControlName);
  }

  public controlIsInvalidEmail(formControlName: string): boolean {
      return this.formService.controlIsInvalidEmail(this.checkoutForm, formControlName);
  }

  public controlIsInvalidPattern(formControlName: string): boolean {
    return this.formService.controlIsInvalidPattern(this.checkoutForm, formControlName);
  }

  public controlIsInvalidLength(formControlName: string): boolean {
    return this.formService.controlIsInvalidLength(this.checkoutForm, formControlName);
  }



}
