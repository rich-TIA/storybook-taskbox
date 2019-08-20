// Updated to use redux for data
// ----- [ Rationale ] ------------------------------------------
//   TaskList.js is now just a container and doesn't handle props
//   - instead it connects to the Redux store and sets props on
//   the PureTaskList component it wraps.
//
//   Alternative is to leave TaskList alone, and let props be passed
//   down the hierarchy - leaving the store connection to the higher
//   level component.
//
//   But this will break SB, in that we still want to both
//   (a) expose the contained component as an independent story
//       and
//   (b) let the contained component access the data store.
//
//   Potentially a design antipattern purely to enable SB?
// --------------------------------------------------------------

import React from "react";
import PropTypes from "prop-types";

import Task from "./Task";
import { connect } from "react-redux";
import { archiveTask, pinTask } from "../lib/redux";

// Four states:
// List of tasks
// List of tasks including pinned tasks (at the top)
// Loading frame
// Empty list
// ----- [ NB ] -----
//   We don't handle 'empty' with a separate prop, although this is passed.
//   'loading' and 'empty' both have an empty task list, but we check 'loading'
//   in the first case and 'empty' in the second
// ------------------
// Renamed to PureTaskList for redux - NB this is no longer the default but must
// still be exported
const PureTaskList = function({ loading, tasks, onPinTask, onArchiveTask }) {
  // NB event names have to match props passed in. These are in turn passed as
  // props into Task, and are defined by calls to action(). So if the name is
  // undefined this will throw an error. And 'event' is destructed when passed
  const events = {
    onPinTask,
    onArchiveTask
  };

  // LOADING Create special component with different class wrapper to handle loading state
  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>some</span> <span>state</span>
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className="list-items">
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  // EMPTY No need for separate named component as there's only one
  // Also note that in this case we pass an 'empty' prop; this is ignored
  if (tasks.length === 0) {
    return (
      <div className="list-items">
        <div className="wrapper-message">
          <span className="icon-check" />
          <div className="title-message">There are no tasks</div>
          <div className="subtitle-message">Now, fuck off.</div>
        </div>
      </div>
    );
  }

  // PINNED Reorder tasks pinned first
  // ----- [ Spread operator ] ----------------------------------
  //   What this code does
  //    - Take the tasks array
  //    - for each item in the array, apply the filter function
  //    - Return *the item* if it passes the test
  //   tasksInOrder then contains a new set of items accordingly
  //
  //   Without the spread operator, this happens:
  //    - Take the tasks array
  //    - for each item in the array, apply the filter function
  //    - Return *an array* of *all the items* that pass the test
  //   tasksInOrder then contains two sub-arrays of tasks
  // ------------------------------------------------------------
  const tasksInOrder = [
    ...tasks.filter(t => t.state === "TASK_PINNED"),
    ...tasks.filter(t => t.state !== "TASK_PINNED")
  ];

  // DEFAULT and PINNED - tasksInOrder works for both
  return (
    <div className="list-items">
      {tasksInOrder.map(task => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
};

PureTaskList.propTypes = {
  loading: PropTypes.bool,
  tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  onPinTask: PropTypes.func.isRequired,
  onArchiveTask: PropTypes.func.isRequired
};

PureTaskList.defaultProps = {
  loading: false
};

// Replace this with Redux code
// export default TaskList;

// ----- [ React Redux connect() ] -----------------------------------------
// This is the ES6 equivalent of ES5 simultaneous declaration and invocation
// of a function; ie. connect(...)(tasks)
//
//   In this case only two parameters:
//
// * mapStateToProps
//   (set to anonymous arrow func with { tasks } set as the state param - as
//   there's only one param, this func only gets called when store state is
//   changed).
//
//   The func then returns stateProps object which merges with
//   PureTaskList's 'tasks' props (ie. sets to the stored values).
//
// * mapDispatchToProps
//   Set to named func but no parameters are passed - and also nothing is
//   returned, so presumably this function has no effect.
// --------------------------------------------------------------------------
export default connect(
  ({ tasks }) => ({
    tasks: tasks.filter(
      t => t.state === "TASK_INBOX" || t.state === "TASK_PINNED"
    )
  }),
  dispatch => ({
    onArchiveTask: id => dispatch(archiveTask(id)),
    onPinTask: id => dispatch(pinTask(id))
  })
)(PureTaskList);

export { PureTaskList };
