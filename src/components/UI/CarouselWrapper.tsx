import type React from "react";
import { Carousel, Card, type Card as CardType } from "./apple-cards-carousel";

interface CarouselWrapperProps {
  data: CardType[];
}

export const CarouselWrapper: React.FC<CarouselWrapperProps> = ({ data }) => {
  const cards = data.map((card, index) => (
    <Card
      key={index}
      card={card} // Pass the entire card object
      index={index}
    />
  ));

  return <Carousel items={cards} />;
};