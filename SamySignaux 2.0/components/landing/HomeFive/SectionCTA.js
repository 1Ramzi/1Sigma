"use client";
import Link from "next/link";

export default function SectionCTA() {
	return (
		<div className="section bg-gray-500">
			<div className="container">
				<div className="zuzu-cta3-wrap">
					<div className="zuzu-section-title mb-0">
						<div className="zuzu-default-content dark font-grotesk">
							<h5>
								<span>Explore the virtual world</span>
							</h5>
							<h2>Let's explore the virtual world through Metaverse</h2>
							<div className="zuzu-btn-wrap wow fadeInUpX" data-wow-delay="0.20s">
								<Link href={"/contact-light"} legacyBehavior>
									<a className="zuzu-btn btn-deep-pink">Discover More</a>
								</Link>
							</div>
						</div>
					</div>
					<div className="zuzu-shape4">
						<img src="/images/shape/shape4.png" alt="" />
					</div>
					<div className="zuzu-shape5">
						<img src="/images/all-img/v5/world2.png" alt="" />
					</div>
				</div>
			</div>
		</div>
	);
}
