import classes from './page.module.css';
import InfoLink from '@components/infolink/InfoLink';
import Attractions from '@components/attractions/Attractions';
import Hero from '@components/hero/Hero';
import Itineary from '@components/itineary/Itineary';
import FeedContainer from '@containers/Feed/FeedContainer';

const getData = async () => {
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
};

export default async function Home() {
  const data = await getData();
  return (
    <>
      <Hero />
      <Attractions top={true} />
      <div className={classes.homepage}>
        <FeedContainer initialData={data} />
        <div className={classes['homepage-right']}>
          <InfoLink />
          <Attractions />
          <Itineary />
        </div>
      </div>
    </>
  );
}
