import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit {
  public date: Date
  constructor(private router: Router) { 
    this.date = new Date;
  }

  ngOnInit() {
  }

  goToJob(){
    this.router.navigate(['/new-job']);
  }

}
