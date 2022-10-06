import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const validationSchema = yup.object({
	username: yup
		.string()
		.min(3, "Must be 3 characters or more")
		.max(15, "Must be 15 characters or less")
		.required("Required field"),
	email: yup
		.string()
		.email("Invalid email address")
		.required("Required Field"),
	password: yup
		.string()
		.min(6, "Must be 6 characters or more")
		.max(15, "Must be 15 characters or less")
		.required("Required field"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Register = () => {
	const router = useRouter();

	const [error, setError] = useState("");

	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values, { resetForm }) => {
			registerUser({
				username: values.username,
				email: values.email,
				password: values.password,
			});
			resetForm();
		},
	});

	const registerUser = async (data) => {
		try {
			const user = await axios.post(
				"http://localhost:3000/api/user/register",
				data
			);

			toast.success("Registration successfully completed!");
			router.push("/login");
		} catch (error) {
			console.log(error);
			setError("Something went wrong, try agian please!");
		}
	};

	return (
		<div className="register">
			<div className="Form_Box">
				<div className="Image">
					<Image
						src="/images/formik-img.jpg"
						alt="Image"
						layout="fill"
						objectFit="cover"
					/>
				</div>
				<div className="Form_Content">
					<h1> Register</h1>
					<form onSubmit={formik.handleSubmit}>
						<div className="Form_Input">
							<input
								placeholder="Username"
								id="username"
								name="username"
								type="text"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.username}
							/>
							<label htmlFor="username">Username</label>

							{formik.touched.username &&
							formik.errors.username ? (
								<p className="Error">
									{formik.errors.username}
								</p>
							) : null}
						</div>

						<div className="Form_Input">
							<input
								placeholder="Email"
								id="email"
								name="email"
								type="email"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.email}
							/>
							<label htmlFor="email">Email</label>
							{formik.touched.email && formik.errors.email ? (
								<p className="Error">{formik.errors.email}</p>
							) : null}
						</div>

						<div className="Form_Input">
							<input
								placeholder="Password"
								id="password"
								name="password"
								type="password"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.password}
							/>
							<label htmlFor="password">Password</label>
							{formik.touched.password &&
							formik.errors.password ? (
								<p className="Error">
									{formik.errors.password}
								</p>
							) : null}{" "}
						</div>

						<div className="Form_Input">
							<input
								placeholder="Confirm Password"
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.confirmPassword}
							/>
							<label htmlFor="confirmPassword">
								Confirm Password
							</label>
							{formik.touched.confirmPassword &&
							formik.errors.confirmPassword ? (
								<p className="Error">
									{formik.errors.confirmPassword}
								</p>
							) : null}
						</div>

						<button type="submit">Register</button>

						{error && <p className="Api_Error">{error}</p>}
						<span className="link">
							Already have account,{" "}
							<Link href="/login">
								<a>go to Login page!</a>
							</Link>
						</span>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
