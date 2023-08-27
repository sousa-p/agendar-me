import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ComercioService } from 'src/app/core/service/comercio.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  constructor(private Comercio: ComercioService) {}

  ngOnInit() {
    this.carregarPagina();
  }

  public loading: boolean = true;
  public dashboard?: any;
  public haDados: boolean = false;

  public chartServicos?: ChartConfiguration<'bar'>['data'];
  public chartOptionsServicos: ChartOptions<'bar'> = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Quantidade de Serviços',
      },
    },
  };

  public chartCancelamentos?: ChartConfiguration<'doughnut'>['data'];
  public chartOptionsCancelamentos: ChartOptions<'doughnut'> = {
    responsive: false,
    plugins: {
      title: {
        display: true,
        text: 'Métrica de Agendamentos e Cancelamentos',
      },
    },
  };

  public chartMes?: ChartConfiguration<'line'>['data'];
  public chartOptionsMes: ChartOptions<'line'> = {
    responsive: false,
    plugins: {
      title: {
        display: true,
        text: 'Faturamento do mês',
      },
    },
  };

  public chartMensal?:  ChartConfiguration<'bar'>['data'];
  public chartOptionsMensal: ChartOptions<'bar'> = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Faturamento Mensal',
      },
    },
  };

  private carregarPagina() {
    this.loading = true;
    this.Comercio.getDashboardInfos().subscribe(
      (response) => {
        this.dashboard = response;
        this.carregarChartServicos();
        this.carregarChartCancelamentos();
        this.carregarChartMes();
        this.carregarChartMensal();
        this.loading = false;
        this.haDados = this.dashboard.SERVICOS.length || this.dashboard.CANCELAMENTOS || this.dashboard.AGENDAMENTOS;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private carregarChartServicos() {
    const nomesServicos = this.dashboard.SERVICOS.map((servico: any) => {
      return servico.NOME_SERVICO;
    });

    const qtddServicos = this.dashboard.SERVICOS.map((servico: any) => {
      return servico.QUANTIDADE;
    });

    this.chartServicos = {
      labels: nomesServicos,
      datasets: [
        {
          data: qtddServicos,
          label: 'Serviços',
          borderWidth: 1,
        },
      ],
    };
  }

  private carregarChartCancelamentos() {
    this.chartCancelamentos = {
      labels: ['Cancelamentos', 'Agendamentos'],
      datasets: [
        {
          data: [this.dashboard?.CANCELAMENTOS!, this.dashboard?.AGENDAMENTOS!],
          label: 'Dados do úsuario',
          backgroundColor: ['#eb445a', '#2dd36f'],
        },
      ],
    };
  }

  private carregarChartMes() {
    const dias = this.dashboard.MES.DADOS.map((d: any) => {
      return d.DIA;
    });

    const totais = this.dashboard.MES.DADOS.map((t: any) => {
      return t.TOTAL;
    });

    this.chartMes = {
      labels: dias,
      datasets: [
        {
          label: 'Arrecadação',
          data: totais,
          fill: true,
          tension: 0.25
        },
      ],
    };
  }

  private carregarChartMensal() {
    const meses = this.dashboard.MENSAL.map((m: any) => {
      return m.MES;
    });

    const totais = this.dashboard.MENSAL.map((m: any) => {
      return m.TOTAL;
    });


    this.chartMensal = {
      labels: meses,
      datasets: [
        {
          data: totais,
          label: 'Arrecadamento',
          borderWidth: 1,
          backgroundColor: [
            'rgba(255, 99, 132, 0.3)',
            'rgba(75, 192, 192, 0.3)',
            'rgba(255, 159, 64, 0.3)',
            'rgba(54, 162, 235, 0.3)',
            'rgba(255, 205, 86, 0.3)',
            'rgba(153, 102, 255, 0.3)',
            'rgba(201, 203, 207, 0.3)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(255, 159, 64)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
        },
      ],
    };
  }
}
