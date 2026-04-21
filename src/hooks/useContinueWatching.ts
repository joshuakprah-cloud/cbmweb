'use client';

import { useState, useEffect } from 'react';

interface WatchedSermon {
  sermonId: string;
  slug: string;
  title: string;
  speaker: string;
  thumbnail?: string;
  progress: number; // percentage watched (0-100)
  duration: number; // total duration in seconds
  currentTime: number; // current position in seconds
  lastWatched: string; // ISO date string
  videoUrl?: string;
}

const STORAGE_KEY = 'sermon-watch-history';
const MAX_HISTORY = 5; // Keep last 5 sermons

export function useContinueWatching() {
  const [watchedSermons, setWatchedSermons] = useState<WatchedSermon[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Filter out sermons older than 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const validSermons = parsed.filter((sermon: WatchedSermon) => {
          const watchDate = new Date(sermon.lastWatched);
          return watchDate > thirtyDaysAgo && sermon.progress < 95; // Don't show if 95%+ watched
        });
        
        setWatchedSermons(validSermons);
      }
    } catch (error) {
      console.error('Error loading watch history:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever watchedSermons changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedSermons));
      } catch (error) {
        console.error('Error saving watch history:', error);
      }
    }
  }, [watchedSermons, isLoaded]);

  const updateProgress = (sermon: Omit<WatchedSermon, 'lastWatched'>) => {
    setWatchedSermons((prev) => {
      const existingIndex = prev.findIndex((s) => s.sermonId === sermon.sermonId);
      
      const updatedSermon: WatchedSermon = {
        ...sermon,
        lastWatched: new Date().toISOString(),
      };

      let newHistory: WatchedSermon[];
      
      if (existingIndex >= 0) {
        // Update existing
        newHistory = [...prev];
        newHistory[existingIndex] = updatedSermon;
      } else {
        // Add new, keep only MAX_HISTORY
        newHistory = [updatedSermon, ...prev].slice(0, MAX_HISTORY);
      }
      
      return newHistory;
    });
  };

  const removeFromHistory = (sermonId: string) => {
    setWatchedSermons((prev) => prev.filter((s) => s.sermonId !== sermonId));
  };

  const clearHistory = () => {
    setWatchedSermons([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Get the most recently watched sermon with < 95% progress
  const lastWatched = watchedSermons[0] || null;

  return {
    watchedSermons,
    lastWatched,
    updateProgress,
    removeFromHistory,
    clearHistory,
    isLoaded,
  };
}

// Helper to format time (seconds to MM:SS or HH:MM:SS)
export function formatDuration(seconds: number): string {
  if (!seconds || isNaN(seconds)) return '0:00';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Helper to calculate remaining time
export function getRemainingTime(currentTime: number, duration: number): string {
  const remaining = duration - currentTime;
  return formatDuration(remaining);
}
