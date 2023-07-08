import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerService } from 'src/app/core/service/server.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  constructor(private Server: ServerService) {}
  @ViewChild('cadastrarForm') cadastrarForm!: NgForm;

  ngOnInit() {}
  cadastrar() {
    const data = this.cadastrarForm.form.value;
    data['route'] = 'user';
    data['action'] = 'cadastrar';
    
    this.Server.request(data).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
