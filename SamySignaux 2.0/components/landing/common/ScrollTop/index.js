"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

export default function ScrollTop() {
	const [showTopBtn, setShowTopBtn] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", (e) => {
			if (window.scrollY > 700) {
				setShowTopBtn(true);
			} else {
				setShowTopBtn(false);
			}
		});
	}, []);

	const goToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	return (
		showTopBtn && (
			<div className="zuzu-go-top" onClick={goToTop}>
				<img src="/images/svg/arrow-right-white.svg" alt="" />
			</div>
		)
	);
}
