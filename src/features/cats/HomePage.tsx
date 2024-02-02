import { CatsList } from "./ui/CatsList/CatsList";
import { PageSpinner } from "@/components/UI/Loader";

import styles from "./HomePage.module.scss";
import { Spinner } from "@/components/UI/Spinner";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export const HomePage = () => {
  const { data, isLoading, isFetching } = useInfiniteScroll();

  if (isLoading) return <PageSpinner />;

  return (
    <div className={styles.Wrapper}>
      {data ? (
        <>
          <CatsList data={data} />
          {isFetching ? (
            <div className={styles.Footer}>
              <Spinner />
            </div>
          ) : null}
        </>
      ) : (
        <div className={styles.NotFound}>
          Мы не смогли загрузить изображения.
        </div>
      )}
    </div>
  );
};
