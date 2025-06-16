import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonIcon,
    IonButtons,
    IonButton,
    IonFooter,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonCol,
    IonRow,
    IonGrid,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CommonModule,
  ],
})
export class HomePage implements OnInit {
  pokemons: Pokemon[] = [];
  offset = 0;

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit() {
    this.loadPokemons();
  }

  async loadPokemons() {
    this.pokemons = await this.pokemonService.getPokemonList(20, this.offset);
  }

  nextPage() {
    this.offset += 20;
    this.loadPokemons();
  }

  prevPage() {
    if (this.offset >= 20) {
      this.offset -= 20;
      this.loadPokemons();
    }
  }

  goToDetails(id: string) {
    this.router.navigate(['/details', id]);
  }
}
