"use client";
import Link from "next/link";

export default function SocialIcon() {
	return (
		<div className="zuzu-social-icon">
			<ul>
				<li>
					<Link href={"#"}>
						<img src="/images/social/twitter.svg" alt="" />
					</Link>
				</li>
				<li>
					<Link href={"#"}>
						<img src="/images/social/linkedin.svg" alt="" />
					</Link>
				</li>
				<li>
					<Link href={"#"}>
						<img src="/images/social/icon.svg" alt="" />
					</Link>
				</li>
				<li>
					<Link href={"#"}>
						<img src="/images/social/github.svg" alt="" />
					</Link>
				</li>
				<li>
					<Link href={"#"}>
						<img src="/images/social/plne.svg" alt="" />
					</Link>
				</li>
			</ul>
		</div>
	);
}
