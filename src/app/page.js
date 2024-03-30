'use client';

import { useMediaQuery } from "@mui/material";
import classes from './page.module.css'

import InfoLink from "@/components/infolink/InfoLink";
import Attractions from "@/components/attractions/Attractions";
import Hero from "@/components/hero/Hero";
import Itineary from "@/components/itineary/Itineary";
import FeedContainer from "@/containers/Create/Feed/FeedContainer";


export default function Home() {
  const mobile = useMediaQuery('(max-width:768px)')

  return (
    <>
      {!mobile ? <Hero /> : <Attractions top={true} />}
      <div className={classes.homepage}>
        <FeedContainer />
        {!mobile && <div className={classes["homepage-right"]}>
          <div className={classes.sticky}>
            <InfoLink />
            <Attractions />
            <Itineary />
          </div>
        </div>}
      </div>
    </>
  );
}
