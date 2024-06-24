import { useQuery } from "@tanstack/react-query";
import { getLocationsAndCount } from "@/requests";

const LocationList = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["locationsAndCount"],
    queryFn: getLocationsAndCount,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="mt-3">
      <h2 className="text-lg font-semibold">Filter By Locations</h2>
      <ul className="my-3 ml-6 list-disc">
        {data.map((item, index) => (
          <li key={index}>{item.location}</li>
        ))}
      </ul>
    </div>
  );
};

export default LocationList;
