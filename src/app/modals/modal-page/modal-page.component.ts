import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
})
export class ModalPage implements OnInit {

  @Input() text: string;
  @Input() fail_btn: string;
  @Input() success_btn: string;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}

  dismiss(value){
    this.modalCtrl.dismiss({
      'approved': value
    });
  }

}
