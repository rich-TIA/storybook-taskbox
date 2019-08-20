import React from "react";
import { storiesOf } from "@storybook/react";

// Updated for Redux
// import TaskList from "./TaskList";
// This is not the default export - wrap in { }
// The default export is a call to connect()...
import { PureTaskList } from "./TaskList";
import { task, actions } from "./Task.stories";

const defaultTasks = [
  // Spread operator destructs all the other members of 'Task'
  // (ie. Task.state), but this works without us having to know what other
  // members are there. Without the ... operator, each object would just contain
  // a 'task' sub-object and its members would not be touched
  { ...task, id: "1", title: "Task 1" },
  { ...task, id: "2", title: "Task 2" },
  { ...task, id: "3", title: "Task 3" },
  { ...task, id: "4", title: "Task 4" },
  { ...task, id: "5", title: "Task 5" },
  { ...task, id: "6", title: "Task 6" }
];

const withPinnedTasks = [
  // Spread operator: slice returns the first 5 objects in the defaultTasks array,
  // which are then wrapped in the withPinnedTasks array. Without the ... operator,
  // This would return another array, ie. a nested one
  ...defaultTasks.slice(0, 5),
  { id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" }
];

// Update for Redux: Replace TaskList with PureTaskList
storiesOf("TaskList", module)
  // Add some context 'padding' around each Task to make it easier to visually verify
  // Can be used to add arbitrary wrappers, and wrap stories in 'providers', ie. library
  // components that set React context
  .addDecorator(story => <div style={{ padding: "3rem" }}>{story()}</div>)
  .add("default", () => <PureTaskList tasks={defaultTasks} {...actions} />)
  .add("withPinnedTasks", () => (
    <PureTaskList tasks={withPinnedTasks} {...actions} />
  ))
  .add("loading", () => <PureTaskList loading tasks={[]} {...actions} />)
  .add("empty", () => <PureTaskList empty tasks={[]} {...actions} />);

export { defaultTasks, withPinnedTasks };
