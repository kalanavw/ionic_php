import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalPageCancelComponent } from 'src/app/modals/modal-page-cancel/modal-page-cancel.component';
import { ModalPage } from 'src/app/modals/modal-page/modal-page.component';

@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.page.html',
  styleUrls: ['./new-job.page.scss'],
})
export class NewJobPage implements OnInit {
  public date_from: any;
  public date_to: any;
  public duration: any;

  constructor(public modalController: ModalController, public router: Router) { 
   
  }

  ngOnInit() {
    this.date_from = new Date().toISOString();
    this.date_to = new Date().toISOString();
    this.CalcDuration();
  }

  SetNow(time){
    this[time] = new Date;
  }

  CalcDuration(){
    var eventStartTime = new Date(this.date_from);
    var eventEndTime = new Date(this.date_to);
    var duration = eventEndTime.valueOf() - eventStartTime.valueOf();
    var hours = duration/(1000*60*60);
    var hoursMod = duration%(1000*60*60);
    var minutes = hoursMod/(1000*60);
    this.duration = hours.toString() + " Std. " + minutes.toString() + " Min.";
  }

  async presentModal(action) {
    let comp;
    let text;
    let success_btn;
    let fail_btn;
    if ( action == 'success'){
      comp = ModalPage;
      text = "Sind Sie sicher, dass Sie diesen Auftrag abschließen möchten?";
      fail_btn = "Abbrechen";
      success_btn = "Auftrag abschließen";
    }else{
      comp = ModalPageCancelComponent;
      text = "Sind Sie sicher, dass Sie diesen Auftrag abbrechen möchten? Alle eingegebenen Daten gehen verloren.";
      fail_btn = "Abbrechen";
      success_btn = "Auftrag abbrechen";
    }

    const modal = await this.modalController.create({
      component: comp,
      cssClass: 'modal fade modal-mini modal-info',
      componentProps: {
        "text": text,
        "fail_btn": fail_btn,
        "success_btn": success_btn
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data.approved){
      this.router.navigate(['/job-details']);
    }else if (data.cancel){
      this.router.navigate(['/tabs/jobs']);
    }
  }
}
