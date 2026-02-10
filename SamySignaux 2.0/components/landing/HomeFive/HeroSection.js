"use client";
import Link from "next/link";

export default function HeroSection() {
	return (
		<div className="zuzu-hero-section5">
			<div className="container">
				<div className="row">
					<div className="col-xl-6">
						<div className="zuzu-hero-content zuzu-hero-content5 zuzu-dark-content font-grotesk">
							<span>Discover the new world of Metaverse</span>
							<h1 className="wow fadeInUpX" data-wow-delay="0s">
								Explore, create and earn through the metaverse
							</h1>
							<p className="wow fadeInUpX" data-wow-delay="0.25s">
								The Metaverse is the bridge between physical and virtual worlds within the decentralized
								and open-source virtual world.
							</p>
							<div className="zuzu-hero-btn-wrap wow fadeInUpX" data-wow-delay="0.40s">
								<Link href="/contact-light" legacyBehavior>
									<a className="zuzu-btn btn-deep-pink">Discover Now</a>
								</Link>
							</div>
						</div>
					</div>
					<div className="col-xl-6">
						<div className="zuzu-hero-thumb5">
							<img src="/images/all-img/v5/hero-thumb.png" alt="" />

							<div className="zuzu-hero-box box2">
								<img src="/images/all-img/v3/box.png" alt="" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
