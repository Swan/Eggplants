import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';

import { routing } from './app.routes';
import { CoverComponent } from './home/cover/cover.component';
import { SearchComponent } from './home/search/search.component';
import { BeatmapListComponent } from './home/beatmap-list/beatmap-list.component';

import { DirectService } from './nav/direct.service';
import { BeatmapListService } from './home/beatmap-list/beatmap-list.service';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './register/register.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    CoverComponent,
    SearchComponent,
    BeatmapListComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [DirectService, BeatmapListService, BeatmapListComponent, RegisterService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
