"use client";
import Link from "next/link";

export default function MarketPlace() {
	return (
		<div className="zuzu-footer-menu zuzu-footer-margin">
			<span>Marketplace</span>
			<ul>
				<li>
					<Link href={"#"}> Art</Link>
				</li>
				<li>
					<Link href={"#"}>Digital Art</Link>
				</li>
				<li>
					<Link href={"#"}>Photography</Link>
				</li>
				<li>
					<Link href={"#"}>Games</Link>
				</li>
				<li>
					<Link href={"#"}>Music</Link>
				</li>
			</ul>
		</div>
	);
}
