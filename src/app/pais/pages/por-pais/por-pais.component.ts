import { Component, OnInit } from '@angular/core';
import {PaisService} from '../../services/pais.service';
import {Country} from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
    li {
      cursor: pointer;
    }
  `
  ]
})
export class PorPaisComponent implements OnInit {
  termino = '';
  hayError = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor( private paisService: PaisService) { }

  ngOnInit(): void {
  }

  buscar( termino: string) {
    this.mostrarSugerencias = false;
    this.hayError = false;
    this.termino = termino;
    this.paisesSugeridos = [];
    this.paisService.buscarPais(this.termino).subscribe(
      (paises) => {
        this.paises = paises;
      },
      ((err) => {
        this.hayError = true;
        this.paises = [];
      })
    );


  }

  sugerencias(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais(termino).subscribe(
      (paises: Country[]) => {
        this.paisesSugeridos = paises.splice(0, 3);
      },
      (error) => {this.paisesSugeridos = [];}
    );
    // TODO: Crear sugerencias
  }

  buscarSugerido(termino: string){
    this.buscar(termino);
  }

}
