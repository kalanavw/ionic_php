import {Component, OnInit} from '@angular/core';
import {DbService} from '../services/db.service';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.syncVehicleTbl();
  }

}
