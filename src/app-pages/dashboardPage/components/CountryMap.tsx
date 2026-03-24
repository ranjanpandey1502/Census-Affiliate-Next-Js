'use client'
// react plugin for creating vector maps
// import { VectorMap } from "@react-jvectormap/core";
import worldMill from '@react-jvectormap/world/worldMill.json';
import Countries from "@/assets/countries.json";
import dynamic from 'next/dynamic';
type CountryCodes = keyof typeof Countries;

const VectorMap = dynamic(
  () => import("@react-jvectormap/core").then((m) => m.VectorMap),
  { ssr: false, }
);
// Define the component props
interface CountryMapProps {
  mapColor?: string;
  data: Array<string | null>;
}
const MarkerStyle = {
  fill: "#465FFF",
  borderWidth: 6,
  borderColor: "white",
  stroke: "#383f47",
};

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

const CountryMap: React.FC<CountryMapProps> = ({ mapColor, data }) => {

  
  return (
    <VectorMap
      map={worldMill}
      backgroundColor="transparent"
      markerStyle={{
        initial: {
          fill: "#465FFF",
          r: 4, // Custom radius for markers
        }, // Type assertion to bypass strict CSS property checks
      }}
      markersSelectable={true}
      markers={data
      .map((el) => {
        if (!el) return null;
        const currentCountry = Countries[el as CountryCodes];
        if (!currentCountry) return null;
        return {
          latLng: [currentCountry.latitude, currentCountry.longitude],
          name: currentCountry.country,
          style: MarkerStyle,
        };
      })
      .filter(notEmpty)}
      zoomOnScroll={false}
      zoomMax={12}
      zoomMin={1}
      zoomAnimate={true}
      zoomStep={1.5}
      regionStyle={{
        initial: {
          fill: mapColor || "#D0D5DD",
          fillOpacity: 1,
          fontFamily: "Outfit",
          stroke: "none",
          strokeWidth: 0,
          strokeOpacity: 0,
        },
        hover: {
          fillOpacity: 0.7,
          cursor: "pointer",
          fill: "#465fff",
          stroke: "none",
        },
        selected: {
          fill: "#465FFF",
        },
        selectedHover: {},
      }}
      regionLabelStyle={{
        initial: {
          fill: "#35373e",
          fontWeight: 500,
          fontSize: "13px",
          stroke: "none",
        },
        hover: {},
        selected: {},
        selectedHover: {},
      }}
    />
  );
};

export default CountryMap;
