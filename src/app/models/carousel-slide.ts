export interface CarouselSlide {
  id?: number;
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string;
  position?: number;
  active?: boolean;
}
