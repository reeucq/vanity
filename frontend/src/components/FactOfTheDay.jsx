import { useQuery } from "@tanstack/react-query";
import { getRandomFact } from "@/requests";

const FactOfTheDay = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["fotd"],
    queryFn: getRandomFact,
    retry: 3,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="p-3 border">
      <h2 className="text-lg font-semibold ">Fact Of The Day</h2>
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold">{data.title}: </span>
        {data.description}
      </p>
    </div>
  );
};

export default FactOfTheDay;
