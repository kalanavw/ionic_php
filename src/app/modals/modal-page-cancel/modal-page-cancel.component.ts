import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-page-cancel',
  templateUrl: './modal-page-cancel.component.html',
  styleUrls: ['./modal-page-cancel.component.scss'],
})
export class ModalPageCancelComponent implements OnInit {

  @Input() text: string;
  @Input() fail_btn: string;
  @Input() success_btn: string;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}

  dismiss(value) {
    this.modalCtrl.dismiss({
      'cancel': value
    });
  }
}

