// So many ES6 questions...
// 1. "import from 'name'" vs "import from 'path'" vs
//    "import from '@blah/blah'"
// 2. {...name} syntax?
//    --- [Ans: props expansion ] ---:
//    <Task {...actions}> === <Task onPinTask={actions.onPinTask} onArchiveTask={actions.onArchiveTask}>
// 3. Where does 'module' come from?
// 4. Why the exports?
//    --- [ Ans: bundled actions exported so other components can use them ] ---
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, object } from "@storybook/addon-knobs";
//import { withKnobs, object } from "@storybook/addon-knobs/react";

import Task from "./Task";

// export for external use
const task = {
  id: "1",
  title: "Test Task",
  state: "TASK_INBOX",
  updatedAt: new Date(2018, 0, 1, 9, 0)
};

// Always have to pass these so bundle them up and pass {...actions }
// export for external use
const actions = {
  onPinTask: action("onPinTask"),
  onArchiveTask: action("onArchiveTask")
};

storiesOf("Task", module)
  // knobs...
  .addDecorator(withKnobs)
  // Return component class with set of props in a given state
  // cf React Stateless Functional Component https://reactjs.org/docs/components-and-props.html

  // ...integrate knobs. Note 'task' is now destructed. Pass 'name' for tab name and the object
  // passed will be given to the Knobs tab as JSON
  // NB Note *return* statement here
  .add("default", () => {
    return <Task task={object("task", { ...task })} {...actions} />;
  })
  .add("pinned", () => (
    <Task task={{ ...task, state: "TASK_PINNED" }} {...actions} />
  ))
  .add("archived", () => (
    <Task task={{ ...task, state: "TASK_ARCHIVED" }} {...actions} />
  ));

export { task, actions };
