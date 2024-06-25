import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getYearsAndCount } from "@/requests";
import { Link, useSearchParams } from "react-router-dom";

const YearList = () => {
  const [searchParams] = useSearchParams();
  const currentLocation = searchParams.get("location") || "";

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["yearsAndCount"],
    queryFn: getYearsAndCount,
    retry: 3,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="mt-3">
      <h2 className="text-lg font-semibold">Filter By Years</h2>
      <p className="my-3">
        {data.map((item, index) => (
          <span
            key={index}
            className="cursor-pointer hover:underline text-goghOne-500"
          >
            <Link
              to={`/filter?year=${item.year}${
                currentLocation ? `&location=${currentLocation}` : ""
              }`}
            >
              {item.year}
            </Link>
            {index < data.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
    </div>
  );
};

export default YearList;
