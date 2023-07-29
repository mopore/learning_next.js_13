import { prisma } from "@/db";
import Link from "next/link";
import { TodoItem } from "./components/TodoItem";

async function toggleTodoOnServer(id: string, completed: boolean) {
	"use server";
	await prisma.todo.update({ where: { id }, data: { completed } });
	console.log(`Toggling todo with id: ${id} to ${completed}`);
}

export default async function Home() {

	const todos = await prisma.todo.findMany();

	return (
	<>
		<header className="flex justify-between items-center mb-4">
			<h1 className="text-2xl">Todos</h1>
			<Link className="border border-slate-300 text-slate-300 px-2 py-1 rounded
			hover:bg-slate-700 focus-within:bg-slate-700 outline-none" href="/new">
				new
			</Link>
		</header>
		<ul className="pl-4">
			{todos.map(todo => (
				<TodoItem key={todo.id} {...todo} toggleTodo={toggleTodoOnServer} />
			))}
		</ul>	
	</>
	);
}