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
								<h2>Download and enjoy free card experience</h2>
								<p>
									Download & install crypto cards now to learn the safest, easiest and smartest way to
									buy, store, exchange, and spend cryptocurrencies.
								</p>
								<div className="zuzu-cta-btn-wrap">
									<Link href={"contact-light"} legacyBehavior>
										<a className="zuzu-app-btn">
											<img src="/images/all-img/v1/app-store.svg" alt="" />
										</a>
									</Link>
									<Link href={"contact-light"} legacyBehavior>
										<a className="zuzu-app-btn">
											<img src="/images/all-img/v1/play-store.svg" alt="" />
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
