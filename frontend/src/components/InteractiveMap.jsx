import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import markers from "../assets/data/markers.json";
import { getMapData } from "@/requests";
import { useQuery } from "@tanstack/react-query";

const countryColors = {
  Netherlands: "#FFA500",
  France: "#416592",
  UnitedKingdom: "#33c0de",
  Belgium: "#9ed0b6",
};

const InteractiveMap = () => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["topojson"],
    queryFn: getMapData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  console.log(data);

  const handleMarkerHover = (event, marker) => {
    setTooltipContent(`${marker.name}: ${marker.description}`);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMarkerLeave = () => {
    setTooltipContent("");
  };

  return (
    <div className="border p-6 relative">
      <h2 className="font-semibold text-lg text-center">Interactive Map</h2>
      <ComposableMap
        width={800}
        height={600}
        projection="geoMercator"
        projectionConfig={{
          scale: 900,
          center: [0, 52],
        }}
      >
        <Geographies geography={data}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.COUNTRY;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={countryColors[countryName] || "#EAEAEC"}
                  stroke="#fff"
                  strokeWidth={0.2}
                />
              );
            })
          }
        </Geographies>
        {markers.map((marker) => (
          <Marker
            key={marker.name}
            coordinates={marker.coordinates}
            onMouseEnter={(event) => handleMarkerHover(event, marker)}
            onMouseLeave={handleMarkerLeave}
          >
            <circle
              r={5}
              fill="#5f7d6d"
              stroke="#fbefcb"
              strokeWidth={2}
              style={{ cursor: "pointer" }}
            />
          </Marker>
        ))}
      </ComposableMap>
      {tooltipContent && (
        <div
          style={{
            position: "fixed",
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y + 10,
            backgroundColor: "white",
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            zIndex: 1000,
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
