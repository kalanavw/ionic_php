import { Injectable } from '@angular/core';
import {DbService} from './db.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private dbService: DbService) { }
}
