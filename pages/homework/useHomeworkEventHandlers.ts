import { useEffect, useState } from "react";
import {
  ITodolist,
  NewTodo,
  NewTodolist,
  NewTodoTimeblock,
} from "./interfaces";

export default function useHomeworkEventHandlers() {
  const [todolists, setTodolists] = useState<ITodolist[]>([]);

  useEffect(() => {
    const savedTodolists = window.localStorage.getItem("MoongLoa-Todolists");

    if (savedTodolists) {
      setTodolists(JSON.parse(savedTodolists));
    } else {
      window.localStorage.setItem("MoongLoa-Todolists", JSON.stringify([]));
    }
  }, []);
  useEffect(() => {
    // NOTE: localStorage 저장
    // if (!todolists) return; // NOTE: 괜찮나? null인 경우로 처리해주지 않아도?

    window.localStorage.setItem(
      "MoongLoa-Todolists",
      JSON.stringify(todolists)
    );
  }, [todolists]);

  /*
   * ANCHOR: Event Handlers
   */
  const addTodolist = (title: string) => {
    setTodolists((prev) => [...prev, NewTodolist(title)]);
  };
  const deleteTodolist = (todolistId: number) => {
    setTodolists((prev) =>
      prev.filter((todolist) => todolist.id !== todolistId)
    );
  };
  const editTodolistTitle = (todolistId: number, todolistTitle: string) => {
    setTodolists((prev) =>
      prev.map((todolist) => {
        return todolist.id === todolistId
          ? { ...todolist, title: todolistTitle }
          : todolist;
      })
    );
  };

  const todolistWrapper = () => {};

  const addTodoTimeblock = (
    todolistId: number,
    title: string,
    isWeekly: boolean
  ) => {
    setTodolists((prev) =>
      prev.map((todolist) => {
        return todolist.id === todolistId
          ? {
              ...todolist,
              todoTimeblocks: [
                ...todolist.todoTimeblocks,
                NewTodoTimeblock(title, isWeekly),
              ],
            }
          : todolist;
      })
    );
  };
  const deleteTodoTimeblock = (todolistId: number, todoTimeblockId: number) => {
    setTodolists((prev) =>
      prev.map((todolist) => {
        return todolist.id === todolistId
          ? {
              ...todolist,
              todoTimeblocks: todolist.todoTimeblocks.filter(
                (timeblock) => timeblock.id !== todoTimeblockId
              ),
            }
          : todolist;
      })
    );
  };
  const editTodoTimeblockTitle = (
    todolistId: number,
    todoTimeblockId: number,
    title: string
  ) => {
    setTodolists((prev) =>
      prev.map((todolist) => {
        return todolist.id === todolistId
          ? {
              ...todolist,
              todoTimeblocks: todolist.todoTimeblocks.map((timeblock) => {
                return timeblock.id === todoTimeblockId
                  ? { ...timeblock, title }
                  : timeblock;
              }),
            }
          : todolist;
      })
    );
  };

  const addTodo = (
    todolistId: number,
    todoTimeblockId: number,
    content: string
  ) => {
    setTodolists((prev) =>
      prev.map((todolist) => {
        return todolist.id === todolistId
          ? {
              ...todolist,
              todoTimeblocks: todolist.todoTimeblocks.map((timeblock) => {
                return timeblock.id === todoTimeblockId
                  ? {
                      ...timeblock,
                      todos: [...timeblock.todos, NewTodo(content)],
                    }
                  : timeblock;
              }),
            }
          : todolist;
      })
    );
  };
  const deleteTodo = (
    todolistId: number,
    todoTimeblockId: number,
    todoId: number
  ) => {
    setTodolists((prev) =>
      prev.map((todolist) => {
        return todolist.id === todolistId
          ? {
              ...todolist,
              todoTimeblocks: todolist.todoTimeblocks.map((timeblock) => {
                return timeblock.id === todoTimeblockId
                  ? {
                      ...timeblock,
                      todos: timeblock.todos.filter(
                        (todo) => todo.id !== todoId
                      ),
                    }
                  : timeblock;
              }),
            }
          : todolist;
      })
    );
  };
  const editTodoContent = (
    todolistId: number,
    todoTimeblockId: number,
    todoId: number,
    content: string
  ) => {
    setTodolists((prev) =>
      prev.map((todolist) => {
        return todolist.id === todolistId
          ? {
              ...todolist,
              todoTimeblocks: todolist.todoTimeblocks.map((timeblock) => {
                return timeblock.id === todoTimeblockId
                  ? {
                      ...timeblock,
                      todos: timeblock.todos.map((todo) => {
                        return todo.id === todoId ? { ...todo, content } : todo;
                      }),
                    }
                  : timeblock;
              }),
            }
          : todolist;
      })
    );
  };
  const toggleTodoComplete = (
    todolistId: number,
    todoTimeblockId: number,
    todoId: number
  ) => {
    setTodolists((prev) =>
      prev.map((todolist) => {
        return todolist.id === todolistId
          ? {
              ...todolist,
              todoTimeblocks: todolist.todoTimeblocks.map((timeblock) => {
                return timeblock.id === todoTimeblockId
                  ? {
                      ...timeblock,
                      todos: timeblock.todos.map((todo) => {
                        return todo.id === todoId
                          ? { ...todo, isCompleted: !todo.isCompleted }
                          : todo;
                      }),
                    }
                  : timeblock;
              }),
            }
          : todolist;
      })
    );
  };

  return {
    todolists,
    eventHandlers: {
      addTodolist,
      deleteTodolist,
      editTodolistTitle,
      addTodoTimeblock,
      deleteTodoTimeblock,
      editTodoTimeblockTitle,
      addTodo,
      deleteTodo,
      editTodoContent,
      toggleTodoComplete,
    },
  };
}
