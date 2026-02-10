"use client";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

export default function ContactSection({ dark }) {
	return (
		<div className={`"scetion zuzu-section-padding ${dark && "dark-version bg-gray-500"}`}>
			<div className="container">
				<div className="row">
					<div className="col-lg-6">
						<ContactInfo />
					</div>
					<div className="col-lg-6">
						<div className={`zuzu-default-content ${dark && "dark"}`}>
							<h5>
								<strong>Contact Us</strong>
							</h5>
							<h2 className="font-black">Send us a message</h2>
							<p>
								If you have any questions about membership or usage, please fill out the form and our
								team will get back to you within 24 hours.
							</p>
						</div>
						<div className="zuzu-main-filed-wrap">
							<ContactForm />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
