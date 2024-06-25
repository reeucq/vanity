import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getLocationsAndCount } from "@/requests";
import { Link, useSearchParams } from "react-router-dom";

const LocationList = () => {
  const [searchParams] = useSearchParams();
  const currentYear = searchParams.get("year") || "";

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["locationsAndCount"],
    queryFn: getLocationsAndCount,
    retry: 3,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="mt-3">
      <h2 className="text-lg font-semibold">Filter By Locations</h2>
      <ul className="my-3 ml-6 list-disc">
        {data.map((item, index) => (
          <li
            key={index}
            className="cursor-pointer hover:underline text-goghOne-500"
          >
            <Link
              to={`/filter?location=${item.location}${
                currentYear ? `&year=${currentYear}` : ""
              }`}
            >
              {item.location}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationList;
