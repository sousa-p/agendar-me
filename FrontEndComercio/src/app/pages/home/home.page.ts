import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseISO } from 'date-fns';
import { DateService } from 'src/app/core/controller/date.service';
import { ComercioService } from 'src/app/core/service/comercio.service';
import { RestricaoService } from 'src/app/core/service/restricao.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    public Date: DateService,
    public comercio: ComercioService,
    private router: Router,
    private Restricao: RestricaoService
  ) {}

  restricoes?: any;

  ngOnInit() {
    this.Restricao.getDiasRestricoes().subscribe(
      (response) => {
        this.restricoes = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  clicarDia(event: any) {
    const date = event.detail.value.split('T')[0];
    this.router.navigate(['/horario', date]);
  }

  ehRestrita = (dateString: string) => {
    const ehDiaEspecial = this.restricoes.DATAS_ESPECIAIS.includes(dateString);
    if (ehDiaEspecial) return true;
    const ehDiaSemanaValido = !this.restricoes.DIAS_SEMANA.includes(
      parseISO(dateString).getDay()
    );
    let estaIntervalo = true;

    this.restricoes.INTERVALOS.forEach((intervalo: any) => {
      const date = parseISO(dateString);
      const inicio = parseISO(intervalo.DATA_INICIO);
      const fim = intervalo.DATA_FIM ? parseISO(intervalo.DATA_FIM) : null;

      if (!this.Date.estaIntervaloData(date, inicio, fim))
        estaIntervalo = false;
    });
    return ehDiaSemanaValido && estaIntervalo;
  };
}
