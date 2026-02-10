"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
const ModalVideo = dynamic(() => import("react-modal-video"), { ssr: false });

export default function SectionFour() {
	const [isOpen, setOpen] = useState(false);
	return (
		<div className="bg-gray-500">
			<div className="container">
				<div className="zuzu-section-title">
					<div className="zuzu-default-content sm dark font-syne">
						<h2>Watch this video to see how easy it is to use blockchain</h2>
					</div>
				</div>
				<div className="zuzu-video-thumb wow fadeInUpX m-0" data-wow-delay=".10s">
					<img src="/images/all-img/v3/video-thumb.png" alt="" />
					<a onClick={() => setOpen(true)} className="zuzu-popup">
						<img src="/images/all-img/v3/play-button.png" alt="" />
						<div className="waves waves2 wave-1" />
						<div className="waves waves2 wave-2" />
						<div className="waves waves2 wave-3" />
					</a>
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
