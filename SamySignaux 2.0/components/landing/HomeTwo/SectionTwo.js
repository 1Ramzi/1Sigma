"use client";
import Link from "next/link";
import { Accordion } from "react-bootstrap";

export default function SectionTwo() {
	return (
		<div className="section zuzu-section-padding-bottom">
			<div className="container">
				<div className="row">
					<div className="col-lg-6 order-lg-2">
						<div className="zuzu-card-thumb-wrap">
							<div className="zuzu-card-wrap zuzu-card5">
								<div className="zuzu-card-thumb">
									<img src="/images/all-img/v2/card2.png" alt="" />
								</div>
								<div className="zuzu-card-data">
									<h3>Rainbow Unicorn</h3>
									<div className="zuzu-card-footer-data">
										<h4>#0833</h4>
										<Link href={"/"} legacyBehavior>
											<a className="zuzu-card-btn bg-success-400">Rare</a>
										</Link>
									</div>
								</div>
							</div>
							<div className="zuzu-card-wrap zuzu-card4">
								<div className="zuzu-card-thumb">
									<img src="/images/all-img/v2/card1.png" alt="" />
								</div>
								<div className="zuzu-card-data">
									<h3>Jumping Mushroom</h3>
									<div className="zuzu-card-footer-data">
										<h4>#0833</h4>
										<Link href={"/"} legacyBehavior>
											<a className="zuzu-card-btn bg-primary-600">Exclusive</a>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-6 col-md-10 d-flex align-items-center">
						<div className="zuzu-default-content large">
							<h2>How zuzu works for NFT collection</h2>
							<p>
								We are a next-generation NFT marketplace built for the growing wave of forward-thinking
								creators, innovators, and traders.
							</p>
							<div className="zuzu--accordion-one accordion-two accordion-seven" id="accordionExample2">
								<Accordion defaultActiveKey="0">
									<Accordion.Item eventKey="0">
										<Accordion.Header>Connect your wallet</Accordion.Header>
										<Accordion.Body>
											The most secure way to secure your crypto is by using best hardware wallet.
											If you are able buying/selling/creating NFTs.
										</Accordion.Body>
									</Accordion.Item>
									<Accordion.Item eventKey="1">
										<Accordion.Header>Create your NFTs</Accordion.Header>
										<Accordion.Body>
											The most secure way to secure your crypto is by using best hardware wallet.
											If you are able buying/selling/creating NFTs.
										</Accordion.Body>
									</Accordion.Item>
									<Accordion.Item eventKey="2">
										<Accordion.Header>List them for sale</Accordion.Header>
										<Accordion.Body>
											The most secure way to secure your crypto is by using best hardware wallet.
											If you are able buying/selling/creating NFTs.
										</Accordion.Body>
									</Accordion.Item>
								</Accordion>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
