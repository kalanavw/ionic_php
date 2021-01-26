import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobModalComponent } from './job-modal.component';

describe('JobModalComponent', () => {
  let component: JobModalComponent;
  let fixture: ComponentFixture<JobModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
