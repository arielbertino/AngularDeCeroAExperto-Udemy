import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit{

  public hero?: Hero;


  constructor(
    private heroeService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroeService.getHeroById( id )),
      )
      .subscribe( hero => {
        if ( !hero ) return this.router.navigate([ '/heroes/list' ])

        this.hero = hero;
        return;
      })
  }

  goBack():void {
    this.router.navigateByUrl('heroes/list')
  }
}
