import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCardComponent } from "../../components/pokemon-card/pokemon-card.component";

@Component({
  selector: 'app-pokemonFavorites',
  standalone: true,
  templateUrl: './pokemonFavorites.component.html',
  styleUrls: ['./pokemonFavorites.component.scss'],
  imports: [
    IonTitle,
    IonBackButton,
    IonButtons,
    IonToolbar,
    IonText,
    IonGrid,
    CommonModule,
    IonHeader,
    IonContent,
    PokemonCardComponent,
    IonRow,
],
})
export class FavoritesPage implements OnInit {
  favorites: any[] = [];

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit() {
    this.loadFavorites();
  }

  ionViewWillEnter() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favorites = this.pokemonService.getFavorites();
  }

  goToDetails(id: string) {
    this.router.navigate(['/details', id]);
  }
}
