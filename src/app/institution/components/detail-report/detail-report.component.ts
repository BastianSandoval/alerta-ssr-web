import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';


import { Comment } from 'src/app/core/models/comment.model';
import { Report } from '../../../core/models/report.model';
import { Location } from '../../../core/models/location.model';


import { ReportProviderService } from '../../../core/providers/report/report-provider.service';
import { CommentProviderService } from '../../../core/providers/comment/comment-provider.service';
import { LocationProviderService } from '../../../core/providers/location/location-provider.service';
import { FormService } from '../../../core/services/form/form.service'

@Component({
  selector: 'app-detail-report',
  templateUrl: './detail-report.component.html',
  styleUrls: ['./detail-report.component.css']
})
export class DetailReportComponent implements OnInit {

  public report$: Observable<any>;
  //public comments$: Observable<Comment[]>;
  public comments: any[];
  public location: any;
  public reportId: string;
  public checkoutForm: FormGroup;

  constructor(
    private reportProviderService: ReportProviderService, 
    private commentProviderService: CommentProviderService,
    private activeRoute: ActivatedRoute,
    private formService: FormService,
  ) { 
    this.reportId = this.activeRoute.snapshot.params['id'];
    this.report$ = this.reportProviderService.getReport(this.reportId);
    // this.comments$ = this.commentProviderService.getAllComments();
    // console.log(this.comments$);
    this.comments = [];
    this.createFormGroup();
    }

  async ngOnInit(): Promise<void>{
    let data: any = await this.commentProviderService.getAllComments().toPromise();
    let comentarios: any[] = data.docs;
    comentarios.forEach((element) => {
        if(element.complaint = this.reportId){
          this.comments.push(element);
        }
    });
  }

  private createFormGroup(){
    this.checkoutForm = this.formService.buildFormGroup({
      comentario: new FormControl('',[Validators.required])
    });
  }

  async saveComment(event){
    event.preventDefault;
    if(this.checkoutForm.valid){
      try{
        let comment: Comment = this.checkoutForm.value;
        console.log(comment);
        await this.commentProviderService.addComment(comment).toPromise();
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
