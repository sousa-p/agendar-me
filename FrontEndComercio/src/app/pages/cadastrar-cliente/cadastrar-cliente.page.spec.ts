import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastrarClientePage } from './cadastrar-cliente.page';

describe('CadastrarClientePage', () => {
  let component: CadastrarClientePage;
  let fixture: ComponentFixture<CadastrarClientePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CadastrarClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
