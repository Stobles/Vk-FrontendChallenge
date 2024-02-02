import { useGetCatsQuery } from "@/features/cats";
import { useEffect, useState } from "react";

export const useInfiniteScroll = () => {
  const [page, setPage] = useState(0);

  const { data, isLoading, isFetching } = useGetCatsQuery({
    limit: 20,
    page,
    order: "ASC",
  });
  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        setPage(page + 1);
      }
    };

    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [page, isFetching]);

  return { data, isLoading, isFetching };
};
