import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { generoCreacionDto } from '../genero';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css']
})
export class EditarGeneroComponent implements OnInit {

  constructor(private router: Router) { }

  modelo: generoCreacionDto = { nombre: 'Drama' }

  ngOnInit(): void {
  }

  guardar(genero: generoCreacionDto) {
    console.log(genero);
    this.router.navigate(["/generos"]);
  }
}
