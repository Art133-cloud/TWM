"use client";

import { useState, useRef, useCallback } from "react";
import styles from "./HomeSlider.module.scss";
import Container from "../basic/container/Container";
import ArrowLeftHome from "../../../public/assets/svg/ArrowLeft";
import ArrowRightHome from "../../../public/assets/svg/ArrowRight";
import EgyptLandscape from "../../../public/assets/png/egyptLandscape.png";
import SecondImage from "../../../public/assets/png/bg.png";
import ThirdImg from "../../../public/assets/png/20200125110231_Priroda_10-344.jpg";
import ForImg from "../../../public/assets/png/priroda.jpg"
import FiveImg from "../../../public/assets/png/www.fonstola.ru.1687828675.2414.jpg"
import SixImg from "../../../public/assets/png/gallery-3.jpg";
import Discover from "../discover/Discover";
import HomeHeader from "../homeHeader/HomeHeader";
export default function HomeSlider() {
  const slides = [
    {
      id: "slide_1",
      content: "It’s Time To Explore The World",
      background: EgyptLandscape.src,
    },
    {
      id: "slide_2",
      content: "It’s Time To Explore The World",
      background: SecondImage.src,
    },
    {
      id: "slide_3",
      content: "It’s Time To Explore The World",
      background: ThirdImg.src,
    },
    {
      id: "slide_4",
      content: "It’s Time To Explore The World",
      background: ForImg.src,
    },
    {
      id: "slide_5",
      content: "It’s Time To Explore The World",
      background: FiveImg.src,
    },
    {
      id: "slide_6",
      content: "It’s Time To Explore The World",
      background: SixImg.src,
    },
    {
      id: "slide_7",
      content: "It’s Time To Explore The World",
      background: ThirdImg.src,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lastClickTime = useRef<number | null>(null);

  const handleSlideChange = useCallback((direction: "next" | "prev") => {
    const now = Date.now();

    if (isTransitioning) {
      return;
    }

    setIsTransitioning(true); 

    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex;
      if (direction === "next") {
        newIndex = (prevIndex + 1) % slides.length;
      } else {
        newIndex = (prevIndex - 1 + slides.length) % slides.length;
      }
      return newIndex;
    });

    lastClickTime.current = now;

    setTimeout(() => {
      setIsTransitioning(false); 
    }, 1000); 

  }, [isTransitioning, slides.length]);

  const nextSlide = () => handleSlideChange("next");
  const prevSlide = () => handleSlideChange("prev");

  const currentSlide = slides[currentIndex];

  return (
    <div
      className={styles.slider}
      style={{
        backgroundImage: `url(${currentSlide.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
      }}
    >
      <HomeHeader/>
      <div className={styles.content}>
        <p className={styles.text}>{currentSlide.content}</p>
      </div>

      <Container>
      <div className={styles.arrowAndDiscover}>
        <div className={styles.slideDiv}>
          <div className={styles.arrowParentDiv}>

          <div className={styles.arrows}>
            <div className={styles.prev} onClick={prevSlide}>
              <ArrowLeftHome className={styles.arrow} />
            </div>
            <div className={styles.next} onClick={nextSlide}>
              <ArrowRightHome className={styles.arrow} />
            </div>
          </div>
          <div className={styles.line}></div>
          <h2>{(currentIndex + 1).toString().padStart(2, "0")}</h2>
          </div>
        </div>
        <div className={styles.discover}>
          <Discover />
        </div>
      </div>
      </Container>
    </div>
  );
}
