import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/interface/User';

@Component({
  selector: 'app-linha-perfil',
  templateUrl: './linha-perfil.component.html',
  styleUrls: ['./linha-perfil.component.scss'],
})
export class LinhaPerfilComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Input() public perfil?: User;
  @Input() public noLine: boolean = false;

}
