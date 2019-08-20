// Test to ensure that pinned tasks really are rendered first in the list - may not be obvious if there
// are no unpinned tasks for example

// ----- [ NB Test is quite brittle ] -----
// Further refinements can easily cause this test to break (eg new features, using TextArea instead of input,
// changing class name, etc). Use visual, snapshot, and visual regression techniques where possible.

import React from "react";
import ReactDOM from "react-dom";
// Update to PureTaskList for Redux - note this is not the default export so wrap in { }
import { PureTaskList } from "./TaskList";
import { withPinnedTasks } from "./TaskList.stories";

it("Renders pinned tasks at the start of the list", () => {
  const div = document.createElement("div");
  const events = { onPinTask: jest.fn(), onArchiveTask: jest.fn() };
  ReactDOM.render(<PureTaskList tasks={withPinnedTasks} {...events} />, div);

  // Look for 'Task 6 (pinned)' at the top of the list
  const lastTaskInput = div.querySelector(
    '.list-item:nth-child(1) input[value="Task 6 (pinned)"]'
  );
  expect(lastTaskInput).not.toBe(null);

  ReactDOM.unmountComponentAtNode(div);
});
