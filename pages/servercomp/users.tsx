import Link from "next/link";
import clientPromise from "../../lib/mongodb";
import { GetServerSideProps } from "next";

interface User {
	_id: string;
	id: number;
	username: string;
	email: string;
	firstname: string;
	lastname: string;
	gender: string;
	friends: string;
	token: string | null;
	otp: string | number | null;
	otp_expiry: string | null;
	created_at: string;
	updated_at: string;
	active: number;
	bearer: string;
}

interface UsersProps {
	users: User[];
}

const Users: React.FC<UsersProps> = ({ users }) => {
	return (
		<div>
			<Link href="/clientcomp/AddUser">ADD USER</Link>
			<h1>Users List from server side components</h1>
			<p>
				<small>My Users list</small>
			</p>
			<ul>
				{users.map((user: User) => (
					<li key={user._id}>
						<h2>{user.email}</h2>
						<h3>{user.firstname}</h3>
						<p>{user.created_at}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Users;

export const getServerSideProps: GetServerSideProps = async () => {
	try {
		const client = await clientPromise;
		const db = client.db("tracktrack");
		const movies = await db
			.collection("users")
			.find({})
			.sort({ metacritic: -1 })
			.limit(20)
			.toArray();
		return {
			props: { users: JSON.parse(JSON.stringify(movies)) },
		};
	} catch (e) {
		console.error(e);
		return { props: { users: [] } };
	}
};
