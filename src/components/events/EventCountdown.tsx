'use client';

import { useState, useEffect } from 'react';
import { EVENTS_FALLBACKS } from '@/constants/fallbacks';

interface EventCountdownProps {
  date: string;
  endDate?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const EventCountdown: React.FC<EventCountdownProps> = ({ date, endDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [eventStatus, setEventStatus] = useState<'upcoming' | 'now' | 'ended'>('upcoming');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const eventDate = new Date(date).getTime();
      const eventEndDate = endDate ? new Date(endDate).getTime() : eventDate;

      if (now < eventDate) {
        // Event is upcoming
        const difference = eventDate - now;
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setEventStatus('upcoming');
      } else if (now >= eventDate && now <= eventEndDate) {
        // Event is happening now
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setEventStatus('now');
      } else {
        // Event has ended
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setEventStatus('ended');
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [date, endDate]);

  if (eventStatus === 'now') {
    return (
      <div className="text-center text-green-600 font-semibold text-lg">
        {EVENTS_FALLBACKS.countdown.eventNow}
      </div>
    );
  }

  if (eventStatus === 'ended') {
    return (
      <div className="text-center text-gray-500 font-semibold text-lg">
        {EVENTS_FALLBACKS.countdown.eventEnded}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4 text-center" aria-live="off">
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="text-2xl font-bold text-blue-600">{timeLeft.days}</div>
        <div className="text-sm text-gray-600">{EVENTS_FALLBACKS.countdown.days}</div>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="text-2xl font-bold text-blue-600">{timeLeft.hours}</div>
        <div className="text-sm text-gray-600">{EVENTS_FALLBACKS.countdown.hours}</div>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="text-2xl font-bold text-blue-600">{timeLeft.minutes}</div>
        <div className="text-sm text-gray-600">{EVENTS_FALLBACKS.countdown.minutes}</div>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="text-2xl font-bold text-blue-600">{timeLeft.seconds}</div>
        <div className="text-sm text-gray-600">{EVENTS_FALLBACKS.countdown.seconds}</div>
      </div>
    </div>
  );
};

export default EventCountdown;
