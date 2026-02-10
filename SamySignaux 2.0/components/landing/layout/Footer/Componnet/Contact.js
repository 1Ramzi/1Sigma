"use client";
import Link from "next/link";

export default function Contact() {
	return (
		<>
			<span>Contact</span>
			<ul>
				<li>
					<Link href={"tel:123"}>+088-234-6534</Link>
				</li>
				<li>
					<Link href={"mailto:name@email.com"}>example@gmail.com</Link>
				</li>
			</ul>
		</>
	);
}
