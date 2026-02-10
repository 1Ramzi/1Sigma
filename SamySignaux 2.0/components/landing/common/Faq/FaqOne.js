"use client";
import { Accordion } from "react-bootstrap";
export default function FaqOne({ dark }) {
	return (
		<div className={`section zuzu-section-padding2 ${dark && "bg-gray-500"}`}>
			<div className="container">
				<div className="zuzu-section-title">
					<div className={`zuzu-default-content large ${dark && "dark"}`}>
						<h2>Frequently asked questions about NFTs</h2>
					</div>
				</div>
				<div
					className={`zuzu--accordion-one accordion-three ${!dark && "zuzu-faq-light"}`}
					id="accordionExample3"
				>
					<div className="row">
						<div className="col-lg-6">
							<Accordion defaultActiveKey="0">
								<Accordion.Item eventKey="0">
									<Accordion.Header>Q. What is cryptocurrency in general?</Accordion.Header>
									<Accordion.Body>
										NFTs are individual tokens with valuable information stored in them. Because
										they hold a value primarily set by the market and demand.
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey="1">
									<Accordion.Header>
										Q. What other types of cryptocurrency are out there?
									</Accordion.Header>
									<Accordion.Body>
										NFTs are individual tokens with valuable information stored in them. Because
										they hold a value primarily set by the market and demand.
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey="2">
									<Accordion.Header>Q. What’s the connection between NFTs & crypto?</Accordion.Header>
									<Accordion.Body>
										NFTs are individual tokens with valuable information stored in them. Because
										they hold a value primarily set by the market and demand.
									</Accordion.Body>
								</Accordion.Item>
							</Accordion>
						</div>
						<div className="col-lg-6">
							<Accordion defaultActiveKey="1">
								<Accordion.Item eventKey="0">
									<Accordion.Header>Q. How safe is cryptocurrency?</Accordion.Header>
									<Accordion.Body>
										NFTs are individual tokens with valuable information stored in them. Because
										they hold a value primarily set by the market and demand.
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey="1">
									<Accordion.Header>
										Q. What regulation and requirements govern bitcoin?
									</Accordion.Header>
									<Accordion.Body>
										NFTs are individual tokens with valuable information stored in them. Because
										they hold a value primarily set by the market and demand.
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey="2">
									<Accordion.Header>
										Q. What is the biggest problem with cryptocurrency?
									</Accordion.Header>
									<Accordion.Body>
										NFTs are individual tokens with valuable information stored in them. Because
										they hold a value primarily set by the market and demand.
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
