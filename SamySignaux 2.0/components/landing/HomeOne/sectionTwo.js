"use client";
export default function SectionTwo() {
	return (
		<div className="section bg-gray-500 zuzu-section-padding-bottom">
			<div className="container">
				<div className="row">
					<div className="col-lg-6 order-lg-2 d-flex align-items-end">
						<div className="zuzu-bank-card-wrap wow fadeInUpX" data-wow-delay="0.1s">
							<div className="zuzu-bank-card1">
								<img src="/images/all-img/v1/card03.png" alt="" />
							</div>
							<div className="zuzu-bank-card2">
								<img src="/images/all-img/v1/card04.png" alt="" />
							</div>
						</div>
					</div>
					<div className="col-lg-6 d-flex align-items-center">
						<div className="zuzu-default-content dark large font-cabin">
							<h2>Manage your crypto only when you need</h2>
							<p>
								Related to the points just made, rather than keeping coins on exchanges or brokerages
								with crypto card, it's far safer to custody your own assets.
							</p>
							<div className="zuzu-icon-list dark">
								<ul>
									<li>
										<img src="/images/svg/check2.svg" alt="" />
										The easiest way to spend crypto worldwide
									</li>
									<li>
										<img src="/images/svg/check2.svg" alt="" />
										World-class security to keep your crypto safe
									</li>
									<li>
										<img src="/images/svg/check2.svg" alt="" />
										Easily choose which crypto you spend
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
