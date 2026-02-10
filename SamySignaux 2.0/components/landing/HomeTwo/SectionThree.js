"use client";
import { Accordion } from "react-bootstrap";
export default function SectionThree() {
	return (
		<div className="section bg-gray-800 zuzu-section-padding3">
			<div className="container">
				<div className="zuzu-section-title">
					<div className="zuzu-default-content large dark">
						<h2>Combines the best features of crypto</h2>
					</div>
				</div>
				<div
					className="zuzu-iconbox-bg"
					style={{ backgroundImage: "url('/images/all-img/v2/shape-dots.png')" }}
				>
					<div className="row">
						<div className="col-lg-3 col-md-6">
							<div className="zuzu-iconbox-wrap wow fadeInUpX" data-wow-delay="0.1s">
								<div className="zuzu-iconbox-icon">
									<img src="/images/all-img/v2/n_1.png" alt="" />
								</div>
								<div className="zuzu-iconbox-data">
									<h4>Launch</h4>
									<p>
										Launches face the challenge of pricing something that has never had a price
										before.
									</p>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-md-6">
							<div className="zuzu-iconbox-wrap custom_margin_b wow fadeInUpX" data-wow-delay="0.2s">
								<div className="zuzu-iconbox-icon">
									<img src="/images/all-img/v2/n_2.png" alt="" />
								</div>
								<div className="zuzu-iconbox-data">
									<h4>Getting Investments</h4>
									<p>
										Many invest in NFTs due to their financial potential, as reselling to be a
										lucrative path.
									</p>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-md-6">
							<div className="zuzu-iconbox-wrap wow fadeInUpX" data-wow-delay="0.3s">
								<div className="zuzu-iconbox-icon">
									<img src="/images/all-img/v2/n_3.png" alt="" />
								</div>
								<div className="zuzu-iconbox-data">
									<h4>Opening Collections</h4>
									<p>
										On average, NFT costs can be as low as $0.01 but go into the most thousands of
										dollars
									</p>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-md-6">
							<div className="zuzu-iconbox-wrap custom_margin_b wow fadeInUpX" data-wow-delay="0.4s">
								<div className="zuzu-iconbox-icon">
									<img src="/images/all-img/v2/n_4.png" alt="" />
								</div>
								<div className="zuzu-iconbox-data">
									<h4>Getting Investments</h4>
									<p>
										Many invest in NFTs due to their financial potential, as reselling to be a
										lucrative path.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
