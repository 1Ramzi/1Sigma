"use client";
import Link from "next/link";

export default function FooterMenu() {
	return (
		<ul>
			<li>
				<Link href={"#"}> Terms</Link>
			</li>
			<li>
				<Link href={"#"}> Privacy Policy</Link>
			</li>
		</ul>
	);
}
