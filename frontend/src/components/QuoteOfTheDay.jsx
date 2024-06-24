import { useQuery } from "@tanstack/react-query";
import { getRandomQuote } from "@/requests";

const QuoteOfTheDay = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["qotd"],
    queryFn: getRandomQuote,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="mt-3">
      <h2 className="text-lg font-semibold ">Quote Of The Day</h2>
      <p>{data.quote}</p>
    </div>
  );
};

export default QuoteOfTheDay;
