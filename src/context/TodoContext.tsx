"use client";

import { useContext, createContext, useMemo, useEffect, useState, PropsWithChildren } from "react";
import type { ITodoItems, TItemsTodo } from "./TodoContext.type";

export const Context = createContext<ITodoItems | null>(null);

export function useTodoContext() {
  const todoCtx = useContext(Context);
  if (todoCtx === null) {
    throw new Error("Todo context can't be null !");
  }
  return todoCtx;
}

export function TodoContext({ children }: PropsWithChildren) {
  const [itemsTodo, setItemsTodo] = useState<TItemsTodo[]>(() => {
    if (typeof window !== "undefined") {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("todos", JSON.stringify(itemsTodo));
    }
  }, [itemsTodo]);

  const DeleteTodos = (id: string) => {
    setItemsTodo((prevTodos) => prevTodos.filter((todoItem) => todoItem.id !== id));
  };

  const AddTodos = (newTodo: TItemsTodo) => {
    setItemsTodo((prevTodos) => [...prevTodos, newTodo]);
  };

  const UpdaterTodos = (id: string) => {
    setItemsTodo((prevTodos) => {
      return prevTodos.map((todoItem) =>
        todoItem.id === id ? { ...todoItem, completed: true } : todoItem
      );
    });
  };

  const EditTodos = (id: string, title: string, author: string) => {
    setItemsTodo((prevTodos) => {
      return prevTodos.map((todoItem) =>
        todoItem.id === id ? { ...todoItem, title, author } : todoItem
      );
    });
  };

  const doneTodosData = itemsTodo.filter((todoItem) => todoItem.completed === true);
  const notDoneTodosData = itemsTodo.filter((todoItem) => todoItem.completed === false);

  const value = useMemo(
    () => ({
      itemsTodo,
      DeleteTodos,
      AddTodos,
      UpdaterTodos,
      doneTodosData,
      notDoneTodosData,
      EditTodos
    }),
    [itemsTodo]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default TodoContext;
