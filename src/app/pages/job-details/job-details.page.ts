import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalPageCancelComponent } from 'src/app/modals/modal-page-cancel/modal-page-cancel.component';
import { ModalPage } from 'src/app/modals/modal-page/modal-page.component';

import SignaturePad from 'signature_pad';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.page.html',
  styleUrls: ['./job-details.page.scss'],
})
export class JobDetailsPage implements OnInit {
  @ViewChild('canvas', { static: true }) signaturePadElement;
  signaturePad: any;
  canvasWidth: number;
  canvasHeight: number;



  constructor(
    public modalController: ModalController,
    public router: Router,
    private base64ToGallery: Base64ToGallery,
    private androidPermissions: AndroidPermissions,
    private elementRef: ElementRef) { }

    ngOnInit(): void {
      this.init();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
      this.init();
    }
  
    init() {
      const canvas: any = this.elementRef.nativeElement.querySelector('canvas');
      // canvas.width = window.innerWidth;
      // canvas.height = window.innerHeight - 140;
      if (this.signaturePad) {
        this.signaturePad.clear(); // Clear the pad on init
      }
    }

    public ngAfterViewInit(): void {
      this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
      this.signaturePad.clear();
      this.signaturePad.penColor = 'rgb(56,128,255)';
    }
  
    save(): void {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
        result => {
          if (result.hasPermission) {
            const img = this.signaturePad.toDataURL();
            this.base64ToGallery.base64ToGallery(img).then(
              res => console.log('Saved image to gallery ', res),
              err => console.log('Error saving image to gallery ', err)
            );
          }
          else {
            this.requestPermissions();
          }
        },
        err => this.requestPermissions()
      );
    }
  
    requestPermissions() {
      this.androidPermissions.requestPermissions([
        this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE])
        .then(
          res => {
            console.log('Saved image to gallery ', res);
            this.save();
          },
          err => console.log('Error saving image to gallery ', err)
        );
    }
  
    isCanvasBlank(): boolean {
      if (this.signaturePad) {
        return this.signaturePad.isEmpty() ? true : false;
      }
    }
  
    clear() {
      this.signaturePad.clear();
    }
  
    undo() {
      const data = this.signaturePad.toData();
      if (data) {
        data.pop(); // remove the last dot or line
        this.signaturePad.fromData(data);
      }
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
