"use client";
import Link from "next/link";

export default function Community() {
	return (
		<div className="zuzu-footer-menu">
			<span>Community</span>
			<ul>
				<li>
					<Link href={"#"}> Create A Store</Link>
				</li>
				<li>
					<Link href={"#"}>Start Selling</Link>
				</li>
				<li>
					<Link href={"#"}>My Account</Link>
				</li>
				<li>
					<Link href={"#"}>Job</Link>
				</li>
				<li>
					<Link href={"#"}>List a Item</Link>
				</li>
			</ul>
		</div>
	);
}
