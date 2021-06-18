import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/core/models/comment.model';
import { Report } from '../../../core/models/report.model';
import { Location } from '../../../core/models/location.model';
import { ReportProviderService } from '../../../core/providers/report/report-provider.service';
import { CommentProviderService } from '../../../core/providers/comment/comment-provider.service';
import { LocationProviderService } from '../../../core/providers/location/location-provider.service';

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

  constructor(
    private reportProviderService: ReportProviderService, 
    private commentProviderService: CommentProviderService,
    private activeRoute: ActivatedRoute,
  ) { 
    this.reportId = this.activeRoute.snapshot.params['id'];
    this.report$ = this.reportProviderService.getReport(this.reportId);
    // this.comments$ = this.commentProviderService.getAllComments();
    // console.log(this.comments$);
    this.comments = [];
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

  toDate(date: any){
    return date.toDate();
  }

  getRandom(){
    return Math.random() * 12
  }


}
