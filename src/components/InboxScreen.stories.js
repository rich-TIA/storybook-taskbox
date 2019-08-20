// As for TaskList, we can't render a pure container (InboxScreen) into SB,
// as SB expects to be passed some context or to be connected to a service.
// We got around this with TaskList by simply rendering PureTaskList instead.
// So do the same with InboxScreen:
import React from "react";
import { storiesOf } from "@storybook/react";

// Stuff to mock a data provider
import { action } from "@storybook/addon-actions";
import { Provider } from "react-redux";

import { defaultTasks } from "./TaskList.stories";

// CURLY BRACES! PureInboxScreen is NOT the default export!
import { PureInboxScreen } from "./InboxScreen";

// Supr simple mock of a redux DS
const store = {
  getState: () => {
    return {
      tasks: defaultTasks
    };
  },
  subscribe: () => 0,
  dispatch: action("dispatch")
};

storiesOf("InboxScreen", module)
  // Without a mocked provider: 'Could not find "store" in the context of "Connect(PureInboxScreen)".'
  // Use addDecorator to inject a mocked store
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add("default", () => <PureInboxScreen />)
  .add("error", () => <PureInboxScreen error="Some error" />);
