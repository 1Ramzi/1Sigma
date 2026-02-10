"use client";
import Link from "next/link";

export default function BlogMeta() {
	return (
		<div className="zuzu-blog-meta">
			<ul>
				<li>
					<Link href={"/blog-light-details"}>
						<img src="/images/svg/user-circle.svg" alt="" />
						By Smith Jones
					</Link>
				</li>
				<li>
					<img src="/images/svg/comment.svg" alt="" />
					03 Comments
				</li>
			</ul>
		</div>
	);
}
