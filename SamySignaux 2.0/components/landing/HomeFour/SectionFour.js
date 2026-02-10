"use client";
import CardSliderThree from "../common/sliders/Card/CardSliderThree";

export default function SectionFour() {
	return (
		<div className="section bg-warning-50 zuzu-section-padding">
			<div className="container">
				<div className="row">
					<div className="col-lg-5 offset-lg-1 order-lg-2">
						<CardSliderThree />
					</div>
					<div className="col-lg-6 col-md-10 d-flex align-items-center">
						<div className="zuzu-default-content">
							<h2 className="font-black">zuzu creates a unique way to invest in NFTs tokens</h2>
							<p>
								It’s important to do your own research before investing in non-fungible tokens. These
								projects can be hard to value, and many NFTs are illiquid and selling your collectible
								in the future.
							</p>
							<div className="zuzu-icon-list">
								<ul>
									<li>
										<img src="/images/svg/check1.svg" alt="" />
										50% transaction fees allocated to the global staking pool
									</li>
									<li>
										<img src="/images/svg/check1.svg" alt="" />
										Strong fan base established on multiple social platform
									</li>
									<li>
										<img src="/images/svg/check1.svg" alt="" />
										Safe and secure to the extra benefits for NFTS stakers{" "}
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
