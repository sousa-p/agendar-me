import { Location } from '@angular/common';
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
  constructor(private Comercio: ComercioService, private location: Location) {}

  ngOnInit() {
    this.location.onUrlChange((url: string) => {
      if (this.isModalOpen) location.reload();
    });

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
      (cliente) => {
        const nomeLimpado = cliente.NOME_USER.toLocaleLowerCase().trim();
        const telLimpado = cliente.TEL_USER.trim();
        const regex = /[+]?55[ ]?/
        const pesquisaLimpada = pesquisa.trim().toLowerCase().replace(regex,'').replace();
        return nomeLimpado.startsWith(pesquisaLimpada) || telLimpado.startsWith(pesquisaLimpada);
      }
    );
    this.clienteAtual = 0;
    this.mostrarItensClientes();
  }
}
