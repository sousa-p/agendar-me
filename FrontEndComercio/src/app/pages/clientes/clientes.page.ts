import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/interface/User';
import { ComercioService } from 'src/app/core/service/comercio.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  constructor(private Comercio: ComercioService) { }

  ngOnInit() {
    this.Comercio.getClientes().subscribe(
      (response) => {
        this.clientes = response;
      },
      (error) =>  {
        console.error(error);
      }
    )
  }

  clientes?: User[];
}
