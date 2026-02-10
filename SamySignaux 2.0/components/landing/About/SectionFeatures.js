"use client";
export default function SectionFeatures({ dark }) {
	return (
		<div className={`section zuzu-section-padding3  ${dark ? "bg-gray-800" : "bg-gray-400"}`}>
			<div className="container">
				<div className="zuzu-section-title">
					<div className={`zuzu-default-content ${dark && "dark"}`}>
						<h5>
							<strong>Our core values</strong>
						</h5>
						<h2 className="font-black">Innovative features that make us unique to everyone</h2>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4 col-md-6">
						<div
							className={`zuzu-iconbox-wrap7 active wow fadeInUpX ${dark && "dark"}`}
							data-wow-delay="0s"
						>
							<div className="zuzu-iconbox-icon7">
								<img src="/images/all-img/about/icon1.png" alt="" />
							</div>
							<div className="zuzu-iconbox-data7">
								<h4>Increased Capacity</h4>
								<p>
									This is the first & an important feature of Blockchain. The most remarkable thing
									about this Blockchain.
								</p>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-md-6">
						<div className={`zuzu-iconbox-wrap7 wow fadeInUpX ${dark && "dark"}`} data-wow-delay="0.1s">
							<div className="zuzu-iconbox-icon7">
								<img src="/images/all-img/about/icon2.png" alt="" />
							</div>
							<div className="zuzu-iconbox-data7">
								<h4>Better Security</h4>
								<p>
									Blockchain technology is considered more secure than its contemporaries because of
									lack of a single point.
								</p>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-md-6">
						<div
							className={`zuzu-iconbox-wrap7 active wow fadeInUpX ${dark && "dark"}`}
							data-wow-delay="0.2s"
						>
							<div className="zuzu-iconbox-icon7">
								<img src="/images/all-img/about/icon3.png" alt="" />
							</div>
							<div className="zuzu-iconbox-data7">
								<h4>Immutability</h4>
								<p>
									Creating immutable ledgers is one of the main values of Blockchain. Any database
									that is centralized.
								</p>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-md-6">
						<div className={`zuzu-iconbox-wrap7 wow fadeInUpX ${dark && "dark"}`} data-wow-delay="0.3s">
							<div className="zuzu-iconbox-icon7">
								<img src="/images/all-img/about/icon4.png" alt="" />
							</div>
							<div className="zuzu-iconbox-data7">
								<h4>Faster Settlement</h4>
								<p>
									Traditional banking systems are very a unbelievably slow, probably because of they
									require a settlement time.
								</p>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-md-6">
						<div
							className={`zuzu-iconbox-wrap7 active wow fadeInUpX ${dark && "dark"}`}
							data-wow-delay="0.4s"
						>
							<div className="zuzu-iconbox-icon7">
								<img src="/images/all-img/about/icon5.png" alt="" />
							</div>
							<div className="zuzu-iconbox-data7">
								<h4>Decentralized System</h4>
								<p>
									Decentralized technology gives you the ability to store your on a network without
									the oversight.
								</p>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-md-6">
						<div className={`zuzu-iconbox-wrap7 wow fadeInUpX ${dark && "dark"}`} data-wow-delay="0.5s">
							<div className="zuzu-iconbox-icon7">
								<img src="/images/all-img/about/icon6.png" alt="" />
							</div>
							<div className="zuzu-iconbox-data7">
								<h4>Consensus Oriented</h4>
								<p>
									The consensus algorithm is an integral feature of every blockchain and indeed is a
									defining characteristic.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
