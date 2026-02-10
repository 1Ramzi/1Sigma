"use client";
import Link from "next/link";
import { Accordion } from "react-bootstrap";

export default function SectionSix() {
	return (
		<div className="section bg-gray-500 zuzu-section-padding6 position-relative">
			<div className="container">
				<div className="row">
					<div className="col-lg-7">
						<div className="zuzu-default-content dark font-grotesk m_right">
							<h5>
								<span>Popular questions answered</span>
							</h5>
							<h2>Let us know if you have any questions about Metaverse</h2>
							<p>
								It’s still difficult to pin down a metaverse definition, because it’s not an actual
								technology. The metaverse refers instead to a shift in how we interact with technology.
							</p>
							<div className="zuzu-btn-wrap">
								<Link href={"contact-light"} legacyBehavior>
									<a className="zuzu-btn btn-deep-pink">Ask Questions</a>
								</Link>
							</div>
						</div>
					</div>
					<div className="col-lg-5">
						<div
							className="zuzu--accordion-one accordion-two accordion-six accordion-eight"
							id="accordionExample"
						>
							<Accordion defaultActiveKey="1">
								<Accordion.Item eventKey="0">
									<Accordion.Header>When will the metaverse be released?</Accordion.Header>
									<Accordion.Body>
										Since the metaverse already exists in the highly immersive world of gaming,
										there’s technically no metaverse release date. Among other things, interactive
										entertainment.
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey="1">
									<Accordion.Header>What’s the origin of the metaverse?</Accordion.Header>
									<Accordion.Body>
										Since the metaverse already exists in the highly immersive world of gaming,
										there’s technically no metaverse release date. Among other things, interactive
										entertainment.
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey="2">
									<Accordion.Header>How to access the metaverse VR headset</Accordion.Header>
									<Accordion.Body>
										Since the metaverse already exists in the highly immersive world of gaming,
										there’s technically no metaverse release date. Among other things, interactive
										entertainment.
									</Accordion.Body>
								</Accordion.Item>
							</Accordion>
						</div>
					</div>
				</div>
			</div>
			<div className="zuzu-shape3">
				<img src="/images/shape/shape3.png" alt="" />
			</div>
		</div>
	);
}
