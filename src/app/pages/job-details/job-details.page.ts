import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalPageCancelComponent } from 'src/app/modals/modal-page-cancel/modal-page-cancel.component';
import { ModalPage } from 'src/app/modals/modal-page/modal-page.component';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.page.html',
  styleUrls: ['./job-details.page.scss'],
})
export class JobDetailsPage implements OnInit {

  constructor(public modalController: ModalController, public router: Router) { }

  ngOnInit() {
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
      text = "Sind Sie sicher, dass Sie diesen Auftrag bearbeiten möchten? Die erfasste Unterschrift geht somit verloren.";
      fail_btn = "Abbrechen";
      success_btn = "Auftrag bearbeiten";
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
      this.router.navigate(['/finished']);
    }else if (data.cancel){
      this.router.navigate(['/new-job']);
    }
  }
}
