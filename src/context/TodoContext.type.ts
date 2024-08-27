type TItemsTodo = {
  id: string;
  completed: boolean;
  date: string;
  title: string;
  author: string;
};

interface ITodoItems {
  notDoneTodosData: TItemsTodo[] | undefined;
  doneTodosData: TItemsTodo[] | undefined;
  itemsTodo: TItemsTodo[];
  AddTodos: (newTodo: TItemsTodo) => void;
  DeleteTodos: (id: string) => void;
  UpdaterTodos: (id: string) => void;
  EditTodos: (id: string, title: string, author: string) => void;
}

export type { ITodoItems, TItemsTodo };
