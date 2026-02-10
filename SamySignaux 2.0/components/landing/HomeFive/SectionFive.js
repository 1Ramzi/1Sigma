"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
const ModalVideo = dynamic(() => import("react-modal-video"), { ssr: false });

export default function SectionFive() {
	const [isOpen, setOpen] = useState(false);
	return (
		<div className="bg-gray-500 position-relative">
			<div className="container">
				<div className="zuzu-section-title">
					<div className="zuzu-default-content dark font-grotesk">
						<h5>
							<span>A new world is waiting</span>
						</h5>
						<h2>
							See the metaverse as an <br /> ever-changing reality
						</h2>
					</div>
				</div>
				<div className="zuzu-video-thumb wow fadeInUpX m-0" data-wow-delay=".10s">
					<img src="/images/all-img/v5/video-thumb.png" alt="" />
					<a onClick={() => setOpen(true)} className="zuzu-popup">
						<img src="/images/all-img/v5/play-button.png" alt="" />
						<div className="waves waves2 wave-1" />
						<div className="waves waves2 wave-2" />
						<div className="waves waves2 wave-3" />
					</a>
				</div>
			</div>
			<div className="zuzu-shape2">
				<img src="/images/shape/shape2.png" alt="" />
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
