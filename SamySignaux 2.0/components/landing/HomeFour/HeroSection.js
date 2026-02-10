"use client";
import Link from "next/link";

export default function HeroSection() {
	return (
		<div className="zuzu-hero-section4">
			<div className="container">
				<div className="row">
					<div className="col-xl-6 col-lg-7">
						<div className="zuzu-hero-content zuzu-hero-content4">
							<h5 className="wow fadeInUpX" data-wow-delay="0s">
								Bringing your projects into the world of NFT
							</h5>
							<h1 className="wow fadeInUpX" data-wow-delay="0.25s">
								We are here to help launch your NFT projects
							</h1>
							<p className="wow fadeInUpX" data-wow-delay="0.50s">
								It is important to do research before investing in non-fungible tokens. We help you
								determine the right price to sell your own collectibles in the future.
							</p>

							<Link href={"/contact-light"} legacyBehavior>
								<a className="zuzu-btn zuzu-icon-btn2 wow fadeInUpX" data-wow-delay="0.70s">
									Get started now <img src="/images/svg/arrow-right-white.svg" alt="" />
								</a>
							</Link>
						</div>
					</div>
					<div className="col-xl-6 col-lg-5">
						<div className="zuzu-hero-thumb4">
							<div className="zuzu-hero-thumb-inner thumb-one">
								<img src="/images/all-img/v4/card1.png" alt="" />
							</div>
							<div className="zuzu-hero-thumb-inner thumb-two">
								<img src="/images/all-img/v4/card2.png" alt="" />
							</div>
							<div className="zuzu-hero-thumb-inner thumb-three">
								<img src="/images/all-img/v4/card3.png" alt="" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
