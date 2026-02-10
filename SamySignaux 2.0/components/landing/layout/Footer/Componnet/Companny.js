"use client";
import Link from "next/link";

export default function Companny() {
	return (
		<>
			<span>Company</span>
			<ul>
				<li>
					<Link href={"#"}> Home </Link>
				</li>
				<li>
					<Link href={"#"}> About </Link>
				</li>
				<li>
					<Link href={"#"}> Careers </Link>
				</li>
				<li>
					<Link href={"blog-dark"}> Blog </Link>
				</li>
				<li>
					<Link href={"blog-link"}> Blog post </Link>
				</li>
			</ul>
		</>
	);
}
