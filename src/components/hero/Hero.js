'use client';

import SearchBar from '@components/searchbar/SearchBar';
import styles from './Hero.module.css';
import SearchScrollWrapper from '@components/HOC/SearchScrollWrapper';
import { useEffect, useState } from 'react';
import carouselImages from './CarousalImages';
import Link from 'next/link';

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [planData, setPlanData] = useState({
    destination: '',
    days: '',
    people: '',
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handlePlanSubmit = (e) => {
    e.preventDefault();
    setPlanData({
      destination: '',
      days: '',
      people: '',
    });
  };

  return (
    <div className={styles['hero-container']}>
      <div className={styles['hero-overlay']}>
        {carouselImages.map((image, index) => (
          <div
            key={image.url}
            className={`${styles['hero-slide']} ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={`${image.url}?auto=format&fit=crop&w=2021&q=80`}
              alt={image.location}
            />
            <div className={styles.overlay}></div>

            <Link href={image.link} className={styles['hero-link']}>
              {image.location}
            </Link>
          </div>
        ))}
      </div>

      <div className={styles['carousel-indicators']}>
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`icon-button ${styles['carousel-indicator']} ${index === currentImage ? styles.active : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className={styles['hero-main-section']}>
        <div className={styles['hero-section']}>
          <h1 className={styles['hero-title']}>
            <span>Discover Your Next</span>
            <span className={styles['highlight']}>Adventure</span>
          </h1>

          <div className={styles['hero-search']}>
            <SearchScrollWrapper>
              <SearchBar />
            </SearchScrollWrapper>
          </div>

          <div className={styles['plan-form-container']}>
            <form onSubmit={handlePlanSubmit} className={styles['plan-form']}>
              <h2 className={styles['plan-form-title']}>Plan Your Journey</h2>
              <div className={styles['plan-form-grid']}>
                <input
                  type='text'
                  placeholder='Where to?'
                  value={planData.destination}
                  onChange={(e) =>
                    setPlanData({ ...planData, destination: e.target.value })
                  }
                  className={styles['plan-input']}
                  required
                />
                <input
                  type='number'
                  placeholder='Number of days'
                  value={planData.days}
                  onChange={(e) =>
                    setPlanData({ ...planData, days: e.target.value })
                  }
                  className={styles['plan-input']}
                  required
                  min='1'
                />
                <input
                  type='number'
                  placeholder='Number of people'
                  value={planData.people}
                  onChange={(e) =>
                    setPlanData({ ...planData, people: e.target.value })
                  }
                  className={styles['plan-input']}
                  required
                  min='1'
                />
              </div>
              <button type='submit' className={`${styles['plan-submit-btn']}`}>
                Create Itinerary
              </button>
            </form>
          </div>

          <div className={styles['hero-button-container']}>
            <button className={styles['hero-button']}>
              Explore Destinations
            </button>
            <button className={styles['hero-button']}>Start Blogging</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
