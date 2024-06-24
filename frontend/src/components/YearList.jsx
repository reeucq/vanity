import { useQuery } from "@tanstack/react-query";
import { getYearsAndCount } from "@/requests";

const YearList = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["yearsAndCount"],
    queryFn: getYearsAndCount,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="mt-3">
      <h2 className="text-lg font-semibold">Filter By Years</h2>
      <p className="my-3">
        {data.map((item, index) => (
          <span key={index}>
            {item.year}
            {index < data.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
    </div>
  );
};

export default YearList;
