"use client";
export default function Subscribe() {
	return (
		<>
			<span>Subscribe to our newsletter</span>
			<p>Join our newsletter to get weekly market analysis and trading tips.</p>

			<div className="zuzu-footer-subscribe">
				<input type="email" placeholder="Enter your email" />
				<button type="submit" id="zuzu-footer-subscribe-btn">
					Subscribe
				</button>
			</div>
		</>
	);
}
