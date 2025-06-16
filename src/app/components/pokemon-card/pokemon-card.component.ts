import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  imports: [IonCardTitle, IonCardHeader, IonCard, CommonModule],
})
export class PokemonCardComponent implements OnInit {
  constructor(private pokemonService: PokemonService) {}
 
  isFavorite: boolean = false;
 
  @Input() pokemon!: Pokemon;
  @Output() selected = new EventEmitter<string>();
 ngOnInit(): void {
    this.isFavorite = this.pokemonService.isFavorite(this.pokemon.id);
  }
  onClick() {
    this.selected.emit(this.pokemon.id);
  }
}
