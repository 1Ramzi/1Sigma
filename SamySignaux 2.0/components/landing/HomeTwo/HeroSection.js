"use client";
import Link from "next/link";
import CardSliderTwo from "../common/sliders/Card/CardSliderTwo";

export default function HeroSection() {
	return (
		<div className="zuzu-hero-section2">
			<div className="container">
				<div className="zuzu-hero-content zuzu-hero-content2">
					<h1 className="wow fadeInUpX" data-wow-delay="0s">
						TDigital platform for buying and selling NFTs
					</h1>
					<p className="wow fadeInUpX" data-wow-delay="0.25s">
						We offer a full-fledged long-term rental platform to cryptocurrency users. It plans to use
						blockchain technology to ensure a secure seamless rental experience.
					</p>
					<div className="zuzu-hero-btn-wrap justify-content-center wow fadeInUpX" data-wow-delay="0.40s">
						<Link href={"/contact-light"} legacyBehavior>
							<a className="zuzu-btn btn-pink rounded-pill">Explore Collections</a>
						</Link>
					</div>
				</div>
			</div>
			<CardSliderTwo />
		</div>
	);
}
