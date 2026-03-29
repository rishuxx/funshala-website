

import React from 'react';
import { StarDoodle, SquiggleDoodle, RainbowDoodle, LetterADoodle, SunDoodle, CloudDoodle } from './IconComponents';

const DoodleBackground: React.FC = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-[0.07] pointer-events-none overflow-hidden">
            <StarDoodle className="absolute top-[10%] left-[5%] w-16 h-16 text-yellow-400 rotate-[-15deg] animate-twinkle" />
            <SquiggleDoodle className="absolute top-[25%] right-[8%] w-20 h-20 text-red-400 rotate-[10deg]" />
            <RainbowDoodle className="absolute top-[50%] left-[10%] w-24 h-24" />
            <LetterADoodle className="absolute top-[70%] right-[15%] w-16 h-16 text-blue-400 rotate-[20deg]" />
            <StarDoodle className="absolute bottom-[5%] right-[5%] w-12 h-12 text-purple-400 animate-twinkle" style={{animationDelay: '0.5s'}}/>
            <SquiggleDoodle className="absolute bottom-[10%] left-[25%] w-24 h-24 text-green-400 rotate-[-5deg]" />
            <SunDoodle className="absolute top-[5%] right-[30%] w-16 h-16 opacity-70 text-orange-400" />
            <LetterADoodle className="absolute bottom-[30%] left-[2%] w-12 h-12 text-orange-400 rotate-[-25deg]" />
            <CloudDoodle className="absolute top-[80%] left-[40%] w-32 h-auto text-blue-200" />
            <CloudDoodle className="absolute top-[15%] right-[50%] w-24 h-auto text-blue-200" />
        </div>
    );
};

export default DoodleBackground;
