"use client";
import { Accordion } from "react-bootstrap";

export default function SectionThree() {
	return (
		<div className="section bg-gray-500 zuzu-section-padding2">
			<div className="container">
				<div className="row">
					<div className="col-lg-6 order-lg-2 d-lg-flex justify-content-lg-end">
						<div className="zuzu-earth-thumb wow fadeInUpX" data-wow-delay=".10s">
							<img src="/images/all-img/v3/earth2.png" alt="" />
						</div>
					</div>
					<div className="col-lg-6 d-flex align-items-center">
						<div className="zuzu-default-content sm dark font-syne">
							<h2>Blockchain is significant in the modern business world</h2>
							<p>
								10% of the global population own cryptocurrencies. 16% of Americans have invested in
								cryptocurrency. Using blockchain, financial institutions can save up to $12 billion
								every year.
							</p>
							<div className="zuzu--accordion-one accordion-two accordion-six" id="accordionExample">
								<Accordion defaultActiveKey="0">
									<Accordion.Item eventKey="0">
										<Accordion.Header>Building trust</Accordion.Header>
										<Accordion.Body>
											Bitcoin and cryptocurrencies, in general, are iconic examples of how
											blockchain builds trust between entities & also customers.
										</Accordion.Body>
									</Accordion.Item>
									<Accordion.Item eventKey="1">
										<Accordion.Header>Reducing costs</Accordion.Header>
										<Accordion.Body>
											Bitcoin and cryptocurrencies, in general, are iconic examples of how
											blockchain builds trust between entities & also customers.
										</Accordion.Body>
									</Accordion.Item>
									<Accordion.Item eventKey="2">
										<Accordion.Header>Bringing innovation</Accordion.Header>
										<Accordion.Body>
											Bitcoin and cryptocurrencies, in general, are iconic examples of how
											blockchain builds trust between entities & also customers.
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
