import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  endDate: string;
}

export default function CountdownTimer({ endDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endDate).getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (!timeLeft) return null;

  return (
    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-red-100 p-2 transform transition-all duration-300 group-hover:opacity-0 pointer-events-none">
      <div className="flex items-center justify-center gap-2 mb-1">
        <Clock className="w-3.5 h-3.5 text-red-600" />
        <span className="text-xs font-poppins font-bold text-red-600 uppercase tracking-widest">Flash Sale Ends In</span>
      </div>
      <div className="flex justify-center gap-3 font-mono text-sm font-bold text-zivara-black">
        <div className="flex flex-col items-center">
          <span className="bg-red-50 text-red-600 px-2 rounded">{timeLeft.hours.toString().padStart(2, '0')}</span>
          <span className="text-[10px] text-gray-500 font-poppins font-medium mt-0.5 uppercase">Hrs</span>
        </div>
        <span className="text-gray-300 mt-0.5">:</span>
        <div className="flex flex-col items-center">
          <span className="bg-red-50 text-red-600 px-2 rounded">{timeLeft.minutes.toString().padStart(2, '0')}</span>
          <span className="text-[10px] text-gray-500 font-poppins font-medium mt-0.5 uppercase">Min</span>
        </div>
        <span className="text-gray-300 mt-0.5">:</span>
        <div className="flex flex-col items-center">
          <span className="bg-red-50 text-red-600 px-2 rounded">{timeLeft.seconds.toString().padStart(2, '0')}</span>
          <span className="text-[10px] text-gray-500 font-poppins font-medium mt-0.5 uppercase">Sec</span>
        </div>
      </div>
    </div>
  );
}
