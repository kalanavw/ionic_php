import {Injectable} from '@angular/core';
import {DbService} from './db.service';
import {HttpService} from './http.service';
import {EsResponse} from '../model/es-response';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private dbService: DbService,
                private httpService: HttpService) {

        this.dbService.initDB();
    }

    syncVehicleTbl() {
        console.log('---------');
        this.httpService.get('VehicleController.php').subscribe((res: EsResponse) => {
            if (res.status[0] === 1) {
                this.dbService.updateVehicleTbl(res.data);
            }
        });
    }
}
