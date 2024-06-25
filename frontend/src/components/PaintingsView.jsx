import { useQuery } from "@tanstack/react-query";
import { filterPaintings } from "@/requests";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { useSearchParams } from "react-router-dom";

const PaintingsView = ({ className }) => {
  const [searchParams] = useSearchParams();
  const location = searchParams.get("location") || "";
  const year = searchParams.get("year") || "";

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["filterPaintings", location, year],
    queryFn: () => filterPaintings(location, year),
    retry: 3,
  });

  if (isLoading) {
    return (
      <main className={`w-full mx-auto p-3 ${className}`}>
        <p>Loading...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className={`w-full mx-auto p-3 ${className}`}>
        <p>Error: {error.message}</p>
      </main>
    );
  }

  return (
    <main className={`w-full mx-auto p-3 ${className}`}>
      {(location || year) && (
        <h2 className="text-2xl font-bold mb-4">
          Filtered by: {location && `Location: ${location}`}{" "}
          {location && year && "|"} {year && `Year: ${year}`}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((painting) => (
          <Card
            key={painting.catalog_no}
            className="flex flex-col text-center overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-64 overflow-hidden">
              <img
                src={`/paintings/${painting.filename}`}
                alt={painting.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader className="flex-grow">
              <CardTitle className="text-lg font-semibold">
                {painting.name}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                {painting.year} | {painting.made_at} <br /> {painting.size}
              </CardDescription>
            </CardHeader>
            <CardFooter className="text-xs text-gray-500">
              Catalog No: {painting.catalog_no}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default PaintingsView;
