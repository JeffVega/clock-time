"use client";
import { useState, useEffect, type FC } from "react";
import { X } from "lucide-react";

const CookieConsent: FC = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Check if user has already made a choice
		const consent = localStorage.getItem("cookieConsent");
		if (!consent) {
			setIsVisible(true);
		}
	}, []);

	const handleAccept = () => {
		localStorage.setItem("cookieConsent", "accepted");
		setIsVisible(false);
		// Here you would initialize your tracking code
		console.log("Tracking enabled");
	};

	const handleReject = () => {
		localStorage.setItem("cookieConsent", "rejected");
		setIsVisible(false);
		console.log("Tracking disabled");
	};

	if (!isVisible) return null;

	return (
		<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50">
			<div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
				<div className="flex-1">
					<p className="text-gray-700">
						We use cookies to enhance your browsing experience and analyze our
						traffic. Please choose whether you want to accept these cookies.
					</p>
				</div>
				<div className="flex gap-3">
					<button
						type="button"
						onClick={handleReject}
						className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
					>
						Reject All
					</button>
					<button
						type="button"
						onClick={handleAccept}
						className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
					>
						Accept All
					</button>
				</div>
				<button
					type="button"
					onClick={handleReject}
					className="absolute top-2 right-2 sm:hidden text-gray-400 hover:text-gray-600"
				>
					<X size={20} />
				</button>
			</div>
		</div>
	);
};

export default CookieConsent;
