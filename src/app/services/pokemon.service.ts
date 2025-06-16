import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl =  `${environment.api_pokemon}pokemon`;
  private favoritesKey = 'favoritePokemons';

  async getPokemonList(limit = 20, offset = 0) {
    const response = await axios.get(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
    const results = response.data.results;

    // Recupera ID e imagem para cada Pokémon
    return results.map((p: any) => {
      const id = p.url.split('/')[6];
      return {
        id,
        name: p.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      };
    });
  }

  async getPokemonById(id: string) :Promise<Pokemon> {
    const response = await axios.get(`${this.apiUrl}/${id}`);
    const data = response.data;

    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      base_experience: data.base_experience,
      image: data.sprites.front_default,
      types: data.types.map((t: any) => t.type.name),
      abilities: data.abilities.map((a: any) => a.ability.name),
      stats: data.stats.map((s: any) => ({
        name: s.stat.name,
        value: s.base_stat
      }))
    };
  }

  getFavorites(): any[] {
    const raw = localStorage.getItem(this.favoritesKey);
    return raw ? JSON.parse(raw) : [];
  }

  saveFavorite(pokemon: any) {
    const favorites = this.getFavorites();
    if (!favorites.find(p => p.id === pokemon.id)) {
      favorites.push(pokemon);
      localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
    }
  }

  removeFavorite(id: string) {
    const updated = this.getFavorites().filter(p => p.id !== id);
    localStorage.setItem(this.favoritesKey, JSON.stringify(updated));
  }

  isFavorite(id: string): boolean {
    return this.getFavorites().some(p => p.id === id);
  }
}
