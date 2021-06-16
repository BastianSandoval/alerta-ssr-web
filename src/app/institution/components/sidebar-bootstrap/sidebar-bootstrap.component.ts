import { Component, OnInit, Input} from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';


@Component({
  selector: 'app-sidebar-bootstrap',
  templateUrl: './sidebar-bootstrap.component.html',
  styleUrls: ['./sidebar-bootstrap.component.css']
})
export class SidebarBootstrapComponent implements OnInit {

  @Input() show:boolean;
 
  constructor(
    private authService: AuthService
  ) 
  { 
    this.show = false;
  }


  ngOnInit(): void {
  }

  public logOut(): void {
    this.authService.logout();
  }
}
