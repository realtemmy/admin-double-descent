import { useQuery } from "@tanstack/react-query";

const Todos = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {data.map((todo, index) => (
          <li key={todo.id}>{index}: {todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Todos
