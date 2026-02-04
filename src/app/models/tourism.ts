export interface TouristPlace {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  imageUrls?: string[];
  mapsUrl: string;
  active: boolean;
}
