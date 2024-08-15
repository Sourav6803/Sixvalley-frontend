import React, { useEffect, useState } from 'react'

const CountDown = ({data}) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000);
        return () => clearTimeout(timer)
    },)

    function calculateTimeLeft() {
        const difference = +new Date(data?.Finish_Date) - +new Date();
        let timeLeft = {};
    
        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        }
    
        return timeLeft;
      }

    const timerComponents = Object.keys(timeLeft).map((interval, index) => {
        if (!timeLeft[interval]) {
            return null;
        }

        return (
            <span className="text-[18px] text-[#475ad2]" key={index}>
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });

    // console.log(timerComponents)

    return (
        <div>
            {timerComponents.length ? (timerComponents) : (<span className='text-[red] text-[12px]'>Time's up!</span>)}
           
        </div>
    )
}

export default CountDown