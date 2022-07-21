import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {


  termino: string = '';
  heroes: Heroe[] = [];

  heroeBuscado: Heroe | undefined;
  constructor(private heroeService: HeroesService) { }

  ngOnInit(): void {
  }



  buscando() {
    console.log(this.termino);
    this.heroeService.getSugerencias(this.termino).
      subscribe(heroes => { this.heroes = heroes });

  }

  opcionSeleccionada(opcionSeleccionada: MatAutocompleteSelectedEvent) {
    const heroe: Heroe = opcionSeleccionada.option.value;
    if (!heroe) {
      this.heroeBuscado = undefined;
      return;
    }
    this.termino = heroe.superhero;

    this.heroeService.getHeroe(heroe.id!)
      .subscribe(heroe => {
        this.heroeBuscado = heroe;
      })
  }



}
