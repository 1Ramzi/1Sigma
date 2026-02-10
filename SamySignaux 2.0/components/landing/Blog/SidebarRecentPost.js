"use client";
import Link from "next/link";

export default function SidebarRecentPost() {
	return (
		<div className="zuzu-blog-sidebar-item">
			<div className="zuzu-sidebar-item-title">
				<h6>Recent Posts</h6>
			</div>
			<div className="zuzu-recent-post-item">
				<div className="zuzu-recent-post-thumb">
					<Link href={"/single-light-blog"}>
						<img src="/images/all-img/blog/recent-post1.png" alt="" />
					</Link>
				</div>
				<div className="zuzu-blog-category">
					<Link href={"/single-light-blog"} legacyBehavior>
						<a className="zuzu-btn btn-white rounded-pill">Business</a>
					</Link>
				</div>
				<div className="zuzu-blog-meta">
					<ul>
						<li>
							<img src="/images/svg/calendar.svg" alt="" />
							October 20, 2023
						</li>
					</ul>
				</div>
				<h6>
					<Link href={"#"}>
						Blockchain and government will they have live happily ever after trade crypto world?
					</Link>
				</h6>
			</div>
			<div className="zuzu-recent-post-item">
				<div className="zuzu-recent-post-thumb">
					<Link href={"/single-light-blog"}>
						<img src="/images/all-img/blog/recent-post2.png" alt="" />
					</Link>
				</div>
				<div className="zuzu-blog-category">
					<Link href={"/single-light-blog"}>Digital</Link>
				</div>
				<div className="zuzu-blog-meta">
					<ul>
						<li>
							<img src="/images/svg/calendar.svg" alt="" />
							October 18, 2023
						</li>
					</ul>
				</div>
				<h6>
					<Link href={"#"}>
						This season, syndicators and crowd funders are offering digital gifts to top participants
					</Link>
				</h6>
			</div>
			<div className="zuzu-recent-post-item">
				<div className="zuzu-recent-post-thumb">
					<Link href={"/single-light-blog"}>
						<img src="/images/all-img/blog/recent-post3.png" alt="" />
					</Link>
				</div>
				<div className="zuzu-blog-category">
					<Link href={"/single-light-blog"}>Artical</Link>
				</div>
				<div className="zuzu-blog-meta">
					<ul>
						<li>
							<img src="/images/svg/calendar.svg" alt="" />
							October 09, 2023
						</li>
					</ul>
				</div>
				<h6>
					<Link href={"#"}> Worlds beta, a 3D space for name holders, launched by decentraland for NFT </Link>
				</h6>
			</div>
		</div>
	);
}
