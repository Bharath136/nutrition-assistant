import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SuggestionsComponent } from './components/suggestions/suggestions.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PreviousSuggestionsComponent } from './components/previous-suggestions/previous-suggestions.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'suggestions-form',component:SuggestionsComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'my-previous-suggestions',component:PreviousSuggestionsComponent},
  {path:'**', redirectTo:'/',  pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
