import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/angular/standalone';
import { Pokemon } from '../../models/pokemon.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  imports: [IonCardTitle, IonCardHeader, IonCard,CommonModule],
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;
  @Output() selected = new EventEmitter<string>();

  onClick() {
    this.selected.emit(this.pokemon.id);
  }
}
