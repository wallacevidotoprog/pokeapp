import { TestBed } from '@angular/core/testing';
import { PokemonService } from './pokemon.service';
import { Pokemon } from '../models/pokemon.model';
import axios from 'axios';

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonService],
    });
    service = TestBed.inject(PokemonService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve retornar uma lista de pokémons formatada', async () => {
    const mockData = {
      data: {
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        ],
      },
    };

    spyOn(axios, 'get').and.resolveTo(mockData);

    const result = await service.getPokemonList(1, 0);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({
      id: '1',
      name: 'bulbasaur',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    });
  });

  it('deve retornar um pokémon pelo ID', async () => {
    const mockData = {
      data: {
        id: 25,
        name: 'pikachu',
        height: 4,
        weight: 60,
        base_experience: 112,
        sprites: { front_default: 'pikachu.png' },
        types: [{ type: { name: 'electric' } }],
        abilities: [{ ability: { name: 'static' } }],
        stats: [{ stat: { name: 'speed' }, base_stat: 90 }],
      },
    };

    spyOn(axios, 'get').and.resolveTo(mockData);

    const result = await service.getPokemonById('25');
    expect(result.name).toBe('pikachu');
    expect(result.types).toContain('electric');
  });

  it('deve adicionar e verificar favoritos no localStorage', () => {
    const pokemon: Pokemon = {
      id: '99',
      name: 'testmon',
      height: 1,
      weight: 1,
      base_experience: 1,
      image: 'img.png',
      types: ['test'],
      abilities: ['test'],
      stats: [{ name: 'test', value: 1 }],
    };

    spyOn(localStorage, 'getItem').and.returnValue('[]');
    const setItemSpy = spyOn(localStorage, 'setItem');

    service.saveFavorite(pokemon);
    expect(setItemSpy).toHaveBeenCalled();
  });

  it('deve remover um favorito do localStorage', () => {
    const mockFavorites = JSON.stringify([{ id: '1', name: 'pikachu' }]);
    spyOn(localStorage, 'getItem').and.returnValue(mockFavorites);
    const setItemSpy = spyOn(localStorage, 'setItem');

    service.removeFavorite('1');
    expect(setItemSpy).toHaveBeenCalled();
  });

  it('deve verificar se é favorito', () => {
    const mockFavorites = JSON.stringify([{ id: '1', name: 'pikachu' }]);
    spyOn(localStorage, 'getItem').and.returnValue(mockFavorites);

    expect(service.isFavorite('1')).toBeTrue();
    expect(service.isFavorite('2')).toBeFalse();
  });
});
