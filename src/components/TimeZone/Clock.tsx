"use client";
import React, { useState, useEffect } from "react";

export default function Clock({ timezone }: { timezone: string }) {
	const [time, setTime] = useState<string>("");

	useEffect(() => {
		const updateClock = () => {
			const date = new Date();
			const options: Intl.DateTimeFormatOptions = {
				timeZone: timezone,
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
			};
			setTime(new Intl.DateTimeFormat("en-US", options).format(date));
		};

		updateClock();
		const intervalId = setInterval(updateClock, 1000);

		return () => clearInterval(intervalId);
	}, [timezone]);
	const getGradient = (time: string) => {
		const [hour] = time.split(":").map(Number);
		const isMorning = hour >= 6 && hour < 12;
		const isDaytime = hour >= 6 && hour < 18;

		if (isMorning) {
			return "bg-gradient-to-br from-red-400 to-amber-600";
		}
		return isDaytime
			? "bg-gradient-to-br from-blue-400 to-blue-600"
			: "bg-gradient-to-br from-indigo-900 to-purple-900";
	};
	return (
		<div
			className={`flex flex-col justify-between min-w-[200px] p-4 m-2 rounded-lg shadow-lg transition-all duration-300 ease-in-out  ${getGradient(time)}`}
			style={{ flex: "1 0 calc(20% - 1rem)" }}
		>
			<div>
				<div className="text-4xl md:text-5xl font-bold text-white mb-2">
					{time}
				</div>
				<div className="text-sm md:text-base text-white opacity-80" />
			</div>
			<div className="mt-4 flex justify-between items-end">
				<div className="text-sm md:text-base font-semibold text-white" />
			</div>
		</div>
	);
}
