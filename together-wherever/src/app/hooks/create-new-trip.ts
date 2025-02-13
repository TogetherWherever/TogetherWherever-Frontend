'use client';

import { useState, useEffect } from 'react';
import { addDays } from "date-fns";
import { PlaceDetails } from "@/app/types";
import axios from "axios";

export const useCreateNewTrips = () => {
  const [tripName, setTripName] = useState('');
  const [tripNameLength, setTripNameLength] = useState(0);
  const [companionName, setCompanionName] = useState('');  
  const [companionIds, setCompanionIds] = useState<Array<string>>([]);
  const [placeName, setPlaceName] = useState<string | null>(null);
  const [placeId, setPlaceId] = useState<string>();
  const [range, setRange] = useState([
    {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: "selection",
    },
  ]);

  const fetchPlaceDetails = async (placeId: string) => {
    try {
        const res = await axios.get(`http://localhost:8000/api/discover-place-details/?dest_id=${placeId}`);
        const data = res.data as PlaceDetails;

        console.log("Fetched Place Data:", data);

        setPlaceName(data.destName);
        setPlaceId(data.destID)
    } catch (error) {
        console.error("Failed to fetch place details", error);
    }
  };

  const handleChangeTripName = (e: any) => {
      setTripName(e.target.value);
  };

  const handleChangeCompanions = (e: any) => {
    setCompanionName(e.target.value);
  };

  const handleSelectCompanion = (item: any) => {
    setCompanionIds((prev) => {
      // Check if the userId already exists in the array
      if (!prev.includes(item.userId)) {
        // If it doesn't exist, add it to the array
        return [...prev, item.userId];
      }
      // If it exists, return the previous array without changes
      return prev;
    });
    setCompanionName('');
  };

  const handleRemoveCompanion = (userId: string) => {
    setCompanionIds((prevIds) => prevIds.filter((id) => id !== userId));
  };

  const handleClickStartPlanning = () => {
    if (tripName !== '' && placeId !== '' &&  placeName !== '') {
      const body = {
        tripName: tripName,
        destID: '01', // mock
        destName: 'Phuket', // mock
        startDate: range[0].startDate,
        lastDate: range[0].endDate,
        companion: companionIds
      }
      console.log(body);
    }    
  };

  useEffect(() => {
    setTripNameLength(tripName.length);
  }, [tripName]);

  useEffect(() => {
    if (tripName.length > 50) {
        setTripName(tripName.slice(0, 50)); // Trim to 50 characters
    }
  }, [tripName]);

  return {
    tripName,
    tripNameLength,
    setTripName,
    companionName,
    setCompanionName,
    companionIds,
    setCompanionIds,
    placeName,
    placeId,
    range,
    setRange,
    handleChangeTripName,
    handleChangeCompanions,
    handleSelectCompanion,
    fetchPlaceDetails,
    handleClickStartPlanning,
    handleRemoveCompanion
  };
};