import React from "react";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import Publishhotel from "./Publishhotel";
import Total from "./Total";
import AdminNavbar from "./AdminNavbar";
// import Update from "./updatehotel";

export default function Hotels() {
  return (
    <>
    <AdminNavbar/>
    <div className="flex w-full flex-col ">
      <Tabs aria-label="Options"  className="flex justify-center mt-2">
      <Tab key="Total" title="Total">
          <Card>
            <CardBody>
              <Total/>
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="Publish" title="Publish">
          <Card>
            <CardBody>
             <Publishhotel/>
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>
    </div>  
    </>
  );
}
