"use client";
import Link from "next/link";
import React, { useState } from "react";

const AdddUser = () => {
	const [state, setState] = useState<any>({
		name: "",
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const addCall = async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/adduser", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(state),
			});
			if (response.ok) {
				console.log("Login successful");
				setState({
					name: "",
					email: "",
					password: "",
				});
			} else {
				console.error("Login failed");
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.error("Error:", error);
		}
	};
	const handleChange = (e: any) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};
	const addUser = (e: any) => {
		e.preventDefault();
		if (Object.entries(state).filter(([key, val]) => val).length) {
			addCall();
		}
	};
	return (
		<div>
			<h2 style={{ margin: 20, marginBottom: 5 }}>Insert user</h2>
			<form
				className="adduser"
				style={{
					display: "flex",
					flexDirection: "column",
					maxWidth: 400,
					gap: 10,
					padding: 10,
				}}
				onSubmit={addUser}
			>
				<input
					type="text"
					placeholder="Enter name"
					style={{ padding: 10 }}
					className="input"
					name="name"
					value={state.name}
					onChange={handleChange}
				/>
				<input
					type="text"
					placeholder="Enter email"
					style={{ padding: 10 }}
					className="input"
					name="email"
					value={state.email}
					onChange={handleChange}
				/>
				<input
					type="password"
					placeholder="Enter password"
					style={{ padding: 10 }}
					className="input"
					name="password"
					value={state.password}
					onChange={handleChange}
				/>
				<button type="submit" style={{ padding: 10 }} disabled={loading}>
					{loading ? "Loading..." : "ADD"}
				</button>
			</form>
			<Link href="/servercomp/users">User Listings</Link>
		</div>
	);
};

export default AdddUser;
