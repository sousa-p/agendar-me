import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalDatasEspeciaisComponent } from './modal-datas-especiais.component';

describe('ModalDatasEspeciaisComponent', () => {
  let component: ModalDatasEspeciaisComponent;
  let fixture: ComponentFixture<ModalDatasEspeciaisComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDatasEspeciaisComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDatasEspeciaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
