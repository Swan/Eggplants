import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {

  coverImgNum: number;

  constructor() { 
    this.coverImgNum = Math.floor((Math.random() * 5) + 1);
    console.log(this.coverImgNum);
  }

  ngOnInit() {

  }

}
