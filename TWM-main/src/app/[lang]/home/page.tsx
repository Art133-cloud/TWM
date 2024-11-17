import HomeSlider from "@/components/homeSlider/HomeSlider";
import Cards from "@/components/cardsBlock/Cards";
import BasicSectionSlider from "@/components/basic/basicSliderSection/BasicSectionSlider";
export default function Home() {
  return (
      <>
        <HomeSlider/>
        <Cards/>
        <BasicSectionSlider textFirst="Top " span="Destinations" textSecond="In The World"/>
      </>
  );
}
