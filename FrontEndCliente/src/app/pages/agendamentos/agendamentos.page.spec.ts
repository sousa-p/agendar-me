import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendamentosPage } from './agendamentos.page';

describe('AgendamentosPage', () => {
  let component: AgendamentosPage;
  let fixture: ComponentFixture<AgendamentosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgendamentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
