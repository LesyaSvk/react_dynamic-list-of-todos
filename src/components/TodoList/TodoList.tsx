import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal';

type Props = {
  todos: Todo[],
  selectedTodoId: number | null,
  selectToDo: (id: number) => void,
  clear: () => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  selectToDo,
  clear,
}) => {
  return (
    <>
      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {todos.map(todo => {
            const { id, title, completed } = todo;

            return (
              <tr
                data-cy="todo"
                key={id}
                className={classNames({
                  'has-background-info-light': selectedTodoId === id,
                })}
              >
                <td className="is-vcentered">{id}</td>
                <td className="is-vcentered">
                  {completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames({
                      'has-text-danger': !completed,
                      'has-text-success': completed,
                    })}
                  >
                    {title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  {selectedTodoId === id ? (
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => {
                        selectToDo(0);
                      }}
                    >
                      <span className="icon">
                        <i className="far fa-eye-slash" />
                      </span>
                    </button>
                  ) : (
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => {
                        selectToDo(id);
                      }}
                    >
                      <span className="icon">
                        <i className="far fa-eye" />
                      </span>
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {selectedTodoId !== 0 && (
        <TodoModal
          todos={todos}
          selectedTodoId={selectedTodoId}
          clear={clear}
        />
      )}
    </>
  );
};
