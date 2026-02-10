"use client";
import Link from "next/link";
import BlogAuthor from "./BlogAuthor";
import BlogMeta from "./BlogMeta";
import BlogComment from "./BlogComment";
import BlogCommentField from "./BlogCommentField";
import BlogThumb from "./BlogThumb";

export default function SingleBlogDetailsLight() {
	return (
		<div className="zuzu-blog-wrap zuzu-single-blog">
			<BlogThumb />
			<div className="zuzu-blog-content p-0">
				<BlogMeta />
				<h5>
					Popular NFT collective Heap and Gen-Z favorite Diesel have collaborated to launch a brand-new series
					of digital collectibles in the Metaverse.{" "}
				</h5>
				<p>
					Fans of fashion and web3 will find digital treasures that have unique online and offline value. This
					includes access to unique events and community benefits, as well as a limited-edition version of the
					famed 1DR POD crossbody bag from Diesel.
				</p>
				<p>
					According to the founder of the company, Diesel is the appropriate business partner for Hap since we
					share a passion for streetwear and a belief that technology can affect the path of fashion. Diesel
					is a brand with a rich history, but it is also highly progressive and forward-thinking, able to
					adapt to new circumstances. As partners, we concur with this philosophy.
				</p>
				<h5>What is NFT and the metaverse?</h5>
				<p>
					NFTs allow you to own own interoperable digital goods in a virtual metaverse. These NFTs help
					empower your crypto wallet and use cryptocurrencies with metaverse-only digital goods. That includes
					avatar clothing, avatar animations, virtual decorations, and weapons.
				</p>
				<h5>How much is a metaverse NFT worth?</h5>
				<p>
					NFTs serve as representatives of asset ownership within the metaverse. For example, virtual land
					parcels are actually NFTs. The use cases of the metaverse are more likely to expand in the future as
					the technology attains more maturity.
				</p>

				<BlogAuthor />

				<div className="zuzu-blog-post-wrap">
					<Link href={"#"} legacyBehavior>
						<a className="zuzu-blog-post-arrow">
							<img src="/images/svg/arrow-left-black.svg" alt="" />
							Previous post
						</a>
					</Link>
				</div>
				<BlogComment />
				<BlogCommentField />
			</div>
		</div>
	);
}
