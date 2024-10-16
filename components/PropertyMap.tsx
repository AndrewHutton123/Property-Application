"use client";
import React from "react";
import { setDefaults, fromAddress, OutputFormat } from "react-geocode";
import { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";
import Spinner from "./Spinner";
import "mapbox-gl/dist/mapbox-gl.css";
import { PropertyModel } from "@/models/property";

type PageProps = {
  property: PropertyModel;
};

const PropertyMap = ({ property }: PageProps) => {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [viewPort, setViewPort] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLodaing] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: "en",
    region: "uk",
    outputFormat: OutputFormat.JSON,
  });

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );

        if (res.results.length === 0) {
          setGeocodeError(true);
          return;
        }

        const { lat, lng } = res.results[0].geometry.location;

        setLat(lat);

        setLng(lng);

        setViewPort({ ...viewPort, latitude: lat, longitude: lng });
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
      } finally {
        setLodaing(false);
      }
    };
    fetchCoords();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (geocodeError) {
    return <div className="text-xl">No Location data found</div>;
  }
  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        // @ts-ignore: Unreachable code error
        mapLib={import("mapbox-gl")}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 15,
        }}
        style={{ width: "100%", height: 500 }}
        mapStyle={"mapbox://styles/mapbox/streets-v9"}
      >
        <Marker longitude={lng!} latitude={lat!} anchor="bottom">
          <Image src={pin} alt="location" width={40} height={40} />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
