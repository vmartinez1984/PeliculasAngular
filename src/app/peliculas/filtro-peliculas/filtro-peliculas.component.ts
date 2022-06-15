import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private activateRoute: ActivatedRoute
  ) { }

  formGroup: FormGroup;
  generos = [
    { id: 1, nombre: "Drama" },
    { id: 2, nombre: "Comedia" }
  ]

  peliculas = [
    { titulo: 'SpiderMan', enCines: false, proximosExtrenos: true, generos: [1, 2], poster: "https://cdn.pocket-lint.com/r/s/485x/assets/images/159643-tv-news-spider-man-no-way-home-image1-dryautoefj.jpg" },
    { titulo: 'Moana', enCines: false, proximosExtrenos: false, generos: [1], poster: "https://cdn.pocket-lint.com/r/s/485x/assets/images/159643-tv-news-spider-man-no-way-home-image1-dryautoefj.jpg" },
    { titulo: 'Inception', enCines: false, proximosExtrenos: false, generos: [3], poster: "https://cdn.pocket-lint.com/r/s/485x/assets/images/159643-tv-news-spider-man-no-way-home-image1-dryautoefj.jpg" }
  ]

  peliculasOriginal = this.peliculas;

  formularioInicial = {
    titulo: '',
    generoId: 0,
    proximosExtrenos: false,
    enCines: false
  };

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(this.formularioInicial);

    this.formGroup.valueChanges.subscribe(valores => {
      //console.log(valores);
      this.peliculas = this.peliculasOriginal;
      this.buscarPeliculas(valores);
      this.escribirParametrosDeBusquedaEnLaUrl();
    })
  }

  private leerValoresUrl() {
    this.activateRoute.queryParams.subscribe((paramas) => {
      var objeto: any = {};

      if (paramas.titulo){
        objeto.titulo = paramas.titulo;
      }
      
    });
  }

  private escribirParametrosDeBusquedaEnLaUrl() {
    var queryString = [];
    var valoresFormulario = this.formGroup.value;

    if (valoresFormulario.titulo) {
      queryString.push(`titulo=${valoresFormulario.titulo}`);
    }

    this.location.replaceState('peliculas/buscar', queryString.join('&'));
  }

  buscarPeliculas(valores: any) {
    if (valores.titulo) {
      this.peliculas = this.peliculas.filter(pelicula => pelicula.titulo.indexOf(valores.titulo) !== -1);
    }

    if (valores.generoId) {
      this.peliculas = this.peliculas.filter(pelicula => pelicula.generos.indexOf(valores.generoId) !== -1);
    }

    if (valores.proximosExtrenos) {
      this.peliculas = this.peliculas.filter(pelicula => pelicula.proximosExtrenos);
    }

    if (valores.enCines) {
      this.peliculas = this.peliculas.filter(pelicula => pelicula.enCines);
    }
  }

  limpiar() {
    this.formGroup.patchValue(this.formularioInicial);
  }

}
