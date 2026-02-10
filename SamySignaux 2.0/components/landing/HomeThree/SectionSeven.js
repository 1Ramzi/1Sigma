"use client";
import Link from "next/link";
import { Accordion } from "react-bootstrap";

export default function SectionSeven() {
	return (
		<div className="section bg-gray-500 zuzu-section-padding">
			<div className="container">
				<div className="row">
					<div className="col-lg-6">
						<div className="zuzu-default-content sm dark font-syne">
							<h2>Answers to some common question about blockchain</h2>
							<p>
								Blockchain is the latest buzz words in the market. Bitcoin is great, but the potential
								of the underlying technology is immense.
							</p>
							<div className="zuzu-btn-wrap wow fadeInUpX" data-wow-delay=".10s">
								<Link href={"/contact-light"} legacyBehavior>
									<a className="zuzu-btn active gradient text-white">Ask More</a>
								</Link>
							</div>
						</div>
					</div>
					<div className="col-lg-5 offset-lg-1">
						<div className="zuzu--accordion-one accordion-two accordion-six" id="accordionExample2">
							<Accordion defaultActiveKey="0">
								<Accordion.Item eventKey="0">
									<Accordion.Header>What do you know about Blockchain?</Accordion.Header>
									<Accordion.Body>
										The blockchain is a decentralized distributed database of immutable records. The
										technology was discovered with the invention of Bitcoins(the first
										cryptocurrency).
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey="1">
									<Accordion.Header>Why is Blockchain a trusted approach?</Accordion.Header>
									<Accordion.Body>
										The blockchain is a decentralized distributed database of immutable records. The
										technology was discovered with the invention of Bitcoins(the first
										cryptocurrency).
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey="2">
									<Accordion.Header>What are the properties of Blockchain?</Accordion.Header>
									<Accordion.Body>
										The blockchain is a decentralized distributed database of immutable records. The
										technology was discovered with the invention of Bitcoins(the first
										cryptocurrency).
									</Accordion.Body>
								</Accordion.Item>
							</Accordion>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
