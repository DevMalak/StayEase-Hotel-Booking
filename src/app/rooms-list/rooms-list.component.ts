import { Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { RoomsService } from '../services/rooms.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-rooms-list', 
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit {

  hotelName: string = "StayEase Grand Hotel";
  imgSource: string = "assets/3.jpg"; 
  isBookingDisabled: boolean = true;

  searchText: string = "";
  maxPrice: number = 220;
  showOnlyAvailable: boolean = false; 
  bookingMessage: string = "";

  // arrays to store data
  roomList: Room[] = []; 
  filteredRooms: Room[] = [];

  // dependency injection
  constructor(private _RoomsService: RoomsService, private _Router: Router) { }

  // get data from service on start
  ngOnInit(): void {
    this.roomList = this._RoomsService.getAllRooms();
    this.filteredRooms = [...this.roomList];
  }

  // filter function for search and price
  applyFilter(): void {
    let sourceArray = this.showOnlyAvailable ? this._RoomsService.getAvailableRooms() : this.roomList;

    this.filteredRooms = sourceArray.filter(room => {
      let matchesName = room.name.toLowerCase().includes(this.searchText.toLowerCase());
      let matchesPrice = room.price <= this.maxPrice;
      return matchesName && matchesPrice;
    });
  }

  // function to save room and go to booking
  onBookRoom(room: any): void {
    this.bookingMessage = "You have selected: " + room.name;
    
    // save to local storage
    localStorage.setItem('selectedRoom', JSON.stringify(room));

    // navigation
    this._Router.navigate(['/booking']);
    
    console.log("Room Object saved fully:", room);
  }

  // simple click event
  onBookClick(e: any): void {
    this.bookingMessage = "Room booking process has started!";
  }
}