import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css']
})
export class ModalImageComponent implements OnInit {

  @Input()
  image!: any;

  constructor() { }

  ngOnInit(): void {
  }

}
