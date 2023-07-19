import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateService } from 'src/app/core/service/date.service';
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
    private router: Router
  ) {}

  ngOnInit() {console.log(this.date.getISOTodayDate())}

  clicarDia(event: any) {
    const date = event.detail.value.split('T')[0];
    this.router.navigate(['/horario', date]);
  }
}
