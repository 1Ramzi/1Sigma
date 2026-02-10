"use client";
export default function SidebarSubscriber() {
	return (
		<div className="zuzu-blog-sidebar-item">
			<div className="zuzu-sidebar-item-title">
				<h6>Subscribe</h6>
			</div>
			<p>Subscribe to our newsletter and get the latest news updates lifetime</p>
			<form action="#">
				<div className="zuzu-blog-subscription">
					<input type="email" placeholder="Enter your email address" />
					<button id="zuzu-buynow-btn" type="submit">
						Buy Now
					</button>
				</div>
			</form>
		</div>
	);
}
