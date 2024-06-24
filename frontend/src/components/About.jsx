import about_home from "../assets/img/about-home.webp";
import signature from "../assets/img/signature.webp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardImage,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { ExternalLinkIcon } from "lucide-react";

const About = () => {
  return (
    <Card className="h-full">
      <CardImage
        src={about_home}
        alt="About Home"
        className="h-96 object-cover"
      />
      <CardHeader>
        <CardTitle>
          Vincent Willem van Gogh{" "}
          <a href="https://en.wikipedia.org/wiki/Vincent_van_Gogh">
            <ExternalLinkIcon className="inline-block" />
          </a>
        </CardTitle>
        <CardDescription>(30 March 1853 - 29 July 1890)</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Vincent van Gogh, a Dutch post-Impressionist painter, is celebrated as
          one of the most influential figures in the history of Western art.
          Despite only painting seriously for about a decade, van Gogh&apos;s
          intense, emotional style and bold use of color left a lasting legacy
          that transformed the art world. His work, characterized by expressive
          brushwork and dramatic, vibrant color choices, includes over 2,100
          artworks, among them 860 oil paintings. Some of his most famous pieces
          include &quot;Starry Night,&quot; &quot;Sunflowers,&quot; and
          &quot;The Bedroom.&quot; Van Gogh&apos;s life, marked by mental
          illness and poverty, culminated in his tragic suicide at the age of
          37. However, his art continues to inspire and captivate audiences
          around the world, making him a central figure in any exploration of
          artistic genius. His emotional depth and personal struggles are
          vividly captured in his correspondence with his brother Theo,
          providing deeper insight into his turbulent life and creative process.
        </p>
      </CardContent>
      <CardFooter>
        <img
          src={signature}
          alt="Vincent van Gogh's signature"
          className="ml-auto h-10"
        />
      </CardFooter>
    </Card>
  );
};

export default About;
