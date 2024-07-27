import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "../contacts";

export async function loader({ params }) {
	const contacts = await getContact(params.contactId);
	return { contacts };
}
export default function Contact() {
	const { contacts} = useLoaderData()
	// || {
	// 	first: "Your",
	// 	last: "Name",
	// 	avatar: "https://robohash.org/you.png?size=200x200",
	// 	twitter: "your_handle",
	// 	notes: "Some Notes",
	// 	favorite: true,
	// };
	// const data = useLoaderData();
	// const contact = data?.contact || {
	// 	first: "Your",
	// 	last: "Name",
	// 	avatar: "https://robohash.org/you.png?size=200x200",
	// 	twitter: "your_handle",
	// 	notes: "Some Notes",
	// 	favorite: true,
	// };

	const contact = {
		first: "Your",
		last: "Name",
		avatar: "https://robohash.org/you.png?size=200x200",
		twitter: "your_handle",
		notes: "Some Notes",
		favorite: true,
	};
	return (
		<>
			<div id="contact">
				<div>
					<img
						key={contacts.avatar}
						src={
							contacts.avatar ||
							`https://robohash.org/${contact.id}.png?size=200x200`
						}
					/>
				</div>

				<div>
					<h1>
						{contacts.first || contacts.last ? (
							<>
								{contacts.first} {contacts.last}
							</>
						) : (
							<i> No Name</i>
						)}{" "}
						<Favorite contact={contacts} />
					</h1>

					{contacts.twitter && (
						<p>
							<a
								target="_blank"
								href={`https://twitter.com/${contacts.twitter}`}>
								{contacts.twitter}
							</a>
						</p>
					)}

					{contacts.notes && <p> {contacts.notes}</p>}

					<div>
						<Form action="edit">
							<button type="submit">Edit</button>
						</Form>
						<Form
							method="post"
							action="destroy"
							onSubmit={(event) => {
								if (
									!confirm("Please confirm you want to delete this record.")
								) {
									event.preventDefault();
								}
							}}>
							<button type="submit">Delete</button>
						</Form>
					</div>
				</div>
			</div>
		</>
	);
}

function Favorite({ contact }) {
	const favorite = contact.favorite;
	return (
		<Form method="post">
			<button
				name="favorite"
				value={favorite ? "false" : "true"}
				aria-label={favorite ? "Remove from favorites" : "Add to favorites"}>
				{favorite ? "★" : "☆"}
			</button>
		</Form>
	);
}
