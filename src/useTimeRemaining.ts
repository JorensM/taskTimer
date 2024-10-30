import { useEffect, useState } from 'react';
import { getTimeRemaining } from './util';

export default function useTimeRemaining(dueDate: string) {
    const [timeRemaining, setTimeRemaining] = useState<string>(getTimeRemaining(new Date(dueDate)));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(getTimeRemaining(new Date(dueDate)));
        }, 4);

        return () => {
            clearInterval(interval);
        }
    })

    return timeRemaining;
}