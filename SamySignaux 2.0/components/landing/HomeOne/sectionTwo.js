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
							<h2>True Trading Education. No Gimmicks.</h2>
							<p>
								Forget the "get rich quick" schemes. We teach you the pillars of successful trading:
								Technical Analysis, Risk Management, and Psychology.
							</p>
							<div className="zuzu-icon-list dark">
								<ul>
									<li>
										<img src="/images/svg/check2.svg" alt="" />
										Master Technical Analysis & Market Structure
									</li>
									<li>
										<img src="/images/svg/check2.svg" alt="" />
										Develop Iron-Clad Risk Management
									</li>
									<li>
										<img src="/images/svg/check2.svg" alt="" />
										Understand Trader Psychology & Discipline
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
