'use client';

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";

import { DestinationInterface, TripDetailsInterface } from "@/utils/types";
import { fetchVotingPageData, votingSubmit } from "@/fetcher/votingPage";

export function useDestinationVoting() {
    const [tripDetails, setTripDetails] = useState<TripDetailsInterface | null>(null);
    const [destinations, setDestinations] = useState<DestinationInterface[]>([]);
    const [scores, setScores] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    
    const router = useRouter();
    const { tripId, userName } = useParams();
    const searchParams = useSearchParams();
    const day = searchParams.get('day');

    const handleScoreChange = useCallback((destID: number, newScore: number) => {
        setScores(prevScores => 
            prevScores[destID] === newScore ? prevScores : { ...prevScores, [destID]: newScore }
        );
    }, []);

    const handleCompleteVote = useCallback(async () => {
        setIsOpen(false);
        try {
            const response = await votingSubmit({
                trip_id: tripId,
                trip_day_number: Number(day),
                voted_person: userName,
                scores
            });

            if (response === 200) {
                router.push(`/planning/${tripId}`);
            }
        } catch (error) {
            console.error("Voting submission failed:", error);
        }
    }, [tripId, day, userName, scores, router]);

    const handleClickBackButton = useCallback(() => {
        router.push(`/planning/${tripId}`);
    }, [tripId, router]);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.replace('/login');
        }
    }, [router]);

    useEffect(() => {
        const getVotingPageData = async () => {
            setLoading(true);
            try {
                const { tripDetails, destinations, scores } = await fetchVotingPageData(tripId, day, userName);

                setTripDetails(prev => prev ?? tripDetails);
                setDestinations(prev => (prev.length === 0 ? destinations : prev));
                setScores(prev => (Object.keys(prev).length === 0 ? scores : prev));
            } catch (err) {
                console.error("Error loading voting page data:", err);
            } finally {
                setLoading(false);
            }
        };

        getVotingPageData();
    }, [tripId, day, userName]);

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
};