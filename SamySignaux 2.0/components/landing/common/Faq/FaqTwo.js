"use client";
import { Accordion } from "react-bootstrap";

export default function FaqTwo() {
	return (
		<div className="section bg-warning-50 zuzu-section-padding2">
			<div className="container">
				<div className="zuzu-section-title large">
					<h5>Frequently asked questions</h5>
					<h2 className="font-black">Do you have any questions about our platform? Just ask us</h2>
				</div>
				<div className="zuzu--accordion-one zuzu--accordion-two" id="accordionExample">
					<Accordion defaultActiveKey="1">
						<Accordion.Item eventKey="0">
							<Accordion.Header>What is an NFT?</Accordion.Header>
							<Accordion.Body>
								NFT means non-fungible tokens (NFTs), which are generally created using the same type of
								programming used for cryptocurrencies. In simple terms these cryptographic assets are
								based on blockchain technology.
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="1">
							<Accordion.Header>What makes an NFT valuable?</Accordion.Header>
							<Accordion.Body>
								NFT means non-fungible tokens (NFTs), which are generally created using the same type of
								programming used for cryptocurrencies. In simple terms these cryptographic assets are
								based on blockchain technology.
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="2">
							<Accordion.Header>Where will I be able to see my NFT's?</Accordion.Header>
							<Accordion.Body>
								NFT means non-fungible tokens (NFTs), which are generally created using the same type of
								programming used for cryptocurrencies. In simple terms these cryptographic assets are
								based on blockchain technology.
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="3">
							<Accordion.Header>What is the connection between NFT and Crypto?</Accordion.Header>
							<Accordion.Body>
								NFT means non-fungible tokens (NFTs), which are generally created using the same type of
								programming used for cryptocurrencies. In simple terms these cryptographic assets are
								based on blockchain technology.
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="4">
							<Accordion.Header>Are NFTs the future of art and collectibles?</Accordion.Header>
							<Accordion.Body>
								NFT means non-fungible tokens (NFTs), which are generally created using the same type of
								programming used for cryptocurrencies. In simple terms these cryptographic assets are
								based on blockchain technology.
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</div>
			</div>
		</div>
	);
}
