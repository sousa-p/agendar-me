import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalRestricoesDatasComponent } from './modal-restricoes-datas.component';

describe('ModalRestricoesDatasComponent', () => {
  let component: ModalRestricoesDatasComponent;
  let fixture: ComponentFixture<ModalRestricoesDatasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRestricoesDatasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalRestricoesDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
