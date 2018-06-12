import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { AuthGuardService } from './common/guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'games/:id', component: GameComponent, canActivate: [AuthGuardService] },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuardService] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
