'use client';
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Settings, Clock, X, Plus, Sun, Moon } from 'lucide-react';
import { toast } from 'react-hot-toast';

const TimeZoneDisplay = () => {
  const [timeZones, setTimeZones] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      const storedTimeZones = localStorage.getItem('timeZones');
      if (storedTimeZones) {
        return JSON.parse(storedTimeZones);
      }
    }
    return [
      { id: 1, city: 'San Francisco, CA, United States', timezone: 'America/Los_Angeles' },
      { id: 2, city: 'New York, NY, United States', timezone: 'America/New_York' },
      { id: 3, city: 'London, United Kingdom', timezone: 'Europe/London' },
      { id: 5, city: 'Lisbon, Portugal', timezone: 'Europe/Lisbon' },
    ];
  });
  interface TimeZone {
    id: number;
    city: string;
    timezone: string;
    time?: string;
    date?: string;
    isDaytime?: boolean;
    isMorning?: boolean;
  }
  
  const [times, setTimes] = useState<TimeZone[]>([]);
  const [use24Hour, setUse24Hour] = useState(false);
  const [showSeconds, setShowSeconds] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [newTimeZone, setNewTimeZone] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
      // get local storage
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem('darkMode') === 'true';
      }
      // get system preference
    if (typeof window !== 'undefined') {
      return window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    }
  
    return false;
  });

  const toggleDarkMode = (dark: boolean) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('darkMode', dark.toString());
    }
    setDarkMode(dark);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchTimeZone = async (city: string) => {
    const response = await fetch('/api/timezone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ city })
    });
    if (!response.ok) {
      const responseBody = await response.json();
      toast.error(` ${responseBody.error}`);
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  };
  const addTimeZone = async () => {
    if (newTimeZone) {
      const data = await fetchTimeZone(newTimeZone);
      const { city, timezone } = data;
      const updatedTimeZones = [
      ...timeZones,
      {
        id: Date.now(),
        city,
        timezone,
      },
      ];
      setTimeZones(updatedTimeZones);
      if (typeof localStorage !== 'undefined') {
      localStorage.setItem('timeZones', JSON.stringify(updatedTimeZones));
      }
      setNewTimeZone('');
    }
  };

  useEffect(() => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZones(prevZones => {
      const updatedZones = [{ id: 0, city: 'Your Location', timezone: userTimeZone }, ...prevZones];
      const uniqueZones = Array.from(new Set(updatedZones.map(zone => JSON.stringify(zone))))
        .map(str => JSON.parse(str));
      return uniqueZones;
    });
  }, []);



  useEffect(() => {
    const updateTimes = () => {
      const newTimes = timeZones.map(tz => {
        const now = new Date();
        const timeString = now.toLocaleString('en-US', { 
          timeZone: tz.timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: showSeconds ? '2-digit' : undefined,
          hour12: !use24Hour
        });
        const dateString = now.toLocaleString('en-US', { 
          timeZone: tz.timezone,
          weekday: 'long',
          day: 'numeric',
          year: 'numeric'
        });
        const hour = now.toLocaleString('en-US', { 
          timeZone: tz.timezone,
          hour: 'numeric',
          hour12: false
        });
        const isDaytime = (Number(hour) >= 6 && Number(hour) < 18) || Number(hour) === 17;
        const isMorning = Number(hour) >= 6 && Number(hour) < 12;
        return {
          ...tz,
          time: timeString,
          date: dateString,
          isDaytime,
          isMorning
        };
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [timeZones, use24Hour, showSeconds]);
  const deleteTimeZone = (id: number) => {
    setTimeZones(prevZones => {
      const updatedZones = prevZones.filter(zone => zone.id !== id);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('timeZones', JSON.stringify(updatedZones));
      }
      return updatedZones;
    });
  };


const getGradient = (isDaytime: boolean, isMorning: boolean) => {
    if (isMorning) {
        return 'bg-gradient-to-br from-red-400 to-amber-600';
    }
    return isDaytime
        ? 'bg-gradient-to-br from-blue-400 to-blue-600'
        : 'bg-gradient-to-br from-indigo-900 to-purple-900';
};

  return (
    <div className={`flex flex-col h-screen w-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-500`}>
      <div className="flex-grow flex flex-wrap overflow-auto p-4">
        {times.map((tz) => (
          <div 
            key={tz.id} 
            className={`flex flex-col justify-between min-w-[200px] p-4 m-2 rounded-lg shadow-lg transition-all duration-300 ease-in-out  ${getGradient(tz.isDaytime ?? false, tz.isMorning ?? false)}`}
            style={{flex: '1 0 calc(20% - 1rem)'}}
          >
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {tz.time}
              </div>
              <div className="text-sm md:text-base text-white opacity-80">
                {tz.date}
              </div>
            </div>
            <div className="mt-4 flex justify-between items-end">
              <div className="text-sm md:text-base font-semibold text-white">
                {tz.city}
              </div>
              {tz.id !== 0 && (
                <button 
                type='button'
                  onClick={() => deleteTimeZone(tz.id)}
                  className="text-white opacity-60 hover:opacity-100 transition-opacity duration-200"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            {tz.isDaytime ? <Sun className="absolute top-2 right-2 text-yellow-300" size={18} /> : <Moon className="absolute top-2 right-2 text-blue-200" size={18} />}
          </div>
        ))}
      </div>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 transition-colors duration-500`}>
        <button 
        type='button'
          onClick={() => setShowOptions(!showOptions)}
          className={`flex items-center ${darkMode ? 'text-white bg-blue-600' : 'text-gray-800 bg-blue-400'} px-4 py-2 rounded transition-colors duration-200 hover:bg-blue-500`}
        >
          <Settings className="mr-2" size={18} />
          Options
        </button>
        {showOptions && (
          <div className="mt-4 flex flex-wrap items-center space-x-4">
            <label className={`flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <input 
                type="checkbox" 
                checked={use24Hour}
                onChange={() => setUse24Hour(!use24Hour)}
                className="mr-2"
              />
              24-Hour Time
            </label>
            <label className={`flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <input 
                type="checkbox" 
                checked={showSeconds}
                onChange={() => setShowSeconds(!showSeconds)}
                className="mr-2"
              />
              Show Seconds
            </label>
            <div className="flex items-center mt-2 md:mt-0">
              <input 
                type="text" 
                value={newTimeZone}
                onChange={(e) => setNewTimeZone(e.target.value)}
                placeholder="Add new time zone"
                className="px-2 py-1 rounded mr-2 border border-gray-300"
              />
              <button 
              type='button'
                onClick={addTimeZone}
                className={`flex items-center ${darkMode ? 'text-white bg-green-600' : 'text-gray-800 bg-green-400'} px-3 py-1 rounded transition-colors duration-200 hover:bg-green-500`}
              >
                <Plus size={16} className="mr-1" />
                Add
              </button>
            </div>
            <button
            type='button'
              onClick={() => toggleDarkMode(!darkMode)}
              className={`flex items-center font-bold ${darkMode ? 'text-white bg-yellow-600' : 'text-gray-800 bg-indigo-400'} px-3 py-1 rounded transition-colors duration-200 hover:opacity-80 mt-2 md:mt-0`}
            >
              {darkMode ? <Sun size={16} className="mr-1" /> : <Moon size={16} className="mr-1" />}
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeZoneDisplay;
