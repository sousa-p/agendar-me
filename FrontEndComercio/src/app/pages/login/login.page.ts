import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerService } from 'src/app/core/service/server.service';
import { ToastService } from 'src/app/core/controller/toast.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private Server: ServerService,
    private router: Router,
    private Toast: ToastService,
    private Cookie: CookieService
  ) {}
  @ViewChild('loginForm') loginForm!: NgForm;

  ngOnInit() {}

  login() {
    const data = this.loginForm.form.value;
    data['route'] = 'Comercio';
    data['action'] = 'login';
    this.Server.request(data).subscribe(
      (response) => {
        if (response.retorno === 'success') {
          const dataExpCookie = new Date();
          dataExpCookie.setDate(dataExpCookie.getDate() + 15);

          this.Cookie.set('token', response.JWT, dataExpCookie);
          this.loginForm.reset();
          this.router.navigate(['/home']);
        }
        this.Toast.mostrarToast(response.retorno, 3000, response.mensagem);
      },
      (error) => {
        console.error(error.error.text);
      }
    );
  }
}
