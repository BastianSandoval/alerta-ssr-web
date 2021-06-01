import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input() sizeRem: number;
  public size: number;

  constructor() {
    this.sizeRem != undefined ? this.size = this.sizeRem : this.size = 2;
   }

  ngOnInit(): void {
  }

}
