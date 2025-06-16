import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonProgressBar,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { PokemonService } from '../../services/pokemon.service';

import { addIcons } from 'ionicons';
import { flash, logoIonic } from 'ionicons/icons';

@Component({
  selector: 'app-pokemonDetailsPage',
  standalone: true,
  templateUrl: './pokemonDetailsPage.component.html',
  styleUrls: ['./pokemonDetailsPage.component.scss'],
  imports: [
    IonNote,
    IonLabel,
    IonChip,
    IonProgressBar,
    IonIcon,
    IonButton,
    IonList,
    IonCardContent,
    IonCardSubtitle,
    IonCard,
    CommonModule,
    IonContent,
    IonButtons,
    IonCardTitle,
    IonItem,
    IonHeader,
    IonTitle,
    IonBackButton,
    IonToolbar,
    IonCardHeader,
    RouterModule,
  ],
})
export class DetailsPage implements OnInit {
  pokemon: any;
  isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {
    addIcons({ flash, logoIonic });
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');    
    if (id) {
      this.pokemon = await this.pokemonService.getPokemonById(id);
      this.isFavorite = this.pokemonService.isFavorite(id);

      console.log(this.pokemonService.isFavorite(id));      
    }
  }

  toggleFavorite() {
    if (this.isFavorite) {
      this.pokemonService.removeFavorite(this.pokemon.id);
    } else {
      this.pokemonService.saveFavorite(this.pokemon);
    }
    this.isFavorite = !this.isFavorite;
  }
}
