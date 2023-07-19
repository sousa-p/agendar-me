import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DateService } from 'src/app/core/service/date.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private Date: DateService
  ) {}
  
  intervalo?: number;
  restricoes?: any;
  agendamentos?: any;
  
  date?: string;
  presentingElement?: any;
  isOpen: boolean = false;
  horario?: string;

  ngOnInit() {
    this.presentingElement = document.querySelector('.section');
    this.route.params.subscribe((params) => {
      this.date = params['date'];
      if (
        this.date === undefined ||
        this.date === null ||
        !this.Date.isValideDate(this.date) ||
        this.Date.isPastDate(this.date)
      )
        this.router.navigate(['/home']);
    });
  }
  agendar(horas: string) {
    this.isOpen = true;
    this.horario = horas;
  }
}
