import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; 
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  // Paths for all website pages
  { path: '', redirectTo: 'home', pathMatch: 'full' },


  { path: 'home', component: HomeComponent },

  { path: 'rooms', component: RoomsListComponent },

  { path: 'booking', component: BookingFormComponent },

  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
 
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }