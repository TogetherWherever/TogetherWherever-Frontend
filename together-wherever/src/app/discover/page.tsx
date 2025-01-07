'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export default function DiscoverPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const destinations = [
        'Paris',
        'New York',
        'Tokyo',
        'London',
        'Sydney',
        'Berlin',
        'Dubai',
        'Rome',
        'Los Angeles',
    ];

    // Filter destinations based on the search query
    const filteredDestinations = destinations.filter((destination) =>
        destination.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        setIsDropdownOpen(query.length > 0 && filteredDestinations.length > 0); // Show dropdown if there's a query and results
    };

    // Handle suggestion click
    const handleSuggestionClick = (destination: string) => {
        setSearchQuery(destination);
        setIsDropdownOpen(false); // Close the dropdown after selection
    };

    return (
        <div className="px-40">
            {/* Search Bar */}
            <div className="mb-6 relative">
                {/* Magnifying Glass Icon */}
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />

                <input
                    type="text"
                    placeholder="Search for a destination..."
                    className="w-full p-3 pl-10 border bg-earth-yellow-light rounded-full focus:outline-none focus:ring-2 focus:ring-earth-yellow"
                    value={searchQuery}
                    onChange={handleInputChange}
                />

                {/* Dropdown for suggestions */}
                {isDropdownOpen && filteredDestinations.length > 0 && (
                    <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
                        <ul className="max-h-36 overflow-y-auto">
                            {filteredDestinations.map((destination, index) => (
                                <li
                                    key={index}
                                    className="p-3 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleSuggestionClick(destination)}
                                >
                                    {destination}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

        </div>
    );
}
