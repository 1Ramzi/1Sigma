"use client";
import Link from "next/link";

export default function BlogThumb() {
	return (
		<div className="zuzu-blog-thumb">
			<img src="/images/all-img/blog/blog1.png" alt="" />
			<div className="zuzu-blog-category">
				<Link href={"/blog-light-details"} legacyBehavior>
					<a className="zuzu-btn btn-white rounded-pill">Business</a>
				</Link>
			</div>
		</div>
	);
}
