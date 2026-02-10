"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
const ModalVideo = dynamic(() => import("react-modal-video"), { ssr: false });

export default function HeroSection() {
	const [isOpen, setOpen] = useState(false);
	return (
		<div>
			<div
				className="zuzu-hero-section bg-cover"
				style={{ backgroundImage: "url(/images/all-img/v1/hero-bg.png)" }}
			>
				<div className="container">
					<div className="row">
						<div className="col-lg-6 d-flex align-items-center">
							<div className="zuzu-hero-content zuzu-dark-content font-cabin">
								<h1 className="wow fadeInUpX" data-wow-delay="0s">
									Master the Markets with Professional Guidance
								</h1>
								<p className="wow fadeInUpX" data-wow-delay="0.25s">
									We are building a community of disciplined traders. Access premium signals,
									comprehensive training, and daily mentorship for free—supported by our partner
									broker.
								</p>
								<div className="zuzu-hero-btn-wrap">
									<Link href={"/login"} legacyBehavior>
										<a className="zuzu-btn btn-white pill wow fadeInUpX" data-wow-delay="0.40s">
											Join the Community
										</a>
									</Link>
									<Link href={"#"} legacyBehavior>
										<a className="zuzu-popup zuzu-popup-hero" onClick={() => setOpen(true)}>
											<img src="/images/all-img/v1/play-button.png" alt="" />
											<div className="waves wave-1" />
											<div className="waves wave-2" />
											<div className="waves wave-3" />
											Our Philosophy
										</a>
									</Link>
								</div>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="zuzu-hero-card1">
								<img src="/images/all-img/v1/card01.png" alt="" />
							</div>
							<div className="zuzu-hero-card2">
								<img src="/images/all-img/v1/card02.png" alt="" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<ModalVideo
				channel="youtube"
				autoplay
				isOpen={isOpen}
				videoId="7e90gBu4pas"
				onClose={() => setOpen(false)}
			/>
		</div>
	);
}
