"use client";
import Link from "next/link";

export default function SectionFour() {
	return (
		<div className="section bg-gray-500 zuzu-section-padding-bottom overflow-hidden extra-padding">
			<div className="container">
				<div className="row">
					<div className="col-lg-6 order-lg-2">
						<div className="zuzu-circle-thumb wow fadeInUpX" data-wow-delay="0.1s">
							<img src="/images/all-img/v1/user.png" alt="" />
						</div>
					</div>
					<div className="col-lg-6 d-flex align-items-center">
						<div className="zuzu-default-content dark large font-cabin m_right">
							<h2>This card supports multiple currencies</h2>
							<p>
								Zuzu allows users to store more than 1,400 cryptocurrencies, and it also provides
								options for people who want to buy, exchange, or stake digital assets directly from
								their wallets.
							</p>
							<p>
								Unlike some of its competitors, Atomic Wallet doesn't have the option of directly
								connecting your holdings to cold storage.
							</p>
							<div className="zuzu-btn-wrap">
								<Link href={"contact-light"} legacyBehavior>
									<a className="zuzu-btn pill btn-blue">See all currencies</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
