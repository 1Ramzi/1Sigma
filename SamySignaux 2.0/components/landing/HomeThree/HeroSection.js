"use client";
import Link from "next/link";

export default function HeroSection() {
	return (
		<div className="zuzu-hero-section3">
			<div className="container">
				<div className="zuzu-hero-content zuzu-dark-content zuzu-hero-content3 font-syne">
					<h1 className="wow fadeInUpX" data-wow-delay="0s">
						Blockchain platform for next-generation creators
					</h1>
					<p className="wow fadeInUpX" data-wow-delay="0.25s">
						We are a private decentralized blockchain platform that supports innovative financial
						instruments like decentralized applications & NFTs. It can be considered a modern variation of
						trading cards tied to digital assets.
					</p>
					<div className="zuzu-hero-btn-wrap justify-content-center wow fadeInUpX" data-wow-delay="0.40s">
						<Link href={"/contact-light"} legacyBehavior>
							<a className="zuzu-btn active gradient text-white">Request Invite</a>
						</Link>
						<Link href={"/contact-light"} legacyBehavior>
							<a className="zuzu-btn gradient bg-gray-800 text-white">Discover More</a>
						</Link>
					</div>
				</div>
			</div>
			<div className="zuzu-hero-box box1">
				<img src="/images/all-img/v3/box.png" alt="" />
			</div>
			<div className="zuzu-hero-box box2">
				<img src="/images/all-img/v3/box.png" alt="" />
			</div>
		</div>
	);
}
