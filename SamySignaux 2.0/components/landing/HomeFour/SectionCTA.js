"use client";
import Link from "next/link";

export default function SectionCTA() {
	return (
		<div className="zuzu-cta2-section bg-warning-50">
			<div className="container">
				<div className="zuzu-cta2-wrap">
					<div className="zuzu-section-title dark large mb-0">
						<h5>Join the community</h5>
						<h2 className="font-black">We are the committed team to help your NFT project launch</h2>
						<div className="zuzu-cta-footer">
							<Link href={"/contact-light"} legacyBehavior>
								<a
									className="zuzu-btn zuzu-icon-btn2 white-icon-btn wow fadeInUpX"
									data-wow-delay="0.20s"
								>
									Get started now <img src="/images/svg/arrow-right-black.svg" alt="" />
								</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
