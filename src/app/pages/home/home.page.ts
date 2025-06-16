import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
import { PokemonCardComponent } from "../../components/pokemon-card/pokemon-card.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    RouterLink,
    IonIcon,
    IonButtons,
    IonButton,
    IonFooter,
    IonRow,
    IonGrid,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CommonModule,
    PokemonCardComponent
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
    this.pokemons = await this.pokemonService.getPokemonList(14, this.offset);
  }

  nextPage() {
    this.offset += 14;
    this.loadPokemons();
  }

  prevPage() {
    if (this.offset >= 14) {
      this.offset -= 14;
      this.loadPokemons();
    }
  }

  goToDetails(id: string) {

    console.log(`Navigating to details for Pokémon ID: ${id}`);
    
    this.router.navigate(['/details', id]);
  }
}
