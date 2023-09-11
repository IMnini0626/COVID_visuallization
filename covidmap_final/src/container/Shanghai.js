import React, { useEffect, useState } from "react";
import ShanghaiGeoJSON from "@datapool/shanghai.geojson";
import L from "leaflet";

import MapContainer from "../components/Map";
import DateFilter from "../components/DateFilter";
import Summary from "../components/Summary";
import { useDate, useJsonData } from "../hooks";

function Shanghai() {
  const position = [31.2304, 121.4737];
  const covidData = useJsonData();
  const dates = useDate();
  const [mapdraw, setMapDraw] = useState(null);
  const [selectedDate, setDate] = useState(dates[0]);
  const [data, setData] = useState([]);
  const [modalData,setModalData] = useState()
  const convertDate = `${selectedDate.getMonth() + 1}月${
    selectedDate.getDate()
  }日`;

  useEffect(() => {
    if (!mapdraw) return;
    const getData = () => {
      const osm = L.TileLayer.boundaryCanvas(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          boundary: ShanghaiGeoJSON,
        }
      );
      mapdraw.target.addLayer(osm);
      const locData = covidData.filter((item) => item.date == convertDate);
      setData(locData);
    };
    getData();
  }, [mapdraw, selectedDate]);

  const handleDateChange = (date) => {
    setDate(date);
  };


  return (
    <div>
      <div className="container" >
        <MapContainer
          map={mapdraw}
          position={position}
          setMap={setMapDraw}
          data={data}
          selectedDate={selectedDate}
          closeModal={setModalData}
        />
        <div className="second__container" >
          <DateFilter
            selectedDate={selectedDate}
            changeDate={handleDateChange}
            closeModal = {setModalData}
          />
          <Summary data={data} district={modalData} setDistrict={setModalData}/>
        </div>
      </div>
      {/* <Chart selectedDate={convertDate} changeDate={handleDateChange} /> */}
    </div>
  );
}

export default Shanghai;
