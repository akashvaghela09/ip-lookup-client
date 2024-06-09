import React, { useState, useEffect } from "react";

// React component to display date and time
const DateTimeDisplay = ({ timeZone, location }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Function to format time with time zone and include seconds
    const formatTimeWithTimeZone = (date, timeZone) => {
        // Get the time string with hour, minute, and second
        const timeString = date.toLocaleTimeString("en-US", {
            timeZone,
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });

        // Get the UTC offset string
        const offsetString = date
            .toLocaleTimeString("en-US", {
                timeZoneName: "short",
                timeZone,
            })
            .split(" ")[2];

        // Return an object with time and offset
        return {
            time: timeString,
            offset: offsetString,
        };
    };

    // Function to format location with date
    const formatLocationWithDate = (date, location, timeZone) => {
        const options = {
            timeZone: timeZone,
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };

        const formatter = new Intl.DateTimeFormat("en-US", options);
        const formattedDate = formatter.format(date);

        return `${location} • ${formattedDate}`;
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const formattedTime = formatTimeWithTimeZone(currentDate, timeZone);
    const formattedLocationAndDate = formatLocationWithDate(
        currentDate,
        location,
        timeZone
    );

    return (
        <div className="flex flex-col gap-4">
            <p className="font-bold">Current Time</p>
            <div className="flex flex-col gap-2">
                <p className="font-semibold text-4xl">{formattedTime.time}</p>
                <p className="font-semibold text-lg">{formattedTime.offset}</p>
                <p>{formattedLocationAndDate}</p>
            </div>
        </div>
    );
};

export { DateTimeDisplay };
