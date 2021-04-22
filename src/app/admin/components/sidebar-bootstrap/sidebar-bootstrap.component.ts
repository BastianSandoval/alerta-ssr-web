import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-sidebar-bootstrap',
  templateUrl: './sidebar-bootstrap.component.html',
  styleUrls: ['./sidebar-bootstrap.component.css']
})
export class SidebarBootstrapComponent implements OnInit {

  @Input() show:boolean;
 
  constructor() 
  { 
    this.show = false;
  }


  ngOnInit(): void {
  }

}
