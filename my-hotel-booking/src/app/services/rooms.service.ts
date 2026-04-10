// src/app/services/rooms.service.ts
import { Injectable } from '@angular/core';
import { Room } from '../room';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  
public rooms: Room[] = [
    {
      id: 1,
      name: "Classic Single",
      type: "Single",
      price: 55,
      available: true,
      rating: 4.1,
      description: "A cozy room with a queen bed, work desk, and city view.",
      amenities: ["Wi-Fi", "TV", "Air Conditioning"],
      imageSrc: "assets/1.jpg"
    },
    {
      id: 2,
      name: "Deluxe Double",
      type: "Double",
      price: 90,
      available: true,
      rating: 4.5,
      description: "Spacious double room with two queen beds and garden view.",
      amenities: ["Wi-Fi", "TV", "Mini Bar", "Bathtub"],
      imageSrc: "assets/2.avif"
    },
    {
      id: 3,
      name: "Premium Suite",
      type: "Suite",
      price: 180,
      available: true,
      rating: 4.8,
      description: "Luxurious suite with a king bed, lounge area, and sea view.",
      amenities: ["Wi-Fi", "TV", "Jacuzzi", "Breakfast Included", "Butler Service"],
      imageSrc: "assets/3.jpg"
    },
    {
      id: 4,
      name: "Economy Single",
      type: "Single",
      price: 40,
      available: false,
      rating: 3.9,
      description: "Affordable compact room ideal for solo business travelers.",
      amenities: ["Wi-Fi", "TV"],
      imageSrc: "assets/4.jpg"
    },
    {
      id: 5,
      name: "Family Double",
      type: "Double",
      price: 110,
      available: true,
      rating: 4.3,
      description: "Family-friendly room with bunk beds and pool access.",
      amenities: ["Wi-Fi", "TV", "Pool Access", "Crib Available"],
      imageSrc: "assets/5.webp"
    },
    {
      id: 6,
      name: "Executive Suite",
      type: "Suite",
      price: 220,
      available: false,
      rating: 4.7,
      description: "Top-floor suite with panoramic views and private terrace.",
      amenities: ["Wi-Fi", "TV", "Jacuzzi", "Private Terrace", "Breakfast & Dinner"],
      imageSrc: "assets/6.jpg"
    }
  ];

  constructor() { }

  getAllRooms(): Room[] {
    return this.rooms;
  }

 
  getAvailableRooms(): Room[] {
    return this.rooms.filter(room => room.available);
  }
}