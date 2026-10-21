import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  if (timeLeft.isPassed) {
    return (
      <div className="text-center py-4">
        <p className="font-serif italic text-xl text-[#786142]">Today is the day! Celebrating our forever.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-[#EBE3D5] shadow-xs"
          >
            <span className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light text-[#292524] tabular-nums tracking-tight">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-[#8A7968] mt-1">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
