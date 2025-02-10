import styles from './page.module.css';
import Hero from '@components/hero/Hero';
import FeedContainer from '@containers/Feed/FeedContainer';

const getData = async () => {
  try {
    const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const response = await fetch(`${base_url}/blog/all?limit=10&skip=0`, {
      cache: 'no-store',
    });
    if (response.status === 200) {
      const res = await response.json();
      return res;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

export default async function Home() {
  const data = await getData();
  return (
    <>
      <Hero />
      <div className={styles.homepage}>
        <FeedContainer initialData={data} />
      </div>
    </>
  );
}
