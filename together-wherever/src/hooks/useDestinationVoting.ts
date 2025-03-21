'use client';

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

import { DestinationInterface, TripDetailsInterface } from "@/utils/types";
import { fetchVotingPageData } from "@/fetcher/voting-page";

export function useDestinationVoting() {
    const [tripDetails, setTripDetails] = useState<TripDetailsInterface | null>(null);
    const [destinations, setDestinations] = useState<DestinationInterface[]>([]);
    const [scores, setScores] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);
    let [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { tripId, userId } = useParams();

    const handleScoreChange = (destID: number, newScore: number) => {
        setScores((prevScores) => ({
            ...prevScores,
            [destID]: newScore,
        }));
    };

    const handleCompleteVote = () => {
        setIsOpen(false);
        const body = {
            trip_id: tripId,
            voted_person: userId,
            scores: scores
        };
        console.log(body);
        router.push(`/planning/${tripId}`);
    };

    const handleClickBackButton = () => {
        router.push(`/planning/${tripId}`)
    };

    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem('token');

        if (token) {
        } else {
            router.push('/login'); // Redirect to login page
        }
    }, [router]);

    useEffect(() => {
        const getVotingPageData = async () => {
          try {
            // simulate await the result of fetchVotingPageData
            const { tripDetails, destinations, scores } = await fetchVotingPageData();
    
            setTripDetails(tripDetails);
            setDestinations(destinations);
            setScores(scores);
            setLoading(false);
          } catch (err) {
            console.error("Error loading voting page data:", err);
            setLoading(false);
          }
        };
    
        getVotingPageData();
      }, []);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000); // Simulate loading for 3 seconds
    }, []);

    return {
        tripDetails,
        destinations,
        scores,
        handleScoreChange,
        handleCompleteVote,
        handleClickBackButton,
        loading,
        isOpen,
        setIsOpen
    };
}
