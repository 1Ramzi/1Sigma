"use client";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

export default function SectionFour() {
	return (
		<div className="section bg-gray-500 zuzu-section-padding2">
			<div className="container">
				<div className="row">
					<div className="col-lg-6 order-lg-2">
						<div className="zuzu-thumb wow fadeInUpX" data-wow-delay="0.2s">
							<img src="/images/all-img/v5/thumb2.png" alt="" />
						</div>
					</div>
					<div className="col-lg-6 d-flex align-items-center">
						<div className="zuzu-default-content dark font-grotesk">
							<h5>
								<span>Can you use the metaverse now?</span>
							</h5>
							<h2>Metaverse is currently a revolutionary network</h2>
							<div className="zuzu-tab">
								<Tabs defaultActiveKey="explore" id="uncontrolled-tab-example">
									<Tab eventKey="explore" title="Explore">
										The metaverse is an open, shared and persistent virtual world with multiple
										digital spaces that allow users to avail various to services and experiences.
										Users can enter the metaverse the form of digital avatars complemented with
										VR/AR.
									</Tab>
									<Tab eventKey="create" title="Create">
										The metaverse is an open, shared and persistent virtual world with multiple
										digital spaces that allow users to avail various to services and experiences.
									</Tab>
									<Tab eventKey="trade" title="Trade">
										The metaverse is an open, shared and persistent virtual world with multiple
										digital spaces that allow users to avail various to services and experiences.
										Users can enter the metaverse the form of digital avatars complemented with
										VR/AR.
									</Tab>
								</Tabs>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
