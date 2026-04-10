import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {

  guestName: string = '';
  guestEmail: string = '';
  checkInDate: string = '';
  checkOutDate: string = '';

  roomName: string = '';
  roomPrice: number = 0;
  selectedRoomObj: any = null;

  confirmationMessage: string = '';

  constructor() { }

  ngOnInit(): void {
    // LocalStorage Usage


    let storedData = localStorage.getItem('selectedRoom');
    if (storedData) {
      this.selectedRoomObj = JSON.parse(storedData); 
      this.roomName = this.selectedRoomObj.name; 
      this.roomPrice = this.selectedRoomObj.price;
    }
  }

  onConfirmBooking(): void {

    // Form Validation Logic
    
    if (this.guestName.trim().length < 3) {
      this.confirmationMessage = "Error: Please enter a valid Full Name (at least 3 characters).";
      return;
    }

    if (!this.guestEmail.includes('@') || !this.guestEmail.includes('.')) {
      this.confirmationMessage = "Error: Please enter a valid Email address (must include @ and .)";
      return;
    }

  
    if (!this.checkInDate || !this.checkOutDate) {
      this.confirmationMessage = "Error: Please select both Check-in and Check-out dates.";
      return;
    }

    let d1 = new Date(this.checkInDate);
    let d2 = new Date(this.checkOutDate);
    let today = new Date();
    today.setHours(0,0,0,0); 
   
    if (d1 < today) {
      this.confirmationMessage = "Error: Check-in date cannot be in the past!";
      return;
    }
    if (d2 <= d1) {
      this.confirmationMessage = "Error: Check-out date must be after Check-in date!";
      return;
    }

    let timeDiff = d2.getTime() - d1.getTime();
    let numNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    let totalPrice = numNights * this.roomPrice;

    this.confirmationMessage = `Great! ${this.guestName}, your booking for [${this.roomName}] is ready. Total for ${numNights} nights is ${totalPrice} OMR.`;
  }

  
//  Clears the form and removes the summary message 
   
  onReset(): void {
    this.guestName = '';
    this.guestEmail = '';
    this.checkInDate = '';
    this.checkOutDate = '';
    this.confirmationMessage = '';
  }
}