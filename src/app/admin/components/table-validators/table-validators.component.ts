import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Region } from '@core/models/region.model';
import { Report } from '@core/models/report.model';
import { Validator } from '@core/models/validator.model';
import { CategoryProviderService } from '@core/providers/category/category-provider.service';
import { CommuneProviderService } from '@core/providers/commune/commune-provider.service';
import { InstitutionProviderService } from '@core/providers/institution/institution-provider.service';
import { RegionProviderService } from '@core/providers/region/region-provider.service';
import { ReportProviderService } from '@core/providers/report/report-provider.service';
import { ValidatorProviderService } from '@core/providers/validator/validator-provider.service';
import { NotificationService } from '@core/services/notification/notification.service';
import { TokenService } from '@core/services/token/token.service';
import { StatusList } from 'src/app/institution/components/table-reports/table-reports.component';

@Component({
  selector: 'app-table-validators',
  templateUrl: './table-validators.component.html',
  styleUrls: ['./table-validators.component.css']
})
export class TableValidatorsComponent implements OnInit {

  @Input() id: string;

  reports: Report[];
  validators: Validator[];
  communes: any;
  regions: Region[];
  filterCategory!: string;
  value!: string;
  filterReport!: string;
  idSelected: any;
  reportSelected: boolean;
  reportsSlice!: Report[];
  sizePageTable: number = 9;
  startPage: number = 0;
  endPage: number = 9;
  visualizar: boolean;
  reportId: string;
  numberPage: number = 1;
  categoryList: any;
  withReviewStatusList: StatusList[];
  rejectedStatusList: StatusList[];
  withReview: boolean;
  rejected: boolean;
  titleReport: string;
  isCategory: boolean = false;
  userId!: string;

  //response Query
  public totalDocs: number;
  public hasNextPage: boolean;
  public hasPrevPage: boolean;
  public limit: number;
  public nextPages: number;
  public page: number;
  public pagingCounter: number;
  public prevPages: number;
  public totalPages: number;
  public reportStatus: number = null;

  //cargar pagina
  public loader: boolean;

  constructor(
    private reportProviderService: ReportProviderService,
    private institutionProviderService: InstitutionProviderService,
    private communeProviderService: CommuneProviderService,
    private regionProviderService: RegionProviderService,
    private notificationService: NotificationService,
    private categoryProviderService: CategoryProviderService,
    private validatorProviderService: ValidatorProviderService,
    private tokenService: TokenService,
    private route: ActivatedRoute,
  ) {
    this.reportSelected = false;
    this.visualizar = true;
    this.reports = [];
    this.loader = false;
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      this.id = params.id || '';
    });
    this.setReport();
    this.withReviewStatusList = [
      new StatusList('Sin Revisar', 0),
      new StatusList('Rechazado', 1),
      new StatusList('Aprovado', 2),
    ];
    this.categoryList = await this.categoryProviderService
      .getAllCategories()
      .toPromise();

    // console.log(this.reports);
  }

  async ngOnChanges() {}

  async approveItem(id:string) {
    try {
      await this.validatorProviderService.approveValidator(id).toPromise();
      this.setReport();
      this.notificationService.success('Validador aprobado exitosamente');
    } catch (error) {
      this.notificationService.error('No fue posible aprobar al validador');
    }
    
    
  }

  async deleteItem(id:any) {
    let index: number = 0;
    // console.log(reportId);
    await this.validatorProviderService.deleteValidator(id).toPromise();
    if (id) {
      this.validators.forEach((val: Validator) => {
        if (id === val._id) {
          this.validators.splice(index, 1);
        }
        index++;
      });

      this.setReport();
      if (!this.validators.length) {
        if (this.prevPages >= 1) {
          this.prevPage();
        }
      }
      this.notificationService.success('Validador eliminado exitosamente');
    } else {
      this.notificationService.error('No fue posible eliminar al validador');
    }
  }

  validatorSelect(val: Validator) {
    this.idSelected = val._id;
    console.log(val._id);
    this.titleReport = val.names;
    console.log(val.names);
  }

  async ngDoCheck() {
    this.reportsSlice = this.reports.slice(this.startPage, this.endPage);

    let prevButton = document.getElementById('prevButton');
    let nextButton = document.getElementById('nextButton');

    if (!this.hasPrevPage) {
      prevButton?.setAttribute('disabled', 'disabled');
    } else {
      prevButton?.removeAttribute('disabled');
    }

    if (!this.hasNextPage) {
      nextButton?.setAttribute('disabled', 'disabled');
    } else {
      nextButton?.removeAttribute('disabled');
    }
  }

  async setReport() {
    let data: any;
    data = await this.institutionProviderService.getAllInstitutionValidatorsPaginate(this.id,this.numberPage,this.sizePageTable).toPromise();

    // data = await this.reportProviderService
    //   .getAllReports(this.numberPage,this.sizePageTable, this.withReview, this.rejected)
    //   .toPromise();
    
    //set queries
    this.totalDocs = data.totalDocs;
    this.hasNextPage = data.hasNextPage;
    this.hasPrevPage = data.hasPrevPage;
    this.limit = data.limit;
    this.nextPages = data.nextPage;
    this.page = data.page;
    this.pagingCounter = data.pagingCounter;
    this.prevPages = data.prevPage;
    this.totalPages = data.totalPages;

    this.validators = data.docs;

    // if (this.isCategory) {
    //   this.reports = this.reports.filter(
    //     (report: any) => report.category._id == this.filterCategory
    //   );
    // }

    this.communes = await this.communeProviderService
      .getAllCommunes()
      .toPromise();
    this.regions = await this.regionProviderService.getAllRegions().toPromise();

    this.reports.forEach((report) => {
      let location: any = report.location;
      this.communes.forEach((commune) => {
        if (location.commune === commune._id) {
          this.regions.forEach((region) => {
            if (commune.region._id === region._id) {
              report.ubication = `${location.fullAddress}`;
            }
          });
        }
      });
    });

    this.loader = true;
  }

  async categoryFilter(event: any) {
    if (event.target.value != '') {
      this.isCategory = true;
      this.filterCategory = event.target.value;
      this.setReport();
    } else {
      this.isCategory = false;
      this.setReport();
    }
  }

  async statusReviewFilter(event: any) {
    if (event.target.value != '') {
      switch (event.target.value) {
        case '0':
          this.withReview = false;
          this.rejected = null;
          this.setReport();
          break;
        case '1':
          this.withReview = true;
          this.rejected = true;
          this.setReport();
          break;
        case '2':
          this.withReview = true;
          this.rejected = false;
          this.setReport();
          break;
      }
    } else {
      this.withReview = null;
      this.rejected = null;
      this.setReport();
    }
  }

  clearFilter() {
    this.filterCategory = '';
    this.filterReport = '';
  }

  onValue(value: string) {
    this.value = value;
    if (this.value === '') {
      this.clearFilter();
    } else {
      this.filterReport = this.value;
    }
  }

  onEnter(value: string) {
    this.filterReport = value;
  }

  searchButton() {
    if (this.value) {
      this.filterReport = this.value;
    } else {
      this.clearFilter();
    }
  }

  selectReport(report: Report) {
    this.reportSelected = true;
  }

  //botones
  sizePage(event: any) {
    this.sizePageTable = parseInt(event.target.value);
    this.setReport();
  }

  prevPage() {
    if (this.hasPrevPage) {
      this.numberPage = this.prevPages;
      this.setReport();
    }
  }

  nextPage() {
    if (this.hasNextPage) {
      this.numberPage = this.nextPages;
      this.setReport();
    }
  }
}