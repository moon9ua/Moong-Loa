import { useCallback, useEffect, useState } from "react";
import useInterval from "../../hooks/useInterval";
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

    window.localStorage.setItem(
      "MoongLoa-Todolists",
      JSON.stringify(todolists)
    );
    window.localStorage.setItem(
      "MoongLoa-Todolists-lastUpdate",
      new Date().toJSON()
    );
  }, [todolists]);

  const MS_OF_DAY = 86400000;
  const MS_OF_MIN = 60000;

  const resetProcess = useCallback(() => {
    const weekReset = new Date().getDay() === 3;

    setTodolists(
      todolists.map((todolist) => {
        todolist.todoTimeblocks = todolist.todoTimeblocks.map((timeblock) => {
          if (!timeblock.isWeekly || weekReset) {
            timeblock.todos = timeblock.todos.map((todo) => {
              todo.isCompleted = false;
              return todo;
            });
          }
          return timeblock;
        });
        return todolist;
      })
    );
  }, [todolists]);

  useEffect(() => {
    const lastUpdate = window.localStorage.getItem(
      "MoongLoa-Todolists-lastUpdate"
    );

    if (lastUpdate) {
      const now = new Date();
      const parsedLastUpdate = new Date(Date.parse(lastUpdate));

      // NOTE: 로직 설계
      // 시간 차이가 24시간 이상이면 리셋
      if (now.getTime() - parsedLastUpdate.getTime() >= MS_OF_DAY) {
        resetProcess();
        return;
      }

      // 날짜 차이가 1일이면 -> lu가 1일 전 6시 이전이면 리셋
      if (now.getDate() - parsedLastUpdate.getDate() === 1) {
        if (parsedLastUpdate.getHours() < 6) resetProcess();
        return;
      }

      // 날짜가 같으면 -> lu 6시 이전 && cur 6시 이후면 리셋
      if (
        now.getDate() === parsedLastUpdate.getDate() &&
        parsedLastUpdate.getHours() < 6 &&
        now.getHours() >= 6
      ) {
        resetProcess();
      }
    } else {
      window.localStorage.setItem(
        "MoongLoa-Todolists-lastUpdate",
        new Date().toJSON()
      );
    }
  }, [resetProcess]);

  // NOTE: 현재는 매분마다 시간을 검사한다. 비효율적... 최적화 필요
  // 원래 useEffect 안에 setInterval을 썼는데, 비효율적이라고 해서 다음과 같이 변경
  // 자세한건 공부가 필요하다.
  useInterval(() => {
    const now = new Date();
    if (now.getHours() === 6 && now.getMinutes() === 0) resetProcess();
  }, MS_OF_MIN);

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
