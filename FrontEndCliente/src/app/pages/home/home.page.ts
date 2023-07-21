import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseISO } from 'date-fns';
import { DateService } from 'src/app/core/service/date.service';
import { RestricaoService } from 'src/app/core/service/restricao.service';
import { UserService } from 'src/app/core/service/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    public date: DateService,
    public user: UserService,
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
  };

  ehRestrita = (date: string) => {
    const ehDiaEspecial = this.restricoes.DATAS_ESPECIAIS.includes(date);
    if (ehDiaEspecial) return true;
    
    const ehDiaSemanaValido = !(this.restricoes.DIAS_SEMANA.includes(parseISO(date).getDay()));
    let estaIntervalo = true;

    this.restricoes.INTERVALOS.forEach((intervalo: any) => {
      if (!this.date.estaIntervalo(date, intervalo.DATA_INICIO, intervalo.DATA_FIM))
        estaIntervalo = false;
    });
    return ehDiaSemanaValido && estaIntervalo;
  }
}
