import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-modal-logout',
  templateUrl: './modal-logout.component.html',
  styleUrls: ['./modal-logout.component.css']
})
export class ModalLogoutComponent implements OnInit {

  @Input() id:any;
  @Input() title:any;
  @Input() message:any;
  @Output() confirm: EventEmitter<any>;

  
  constructor() { 
    this.confirm = new EventEmitter<any>();
  }

  ngOnInit(): void {
  }

  public confirmation() {
    $('.close').click();
    // $(`#${this.id}`).modal('hide');
    this.confirm.emit();
  }

}
