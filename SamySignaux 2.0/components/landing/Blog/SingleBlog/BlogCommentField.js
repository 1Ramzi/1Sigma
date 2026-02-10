"use client";
export default function BlogCommentField() {
	return (
		<div className="zuzu-comment-field-section zuzu-main-filed-wrap">
			<h5>Leave a comment</h5>
			<form action="#">
				<div className="row">
					<div className="col-md-6">
						<div className="zuzu-main-field">
							<input type="text" placeholder="Name*" />
						</div>
					</div>
					<div className="col-md-6">
						<div className="zuzu-main-field">
							<input type="email" placeholder="Email Address*" />
						</div>
					</div>
				</div>
				<div className="zuzu-main-field">
					<input type="url" placeholder="Your website" />
				</div>
				<div className="zuzu-main-field">
					<textarea name="textarea" placeholder="Write your comment" />
				</div>
				<button id="zuzu-comment-submit">Post Comment</button>
			</form>
		</div>
	);
}
