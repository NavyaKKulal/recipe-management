import Image from "next/image";
import Navigation from "./component/navbar";
import Partners from "./component/partners";
import PromotionBanner from "./component/promotion";
export default function Home() {
  return (
   <div className="min-h-screen bg-white p-10 mt-12">

     <Navigation/>
      <Partners/>
     <PromotionBanner imgurl="https://www.sahyadri.edu.in/images/banners/home1.jpg"/>
     
     
     
     
      </div>
     );
}