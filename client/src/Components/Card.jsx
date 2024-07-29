import React from "react";
import {Card, CardHeader, CardFooter, Image} from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function MainCard() {
  return (
<>
<h1 className="text-5xl font-extrabold flex justify-center my-5">Hotels</h1>
<Link to="/Search-hotel">
<div className=" gap-4 grid grid-cols-12  px-8">
    <Card className="col-span-12 sm:col-span-4 h-[300px]">
      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">What to watch</p>
        <h4 className="text-white font-medium text-large">Stream the Acme event</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover"
        src="https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg"
      />
    </Card>
    <Card className="col-span-12 sm:col-span-4 h-[300px]">
      <Image
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover"
        src="https://img.freepik.com/premium-photo/minsk-belarus-august-2017-columns-guestroom-hall-reception-modern-luxury-hotel_97694-6572.jpg"
      />
      <CardFooter className="absolute z-10  flex-col !items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">Plant a tree</p>
        <h4 className="text-white font-medium text-large">Contribute to the planet</h4>
      </CardFooter>
    </Card>
  
    <Card className="col-span-12 sm:col-span-4 h-[300px]">
      <Image
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover"
        src="https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg"
      />
      <CardFooter className="absolute z-10  flex-col !items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">Plant a tree</p>
        <h4 className="text-white font-medium text-large">Contribute to the planet</h4>
      </CardFooter>
    </Card>
     
  </div>
</Link>
</>
  );
}
