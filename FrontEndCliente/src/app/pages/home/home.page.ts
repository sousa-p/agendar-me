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
        console.log(this.restricoes.DIAS_SEMANA)
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

  ehRestrita(date: string) {
    return !(this.restricoes.DIAS_SEMANA.includes(parseISO(date).getDay()));
  }
}
