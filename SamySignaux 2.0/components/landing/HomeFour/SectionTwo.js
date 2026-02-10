"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
const ModalVideo = dynamic(() => import("react-modal-video"), { ssr: false });

export default function SectionTwo() {
	const [isOpen, setOpen] = useState(false);
	return (
		<div className="section bg-warning-50 zuzu-section-padding">
			<div className="container">
				<div className="row">
					<div className="col-lg-6">
						<div className="zuzu-video-thumb4 wow fadeInUpX" data-wow-delay="0.10s">
							<img src="/images/all-img/v4/video-thumb.png" alt="" />
							<a className="zuzu-popup" onClick={() => setOpen(true)}>
								<img src="/images/all-img/v4/play-button.png" alt="" />
								<div className="waves wave-1" />
								<div className="waves wave-2" />
								<div className="waves wave-3" />
							</a>
						</div>
					</div>
					<div className="col-lg-6 d-flex align-items-center">
						<div className="zuzu-default-content">
							<h5>Learn about the platform</h5>
							<h2 className="font-black">A platform that offers the opportunity to collect NFTs</h2>
							<p>
								Our mission is to help clients ensure the integrity of the space continues to improve by
								providing them with a full of service to help them launch their projects..
							</p>
							<p>
								All our NFTs are tied to our unique rewards structure, meaning that as a long as you
								hold them in your wallet you’ll earn rewards, forever.
							</p>
							<div className="zuzu-btn-wrap">
								<Link href={"/"} legacyBehavior>
									<a className="zuzu-btn zuzu-icon-btn2 wow fadeInUpX" data-wow-delay="0.20s">
										Discover more
										<img src="/images/svg/arrow-right-white.svg" alt="" />
									</a>
								</Link>
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
