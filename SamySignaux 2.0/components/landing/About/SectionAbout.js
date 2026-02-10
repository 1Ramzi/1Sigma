"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
const ModalVideo = dynamic(() => import("react-modal-video"), { ssr: false });

export default function SectionAbout({ dark }) {
	const [isOpen, setOpen] = useState(false);
	return (
		<div className={`section zuzu-section-padding ${dark && "bg-gray-500"}`}>
			<div className="container">
				<div className="row">
					<div className="col-xl-6 col-lg-6">
						<div className="zuzu-thumb position-relative wow fadeInUpX" data-wow-delay="0.10s">
							<img src=" /images/all-img/about/video-thumb.png" alt="" />
							<a className="zuzu-popup" onClick={() => setOpen(true)}>
								<img src="/images/all-img/v4/play-button.png" alt="" />
								<div className="waves wave-1" />
								<div className="waves wave-2" />
								<div className="waves wave-3" />
							</a>
						</div>
					</div>
					<div className="col-xl-5 offset-xl-1 col-lg-6 d-flex align-items-center">
						<div className={`zuzu-default-content ${dark && "dark"}`}>
							<h5>
								<strong>Learn about us</strong>
							</h5>
							<h2 className="font-black">The story behind how our company started</h2>
							<p>
								Zuzu is an innovative company that work for launched an NFT project focused on
								documenting and celebrating the history of the Ethereum blockchain since 2016.
							</p>
							<p>
								We have a diverse team of 50 blockchain developers who can work on multiple
								environments. Decentral code is the best token development company in South East Asia.
							</p>
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
