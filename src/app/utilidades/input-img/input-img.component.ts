import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { toBase64 } from '../utilidades';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.css']
})
export class InputImgComponent implements OnInit {

  constructor() { }
  imagenBase64: string;

  @Input() urImagenImagenActual: string;

  @Output() archivoSeleccionado: EventEmitter<File> = new EventEmitter<File>();
  ngOnInit(): void {
  }

  change(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      toBase64(file)
        .then((data: any) => { this.imagenBase64 = data })
        .catch(error => console.error(error))
      this.archivoSeleccionado.emit(file)
      this.urImagenImagenActual = '';
    }
  }
}
