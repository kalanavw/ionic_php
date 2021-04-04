import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SQLitePorter} from '@ionic-native/sqlite-porter/ngx';
import {SQLite} from '@ionic-native/sqlite/ngx';
import {SQLiteObject} from '@ionic-native/sqlite';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DbService {
    private storage: SQLiteObject;
    private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private vehicles: any[];

    constructor(
        private platform: Platform,
        private sqlite: SQLite,
        private httpClient: HttpClient,
        private sqlPorter: SQLitePorter,
    ) {
        this.init();
    }

    init() {
        this.platform.ready().then(() => {
            this.sqlite.create({
                name: 'kidVisual.db',
                location: 'default'
            }).then((db: SQLiteObject) => {
                this.storage = db;
            });
        });
    }

    dbState() {
        return this.isDbReady.asObservable();
    }

    initDB() {
        this.httpClient.get(
            'assets/create.sql',
            {responseType: 'text'}
        ).subscribe(data => {
            this.sqlPorter.importSqlToDb(this.storage, data)
                .then(_ => {
                    this.isDbReady.next(true);
                })
                .catch(error => console.error(error));
        });
    }

    updateVehicleTbl(data: any) {
        console.log(this.storage);
        console.log(data);
        this.storage.executeSql('DELETE FROM vehicle', []).then(() => {
            this.storage.executeSql('INSERT INTO vehicle (id, Name) VALUES (?, ?)', data)
                .then(() => {
                    console.log('Vehicle table sync success');
                    this.loadVehicles();
                });
        }).catch((err) => {
            console.log(err);
            console.log('Delete Error' + err);
        });
    }

    private loadVehicles() {
        this.storage.executeSql("SELECT * FROM vehicle", []).then(res => {
            console.log(res);

            const tmp = [];
            for (let i = 0; i < res.rows.length; i++) {
                tmp.push({ id: res.rows.item(i).id, createdAt: res.rows.item(i).createdAt, title: res.rows.item(i).title, isDone: res.rows.item(i).isDone })
            }
            this.todos = tmp;
            console.log(this.todos);

        }).catch(() => {
            console.log("READ ERROR");
        })
    }
}
