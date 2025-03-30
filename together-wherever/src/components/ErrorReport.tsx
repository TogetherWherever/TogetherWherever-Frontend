'use client';

import { LinkSlashIcon } from '@heroicons/react/24/solid';

export default function ErrorReport() {
    return (
        <div className="flex flex-col">
            <LinkSlashIcon className="h-6 w-6 text-red-500" />
            <strong>Error:</strong> Something went wrong. Please try again later.
        </div>
    );
}