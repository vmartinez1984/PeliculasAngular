import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorCreacionDto, actorDto } from '../actor';


@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.css']
})
export class FormularioActoresComponent implements OnInit {

  @Input() modelo: actorDto;
  @Output() submit : EventEmitter<actorCreacionDto> = new EventEmitter<actorCreacionDto>();
  formGroup : FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      nombre: [
        '',
        {
          validators: [Validators.required]
        }
      ],
      fechaNacimiento: '',
      foto :''
    });

    if(this.modelo !== undefined){
      this.formGroup.patchValue(this.modelo);
    }
  }

  onSubmit(){
    this.submit.emit(this.formGroup.value);
  }

  archivoSeleccionado(file: any){
    this.formGroup.get('foto')?.setValue(file);
  }
}
