import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { User } from 'src/app/core/interface/User';
import { ComercioService } from 'src/app/core/service/comercio.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  constructor(private Comercio: ComercioService) {}

  ngOnInit() {
    this.Comercio.getClientes().subscribe(
      (response) => {
        this.clientes = response;
        this.clientesFiltrados = response;

        this.mostrarItensClientes();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  clientes?: User[];
  clientesFiltrados: User[] = [];
  clientesPagina: User[] = [];

  clienteSelecionado?: User;
  clienteAtual: number = 0;

  isModalOpen: boolean = false;

  clicarCliente(cliente: User) {
    this.clienteSelecionado = cliente;
    this.setModalOpen(true);
  }

  setModalOpen(open: boolean) {
    this.isModalOpen = open;
  }

  carregarClientesPagina(ev: any) {
    this.mostrarItensClientes();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  mostrarItensClientes() {
    this.clienteAtual += 15;
    this.clientesPagina = this.clientesFiltrados?.slice(0, this.clienteAtual);
  }

  filtrar(event: any) {
    const pesquisa = event.target.value.toLowerCase();
    this.clientesFiltrados = this.clientes!.filter(
      (d) => {
        return d.NOME_USER.toLocaleLowerCase().startsWith(pesquisa.trim().toLowerCase());
      }
    );
    this.clienteAtual = 0;
    this.mostrarItensClientes();
  }
}
