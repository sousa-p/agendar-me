import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Servicos } from 'src/app/core/interface/Servicos';
import { ServicosService } from 'src/app/core/service/servicos.service';

@Component({
  selector: 'app-modal-agendar',
  templateUrl: './modal-agendar.component.html',
  styleUrls: ['./modal-agendar.component.scss'],
})
export class ModalAgendarComponent implements OnInit {
  constructor(private Servicos: ServicosService) {}

  @Input() isModalOpen: boolean = false;
  @Input() horario?: string;

  @Output() fechar = new EventEmitter();

  @ViewChild('agendarForm') agendarForm!: NgForm;

  servicos?: Servicos[];
  servicosSelecionados: Servicos[] = [];
  total: number = 0;
  ngOnInit() {
    this.Servicos.getServicos().subscribe(
      (response) => {
        this.servicos = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  attServicosSelecionados(event: any) {
    const servico: any = event.detail.value;
    if (event.detail.checked) {
      this.servicosSelecionados.push(servico);
      this.total += Number(servico.PRECO_SERVICO);
    } else {
      const id = this.servicosSelecionados.indexOf(servico);
      this.total -= Number(this.servicosSelecionados[id].PRECO_SERVICO);
      if (id !== -1) this.servicosSelecionados.splice(id, 1);
    }
  }
  agendar() {
    console.log(this.agendarForm.form.value);
  }
}
