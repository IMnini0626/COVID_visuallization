import React, { useEffect } from "react";
import { MapContainer } from "react-leaflet";
import L from "leaflet";

import "leaflet-boundary-canvas";
import { MarkerClusterGroup } from "leaflet.markercluster";

let markerCluster;

function Map({ position, setMap, data, selectedDate, map,closeModal }) {
  const icon = L.icon({
    iconUrl: "/marker.png",
    iconSize: [7, 7],

    className: "marker",
  });

  let positionLists = [];

  data.length > 0 &&
    Object.keys(data[0].value).map((item) => {
      const district = data[0].value[item];
      district.addressWithLocation?.map((loc) => positionLists.push(loc));
    });

  useEffect(() => {
    if (!map) return;
    if (markerCluster) {
      map.target.removeLayer(markerCluster);
    }

    markerCluster = new MarkerClusterGroup();
    positionLists.map((pos) => {
      L.marker(new L.LatLng(pos[1], pos[2]), {
        icon: icon,
      })
        .addTo(markerCluster)
        .bindPopup(pos[0]);
    });

    map.target.addLayer(markerCluster);
  }, [data, selectedDate]);

  return (
    <div className="map__container" onClick={() => closeModal()}>
      <MapContainer
        style={{ width: "100%", height: "45rem" }}
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        whenReady={setMap}
      />
    </div>
  );
}

export default Map;
