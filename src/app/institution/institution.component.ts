import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../core/services/auth/auth.service';


@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.css']
})
export class InstitutionComponent implements OnInit {

  public mobileQuery: MediaQueryList;
  public screens: any[] = [];
  private _mobileQueryListener: () => void;
  public show:boolean;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    this.show=false;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  public logOut(): void {
    this.authService.logout();
  }

  public showSidebar(){
    this.show = !this.show;
  }
}
