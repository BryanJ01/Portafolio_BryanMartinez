import type React from "react"
import { Carousel, Card, type Card as CardType } from "./apple-cards-carousel"
import { DummyContent } from "./DummyContent"

interface CarouselWrapperProps {
  data: CardType[]
}

export const CarouselWrapper: React.FC<CarouselWrapperProps> = ({ data }) => {
  const cards = data.map((card, index) => (
    <Card
      key={index}
      card={{
        ...card,
        content: <DummyContent />,
      }}
      index={index}
    />
  ))

  return <Carousel items={cards} />
}

