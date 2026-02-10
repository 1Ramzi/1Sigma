"use client";
import Link from "next/link";

export default function CtaSection() {
	return (
		<div className="zuzu-cta-section bg-gray-500">
			<div className="container">
				<div className="zuzu-cta-wrap" style={{ backgroundImage: "url('/images/all-img/v1/cta-bg.png')" }}>
					<div className="row">
						<div className="col-xl-7 order-xl-2">
							<div className="zuzu-default-content dark large font-cabin">
								<h2>Ready to Start Your Trading Journey?</h2>
								<p>
									Join thousands of traders who have stopped gambling and started building real wealth through discipline and strategy.
									Access all our premium content for free today.
								</p>
								<div className="zuzu-cta-btn-wrap">
									<Link href={"/register"} legacyBehavior>
										<a className="zuzu-btn btn-white pill">
											Join Academy Now
										</a>
									</Link>
								</div>
							</div>
						</div>
						<div className="col-xl-5">
							<div className="zuzu-cta-thumb wow fadeInUpX" data-wow-delay="0.1s">
								<img src="/images/all-img/v1/iPhone.png" alt="" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
