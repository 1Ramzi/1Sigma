"use client";
import Link from "next/link";

export default function SingleBlog({ singleBlog }) {
	return (
		<div className="zuzu-blog-wrap">
			<div className="zuzu-blog-thumb">
				<Link href={"/single-light-blog"}>
					<img src={`/images/all-img/blog/${singleBlog.img}.png`} alt="" />
				</Link>
				<div className="zuzu-blog-category">
					<Link href={"/single-light-blog"} legacyBehavior>
						<a className="zuzu-btn btn-white rounded-pill">{singleBlog.category}</a>
					</Link>
				</div>
			</div>
			<div className="zuzu-blog-content">
				<div className="zuzu-blog-meta">
					<ul>
						<li>
							<Link href={"/single-light-blog"}>
								<img src="/images/svg/user-circle.svg" alt="" />
								{singleBlog.author}
							</Link>
						</li>
						<li>
							<img src="/images/svg/comment.svg" alt="" />
						</li>
					</ul>
				</div>
				<Link href={"/single-light-blog"}>
					<h3>{singleBlog.title}</h3>
				</Link>
				<p>{singleBlog.content}</p>
				<Link href={"/single-light-blog"} legacyBehavior>
					<a className="zuzu-btn btn-deep-blue rounded-pill">Read More</a>
				</Link>
			</div>
		</div>
	);
}
