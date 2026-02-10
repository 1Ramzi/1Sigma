"use client";
import { useForm } from "react-hook-form";

export default function ContactForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => console.log(data);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="zuzu-main-field">
				<input
					type="text"
					placeholder="Name*"
					{...register("name", { required: true })}
					aria-invalid={errors.name ? "true" : "false"}
				/>
				{errors.name?.type === "required" && (
					<p role="alert" className="error">
						First name is required
					</p>
				)}
			</div>
			<div className="zuzu-main-field">
				<input
					type="email"
					placeholder="Email Address*"
					{...register("email", { required: true })}
					aria-invalid={errors.email ? "true" : "false"}
				/>
				{errors.email?.type === "required" && (
					<p role="alert" className="error">
						Email is required
					</p>
				)}
			</div>

			<div className="zuzu-main-field">
				<textarea placeholder="Write your comment" name="textarea" {...register("comment")} />
			</div>
			<button id="zuzu-comment-submit" type="submit">
				Post Comment
			</button>
		</form>
	);
}
