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
							<h2>Partnered with the Best for Your Safety</h2>
							<p>
								We only work with regulated, highly reliable brokers. We have selected partners that offer
								low spreads, fast execution, and top-tier security for your funds.
							</p>
							<p>
								Your trading environment matters. By using our recommended broker, you ensure you are
								trading on a level playing field, while supporting our community to keep it free for everyone.
							</p>
							<div className="zuzu-btn-wrap">
								<Link href={"/register"} legacyBehavior>
									<a className="zuzu-btn pill btn-blue">Join Broker Now</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
