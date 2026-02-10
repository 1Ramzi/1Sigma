"use client";
import Link from "next/link";

export default function BlogComment() {
	return (
		<div className="zuzu-comment-section">
			<h5>3 comments on this post:</h5>
			<div className="zuzu-comment-wrap">
				<div className="zuzu-comment-item">
					<div className="zuzu-comment-author">
						<img src="/images/all-img/blog/user2.png" alt="" />
					</div>
					<div className="zuzu-comment-author-data">
						<h6>Kathryn Murphy</h6>
						<span>August 26, 2023</span>
						<p>
							It is a long established fact that a reader will be distrac readable content of a page when
							looking at its layout. The point of using is that it has two.
						</p>
					</div>
					<Link href={"#"} legacyBehavior>
						<a className="comment-reply">Reply</a>
					</Link>
				</div>
				<div className="zuzu-comment-item">
					<div className="zuzu-comment-author author2">
						<img src="/images/all-img/blog/user3.png" alt="" />
					</div>
					<div className="zuzu-comment-author-data">
						<h6>Darrell Steward</h6>
						<span>August 26, 2023</span>
						<p>
							It is a long established fact that a reader will be distra readable content of a page when
							looking its layout. The point of using.
						</p>
					</div>
					<Link href={"#"} legacyBehavior>
						<a className="comment-reply">Reply</a>
					</Link>
				</div>
				<div className="zuzu-comment-item">
					<div className="zuzu-comment-author">
						<img src="/images/all-img/blog/user4.png" alt="" />
					</div>
					<div className="zuzu-comment-author-data">
						<h6>Ronald Richards</h6>
						<span>August 26, 2023</span>
						<p>
							It is a long established fact that a reader will be distrac readable content of a page when
							looking at its layout. The point of using is that it has two.
						</p>
					</div>
					<Link href={"#"} legacyBehavior>
						<a className="comment-reply">Reply</a>
					</Link>
				</div>
			</div>
		</div>
	);
}
