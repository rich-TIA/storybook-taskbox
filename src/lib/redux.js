// ES6 again
// 1. That id => (...) syntax again
// 2. I get that taskStateReducer() calls anon func with two return values (deconstructed object?),
//    but not sure how this is done in the return statement in the body of that anon func
// 3. Syntax in reducer('func(...)(...)'): define function with given input param and execute that
//    function at the same time?

// A simple Redux store/actions/reducer implem
// True app would be more complex and separated into different files

import { createStore } from "redux";

// The actions are the 'names' of changes that can happen to the store
const actions = {
  ARCHIVE_TASK: "ARCHIVE_TASK",
  PIN_TASK: "PIN_TASK"
};

// Action creators bundle actions with the data required to execute them
const archiveTask = id => ({ type: actions.ARCHIVE_TASK, id });
const pinTask = id => ({ type: actions.PIN_TASK, id });

// Reducers: All they do is change the state of a single task
function taskStateReducer(taskState) {
  return (state, action) => {
    return {
      ...state,
      tasks: state.tasks.map(task =>
        task.id === action.id ? { ...task, state: taskState } : task
      )
    };
  };
}

// Reducer: describes how contents of store change for each action
const reducer = (state, action) => {
  switch (action.type) {
    case actions.ARCHIVE_TASK:
      return taskStateReducer("TASK_ARCHIVED")(state, action);
    case actions.PIN_TASK:
      return taskStateReducer("TASK_PINNED")(state, action);
    default:
      return state;
  }
};

// Initial state of store - as if loaded from a server
const defaultTasks = [
  { id: "1", title: "Something", state: "TASK_INBOX" },
  { id: "2", title: "Something else", state: "TASK_INBOX" },
  { id: "3", title: "Something more", state: "TASK_INBOX" },
  { id: "4", title: "Something again", state: "TASK_INBOX" }
];

// Done - export the store
export { actions, archiveTask, pinTask, reducer };
export default createStore(reducer, { tasks: defaultTasks });
