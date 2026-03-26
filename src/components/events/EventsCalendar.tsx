'use client';

import { useState, useMemo } from 'react';
import EventCard from './EventCard';
import { EVENTS_FALLBACKS } from '@/constants/fallbacks';

interface Event {
  _id: string;
  title: string;
  slug: string;
  date: string;
  endDate?: string;
  location?: string;
  excerpt?: string;
  coverImage?: string;
  category: string;
  isFree?: boolean;
  ticketPrice?: string;
  requiresRegistration?: boolean;
  tags?: string[];
}

interface EventsCalendarProps {
  events: Event[];
  onDayClick: (date: Date, dayEvents: Event[]) => void;
}

const EventsCalendar: React.FC<EventsCalendarProps> = ({ events, onDayClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Group events by date
  const eventsByDate = useMemo(() => {
    const grouped: { [key: string]: Event[] } = {};
    
    events.forEach(event => {
      const eventDate = new Date(event.date);
      const dateKey = eventDate.toISOString().split('T')[0];
      
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(event);
    });
    
    return grouped;
  }, [events]);

  // Get calendar days for current month
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
      
      if (current.getMonth() !== month && current.getDate() > 7) {
        break;
      }
    }
    
    return days;
  }, [currentMonth]);

  // Navigate months
  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  // Handle day click
  const handleDayClick = (date: Date) => {
    const dateKey = date.toISOString().split('T')[0];
    const dayEvents = eventsByDate[dateKey] || [];
    
    setSelectedDay(date.getDate());
    onDayClick(date, dayEvents);
  };

  // Check if date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  // Check if date is selected
  const isSelected = (date: Date) => {
    return date.getDate() === selectedDay &&
           date.getMonth() === currentMonth.getMonth() &&
           date.getFullYear() === currentMonth.getFullYear();
  };

  // Check if date is in current month
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  // Get events for a specific day
  const getEventsForDay = (date: Date) => {
    const dateKey = date.toISOString().split('T')[0];
    return eventsByDate[dateKey] || [];
  };

  // Get month name
  const monthName = currentMonth.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={previousMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label={EVENTS_FALLBACKS.calendar.previousMonth}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h3 className="text-xl font-semibold text-gray-900" aria-label={`${monthName} calendar`}>
          {monthName}
        </h3>
        
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label={EVENTS_FALLBACKS.calendar.nextMonth}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day of Week Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, index) => {
          const dayEvents = getEventsForDay(date);
          const isTodayDate = isToday(date);
          const isSelectedDate = isSelected(date);
          const isCurrentMonthDate = isCurrentMonth(date);
          
          return (
            <button
              key={index}
              onClick={() => handleDayClick(date)}
              className={`
                relative p-2 h-20 text-left rounded-lg transition-colors
                ${!isCurrentMonthDate ? 'text-gray-400' : 'text-gray-900'}
                ${isTodayDate ? 'ring-2 ring-blue-500' : ''}
                ${isSelectedDate ? 'bg-blue-100' : ''}
                ${dayEvents.length > 0 ? 'hover:bg-gray-100' : ''}
                ${isCurrentMonthDate ? 'cursor-pointer' : 'cursor-not-allowed'}
              `}
              disabled={!isCurrentMonthDate}
              aria-label={`${date.getDate()}${dayEvents.length > 0 ? `, ${dayEvents.length} events` : ''}`}
            >
              <div className="text-sm font-medium">{date.getDate()}</div>
              
              {/* Event Indicators */}
              {dayEvents.length > 0 && (
                <div className="absolute bottom-1 left-1 right-1">
                  <div className="flex gap-1">
                    {dayEvents.slice(0, 3).map((event, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-blue-500"
                      />
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-blue-600">
                        +{dayEvents.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Calendar Footer */}
      <div className="mt-6 text-center text-sm text-gray-600">
        {selectedDay && (
          <div>
            Selected: {selectedDay} {monthName}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsCalendar;
