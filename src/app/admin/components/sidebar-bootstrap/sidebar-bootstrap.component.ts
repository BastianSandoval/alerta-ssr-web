import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar-bootstrap',
  templateUrl: './sidebar-bootstrap.component.html',
  styleUrls: ['./sidebar-bootstrap.component.css']
})
export class SidebarBootstrapComponent implements OnInit {

  @Output() mostrarEmitter: EventEmitter<boolean>;
  constructor() 
  { this.mostrarEmitter = new EventEmitter<boolean>()
    this.showw=false;
  }


  ngOnInit(): void {
  }
  showw:boolean;

  show (){
    if (!this.showw){ 
      this.showw= true;
    }else { 
      this.showw=false;
    }
    this.mostrarEmitter.emit(this.showw);
  }
}
