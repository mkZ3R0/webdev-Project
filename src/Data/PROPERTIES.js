import house1 from '../assets/house1.jpg';
import house2 from '../assets/house2.jpeg';
import house3 from '../assets/house3.jpeg';
import house4 from '../assets/house4.jpg';

export const PROPERTIES = [
    {
      id: 1,
      img: house1,
      title: 'Cozy Mountain Cabin',
      types: ['CABIN'],
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
      price_per_night: 150,
      rating: 4.9,
      reviews_count: 90,
    },
    {
      id: 2,
      img: house1,
      title: 'Modern City Apartment',
      types: ['APARTMENT'],
      guests: 2,
      bedrooms: 1,
      bathrooms: 1,
      price_per_night: 120,
      rating: 4.7,
      reviews_count: 65,
    },
    {
      id: 3,
      img: house2,
      title: 'Beachfront Villa',
      types: ['VILLA','TRENDING'],
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
      price_per_night: 350,
      rating: 5.0,
      reviews_count: 180,
    },
    {
      id: 4,
      img: house3,
      title: 'Luxury Penthouse',
      types: ['LUXURY','PENTHOUSE','TRENDING'],
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      price_per_night: 500,
      rating: 4.8,
      reviews_count: 45,
    },
    {
        id: 5,
        img: house4,
        title: 'Rustic Farmhouse',
        types: ['FARMHOUSE'],
        guests: 10,
        bedrooms: 5,
        bathrooms: 4,
        price_per_night: 200,
        rating: 4.5,
        reviews_count: 120,
    }
  ];