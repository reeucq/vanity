import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import starryNight from "../assets/img/starry_night.webp";
import sunflowers from "../assets/img/sunflowers.webp";
import selfPortrait from "../assets/img/self_portrait.webp";
import potatoEaters from "../assets/img/vincent-van-gogh-the-potato-eaters-1.webp";
import wheatfieldWithCrows from "../assets/img/vincent-van-gogh-wheatfield-with-crows-1.webp";
import irises from "../assets/img/irises.webp";
import bedroomInArles from "../assets/img/vincent-van-gogh-bedroom-in-arles.webp";

const paintings = [
  {
    src: starryNight,
    title: "Starry Night",
    significance:
      "Depicts the view from the east-facing window of his asylum room at Saint-Rémy-de-Provence, with an expressive swirling night sky and a bright crescent moon.",
  },
  {
    src: sunflowers,
    title: "Sunflowers",
    significance:
      "Part of the sunflowers series, showing Van Gogh's unique style and his use of vibrant yellow to express warmth and emotion.",
  },
  {
    src: selfPortrait,
    title: "Self Portrait",
    significance:
      "One of Van Gogh's numerous self-portraits, showcasing his intense gaze and the depth of his emotional and artistic exploration.",
  },
  {
    src: potatoEaters,
    title: "The Potato Eaters",
    significance:
      "Illustrates the harsh reality and simplicity of rural life, with a focus on the dimly lit scene and the coarse features of the subjects.",
  },
  {
    src: wheatfieldWithCrows,
    title: "Wheatfield with Crows",
    significance:
      "Often interpreted as a symbol of turmoil and psychological distress, this painting is known for its dramatic, stormy sky and the flight of crows over the wheatfield.",
  },
  {
    src: irises,
    title: "Irises",
    significance:
      "One of Van Gogh's most famous floral compositions, painted during his time at the asylum in Saint-Rémy, full of color and dynamic movement.",
  },
  {
    src: bedroomInArles,
    title: "Bedroom in Arles",
    significance:
      "A vivid depiction of his bedroom in the Yellow House at Arles, demonstrating his skill in using color and perspective to evoke calm and simplicity.",
  },
];

const CarouselView = () => {
  return (
    <div className="min-h-56 border p-6">
      <h2 className="text-lg text-center font-semibold">
        Most Popular Van Gogh Paintings
      </h2>
      <Carousel
        className="w-full h-full"
        plugins={[
          Autoplay({
            delay: 2400,
          }),
        ]}
      >
        <CarouselContent>
          {paintings.map((painting, index) => (
            <CarouselItem
              key={index}
              className="p-4 h-65 flex flex-col md:flex-row items-center justify-around"
            >
              <div className="border-4 border-white transform md:-rotate-3 shadow-lg m-6">
                <img
                  src={painting.src}
                  alt={painting.title}
                  className="max-h-60 md:max-h-80 object-contain rounded"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{painting.title}</h3>
                <p className="text-sm text-gray-600">{painting.significance}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CarouselView;
