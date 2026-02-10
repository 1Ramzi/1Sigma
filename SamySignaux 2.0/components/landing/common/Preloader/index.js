"use client";
import { useEffect, useState } from "react";

export default function Preloader() {
	const [showLoader, setShowLoader] = useState(true);
	const [isLoded, setIsLoded] = useState(null);

	useEffect(() => {
		window.addEventListener("load", () => {
			setIsLoded("loaded");
		});

		const timer = setTimeout(() => {
			setShowLoader(false);
		}, 700);

		return () => clearTimeout(timer);
	});
	return (
		showLoader && (
			<div className={`zuzu-preloader ${isLoded}`}>
				<div className="preloader-square-swapping">
					<div className="cssload-square-part cssload-square-green" />
					<div className="cssload-square-part cssload-square-pink" />
					<div className="cssload-square-blend" />
				</div>
			</div>
		)
	);
}
