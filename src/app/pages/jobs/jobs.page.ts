import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit {
  public date: Date
  constructor() { 
    this.date = new Date;
  }

  ngOnInit() {
  }

}
