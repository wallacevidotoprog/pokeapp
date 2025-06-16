import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    RouterLink,
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
    PokemonCardComponent,
    IonCol,
  ],
})
export class HomePage  {
  pokemons: Pokemon[] = [];
  offset = 0;
  limit = 14;
  @ViewChild(IonContent) content!: IonContent;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // ngOnInit() {
  //   this.route.queryParamMap.subscribe((params) => {
  //     const page = Number(params.get('page') || 1);
  //     this.offset = (page - 1) * this.limit;
  //     this.loadPokemons();
      
  //   });
  // }
  ionViewWillEnter() {
      this.route.queryParamMap.subscribe((params) => {
      const page = Number(params.get('page') || 1);
      this.offset = (page - 1) * this.limit;
      this.loadPokemons();
  });
    return;
    this.loadPokemons();
  }
  async loadPokemons() {
    this.pokemons = await this.pokemonService.getPokemonList(
      this.limit,
      this.offset
    );
  }

  nextPage() {
    const currentPage = this.offset / this.limit + 1;
    const nextPage = currentPage + 1;
    this.router.navigate([], {
      queryParams: { page: nextPage },
      queryParamsHandling: 'merge',
    });
    this.content.scrollToTop(500);
    return;
    this.offset += 14;
    this.loadPokemons();
  }

  prevPage() {
    const currentPage = this.offset / this.limit + 1;
    const prevPage = currentPage - 1;
    if (this.offset >= 1) {
      this.router.navigate([], {
        queryParams: { page: prevPage },
        queryParamsHandling: 'merge',
      });
    }
    this.content.scrollToTop(500);
    
    return;
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
