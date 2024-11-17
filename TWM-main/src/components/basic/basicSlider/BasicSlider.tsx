"use client";
import React, { useState, useEffect } from "react";
import styles from "./BasicSlider.module.scss";
import ArrowRightBasicSlider from "../../../../public/assets/svg/ArrowRightBasicSlider";
import ArrowLeftBasicSlider from "../../../../public/assets/svg/ArrowLeftBasicSlider";
import Cuba from "../../../../public/assets/png/Cuba-city 1.png";
import Parise from "../../../../public/assets/png/Paris-City.png";
import Japan from "../../../../public/assets/png/japan.png";
import Image from "next/image";

const slideElements = [
  { src: Cuba.src, content: "Cuba City" },
  { src: Parise.src, content: "Paris" },
  { src: Japan.src, content: "Japan" },
  { src: Cuba.src, content: "Cuba City" },
  { src: Parise.src, content: "Paris" },
  { src: Japan.src, content: "Cuba City" },
  { src: Cuba.src, content: "Cuba City" },
];

const Slider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const totalSlides = 7;

  const updateCurrentIndex = (newSlidesPerView: number) => {
    if (newSlidesPerView === 2) {
      setCurrentIndex(6);
    } else if (currentIndex >= totalSlides - newSlidesPerView) {
      setCurrentIndex(totalSlides - newSlidesPerView);
    }
  };

  const nextSlide = () => {
    if (currentIndex < totalSlides - slidesPerView) {
      setCurrentIndex((prevIndex) => prevIndex + 1); // Move to next slide, but don't exceed total slides
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1); // Move to previous slide, but don't go below 0
    }
  };

  return (
    <div className={styles.slider}>
      <div className={styles.sliderWrapper}>
        <div
          className={styles.sliderItems}
          style={{
            transform: `translateX(-${(currentIndex * 45) / slidesPerView}%)`,
            transition: "transform 0.5s ease",
          }}
        >
          {slideElements.map((slide, index) => (
            <div key={index} className={styles.sliderItem}>
              <img src={slide.src} alt={slide.content} />
              <div className={styles.caption}>{slide.content}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.arrowsBasicSlider}>
        <button
          className={`${styles.arrow} ${styles.left}`}
          onClick={prevSlide}
        >
          <ArrowLeftBasicSlider />
        </button>
        <button
          onClick={nextSlide}
          className={`${styles.arrow} ${styles.right}`}
          disabled={currentIndex >= totalSlides - slidesPerView} // Disable next button if last slide is reached
        >
          <ArrowRightBasicSlider />
        </button>
        <div className={styles.lineArrowBasicSlider}></div>
        <h3>{String(currentIndex + 1).padStart(2, '0')}</h3>
      </div>
    </div>
  );
};

export default Slider;
