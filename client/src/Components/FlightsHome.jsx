import React from "react";
import {Card, CardHeader, CardFooter, Image} from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function FlightsHome() {
  return (
<>
<h1 className="text-5xl font-extrabold flex justify-center my-20">Flights</h1>
<Link to="/Search-flight">
<div className=" gap-4 grid grid-cols-12  px-8 py-2">
    <Card className="col-span-12 sm:col-span-4 h-[100px]">
   <div className="flex gap-4 justify-center">
   <div className="text-xl flex justify-center mt-8 font-extrabold mx-2">Chandigarh </div>
   <img src="images/right-arrows.png" alt=""  className="h-8 w-8 mt-8"/>
   <div className="text-xl flex justify-center font-extrabold mt-8 mx-2 ">Delhi</div>
   </div>
    </Card>
    <Card className="col-span-12 sm:col-span-4 h-[100px]">
   <div className="flex gap-4 justify-center">
   <div className="text-xl flex justify-center mt-8 font-extrabold mx-2">Delhi</div>
   <img src="images/right-arrows.png" alt=""  className="h-8 w-8 mt-8"/>
   <div className="text-xl flex justify-center font-extrabold mt-8 mx-2 ">Chandigarh</div>
   </div>
    </Card>
    <Card className="col-span-12 sm:col-span-4 h-[100px]">
   <div className="flex gap-4 justify-center">
   <div className="text-xl flex justify-center mt-8 font-extrabold mx-2">Chandigarh </div>
   <img src="images/right-arrows.png" alt=""  className="h-8 w-8 mt-8"/>
   <div className="text-xl flex justify-center font-extrabold mt-8 mx-2 ">Mumbai</div>
   </div>
    </Card>
  </div>
</Link>
</>
  );
}
