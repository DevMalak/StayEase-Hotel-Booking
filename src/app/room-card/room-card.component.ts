
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent {

  // Receiving room data from the parent component
  @Input() roomData: any;

 // Creating an event to send data back to the parent
  @Output() roomSelected = new EventEmitter();

  onBookNow() {
    
    // Sending the selected room information to the parent
    this.roomSelected.emit(this.roomData); 
  }
}