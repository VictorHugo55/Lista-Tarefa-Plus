// src/hooks/useQuote.ts
import { useQuery } from "@tanstack/react-query";

const fetchQuote = async () => {
  const res = await fetch("https://api.quotable.io/random");
  return res.json();
};

export const useQuote = () =>
  useQuery({
    queryKey: ["quote"],
    queryFn: fetchQuote,
    refetchInterval: 1000 * 60 * 5,
  });
