import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// التعديل هنا: غيري RoomsComponent إلى RoomsListComponent
import { RoomsListComponent } from './rooms-list/rooms-list.component'; 

import { BookingFormComponent } from './booking-form/booking-form.component';
import { RoomCardComponent } from './room-card/room-card.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RoomsListComponent, // التعديل هنا أيضاً
    BookingFormComponent,
    RoomCardComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }