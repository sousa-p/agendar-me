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

  public clientes: User[] = [];
  public clientesFiltrados: User[] = [];
  public clientesPagina: User[] = [];

  public clienteSelecionado?: User;
  public clienteAtual: number = 0;

  public isModalOpen: boolean = false;

  public loading: boolean = true;

  ngOnInit() {
    this.location.onUrlChange((url: string) => {
      if (this.isModalOpen) location.reload();
    });

    this.carregarPagina();
  }

  private carregarPagina() {
    this.loading = true;
    this.clientes = [];
    this.clientesFiltrados = [];
    this.clientesPagina = [];
    this.clienteSelecionado = undefined;
    this.clienteAtual = 0;

    this.Comercio.getClientes().subscribe(
      (response) => {
        this.clientes = response;
        this.clientesFiltrados = response;
        this.mostrarItensClientes();

        this.loading = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public clicarCliente(cliente: User) {
    this.clienteSelecionado = cliente;
    this.setModalOpen(true);
  }

  public setModalOpen(open: boolean) {
    this.isModalOpen = open;
  }

  public carregarClientesPagina(ev: any) {
    this.mostrarItensClientes();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  private mostrarItensClientes() {
    this.clienteAtual += 15;
    this.clientesPagina = this.clientesFiltrados?.slice(0, this.clienteAtual);
  }

  public filtrar(event: any) {
    const pesquisa = event.target.value.toLowerCase();
    this.clientesFiltrados = this.clientes!.filter((cliente) => {
      const nomeLimpado = cliente.NOME_USER.toLocaleLowerCase().trim();
      const telLimpado = cliente.TEL_USER.trim();
      const regex = /[+]?55[ ]?/;
      const pesquisaLimpada = pesquisa
        .trim()
        .toLowerCase()
        .replace(regex, '')
        .replace();
      return (
        nomeLimpado.startsWith(pesquisaLimpada) ||
        telLimpado.startsWith(pesquisaLimpada)
      );
    });
    this.clienteAtual = 0;
    this.mostrarItensClientes();
  }
}
