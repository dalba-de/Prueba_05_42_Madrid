import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from "./login/login.component";
import { CallbackComponent } from "./callback/callback.component";
import { InfoComponent } from "./info/info.component";
import { SkillsComponent } from "./skills/skills.component";

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'callback', component: CallbackComponent },
    { path: 'index', component: IndexComponent},
    { path: 'info', component: InfoComponent},
    { path: 'skills', component: SkillsComponent},
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
