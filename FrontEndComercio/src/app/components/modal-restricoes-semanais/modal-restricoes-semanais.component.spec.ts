import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalRestricoesSemanaisComponent } from './modal-restricoes-semanais.component';

describe('ModalRestricoesSemanaisComponent', () => {
  let component: ModalRestricoesSemanaisComponent;
  let fixture: ComponentFixture<ModalRestricoesSemanaisComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRestricoesSemanaisComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalRestricoesSemanaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
