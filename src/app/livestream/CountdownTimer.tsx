'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
  serviceDays: string[];
}

export function CountdownTimer({ targetDate, serviceDays }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isExpired) {
    return (
      <div className="text-center">
        <p className="text-white text-lg font-semibold mb-2">Service Starting Soon!</p>
        <p className="text-gray-400 text-sm">Join us now</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-gray-400 text-sm mb-3">Next Service In:</p>
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-gray-700 rounded-lg p-2">
          <div className="text-2xl font-bold text-white">{timeLeft.days}</div>
          <div className="text-xs text-gray-400">Days</div>
        </div>
        <div className="bg-gray-700 rounded-lg p-2">
          <div className="text-2xl font-bold text-white">{timeLeft.hours}</div>
          <div className="text-xs text-gray-400">Hrs</div>
        </div>
        <div className="bg-gray-700 rounded-lg p-2">
          <div className="text-2xl font-bold text-white">{timeLeft.minutes}</div>
          <div className="text-xs text-gray-400">Min</div>
        </div>
        <div className="bg-gray-700 rounded-lg p-2">
          <div className="text-2xl font-bold text-white">{timeLeft.seconds}</div>
          <div className="text-xs text-gray-400">Sec</div>
        </div>
      </div>
      <p className="text-gray-400 text-xs mt-3">
        {serviceDays.join(' & ')} Services at 9:00 AM
      </p>
    </div>
  );
}
