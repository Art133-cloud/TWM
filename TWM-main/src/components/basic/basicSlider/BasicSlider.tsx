"use client";
import React, { useState, useEffect } from "react";
import styles from "./BasicSlider.module.scss";
import ArrowRightBasicSlider from "../../../../public/assets/svg/ArrowRightBasicSlider";
import ArrowLeftBasicSlider from "../../../../public/assets/svg/ArrowLeftBasicSlider";
import Cuba from "../../../../public/assets/png/Cuba-city 1.png";
import Parise from "../../../../public/assets/png/Paris-City.png";
import Japan from "../../../../public/assets/png/japan.png";

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
  const [slideWidth, setSlideWidth] = useState(0);
  const [gap, setGap] = useState(104); // начальный gap

  useEffect(() => {
    const updateGap = () => {
      const width = window.innerWidth;
      if (width <= 793) {
        setGap(104); // gap для экранов меньше 793px
      } else {
        setGap(104); // gap для остальных экранов
      }
    };

    updateGap(); // устанавливаем gap при монтировании компонента
    window.addEventListener("resize", updateGap); // слушатель изменений размера окна

    return () => {
      window.removeEventListener("resize", updateGap); // очистка слушателя
    };
  }, []); // пустой массив зависимостей для обновления только при монтировании

  const updateSlidesPerView = () => {
    const width = window.innerWidth;
    if (width <= 793) {
      setSlidesPerView(1);
    } 
    else if (width <= 1019) {
      setSlidesPerView(2);
    } 
    else if (width <= 1401) {
      setSlidesPerView(1);
    } 
    else if (width <= 1866) {
      setSlidesPerView(2);
    } 
    else {
      setSlidesPerView(3);
    }
  };

  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);

    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []); // обновление при монтировании компонента

  useEffect(() => {
    const updateSlideWidth = () => {
      const sliderContainer = document.querySelector(`.${styles.sliderWrapper}`);
      if (sliderContainer) {
        const containerWidth = (sliderContainer as HTMLElement).offsetWidth;
        setSlideWidth((containerWidth - gap * (slidesPerView - 1)) / slidesPerView);
      }
    };

    updateSlideWidth();
    window.addEventListener("resize", updateSlideWidth);

    return () => {
      window.removeEventListener("resize", updateSlideWidth);
    };
  }, [gap, slidesPerView]); // пересчитываем ширину слайдов при изменении gap или slidesPerView

  const totalSlides = slideElements.length;

  const nextSlide = () => {
    if (currentIndex < totalSlides - slidesPerView) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const getTransformValue = () => {
    const width = window.innerWidth;
    // Условие для экрана меньше 413px
    if (width < 413) {
      return `translateX(-${currentIndex * slideWidth * 1.45}px)`;
    }
    return `translateX(-${currentIndex * (slideWidth + gap)}px)`; // с учетом gap для остальных экранов
  };

  return (
    <div className={styles.slider}>
      <div className={styles.sliderWrapper}>
        <div
          className={styles.sliderItems}
          style={{
            transform: getTransformValue(), // применяем адаптивный сдвиг
            transition: "transform 0.5s ease",
          }}
        >
          {slideElements.map((slide, index) => (
            <div
              key={index}
              className={styles.sliderItem}
              style={{
                width: `${slideWidth}px`,
                marginRight: index < totalSlides - 1 ? `${gap}px` : "0",
              }}
            >
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
          disabled={currentIndex === 0}
        >
          <ArrowLeftBasicSlider />
        </button>
        <button
          onClick={nextSlide}
          className={`${styles.arrow} ${styles.right}`}
          disabled={currentIndex >= totalSlides - slidesPerView}
        >
          <ArrowRightBasicSlider />
        </button>
        <div className={styles.lineArrowBasicSlider}></div>
        <h3>{String(currentIndex + 1).padStart(2, "0")}</h3>
      </div>
    </div>
  );
};

export default Slider;
