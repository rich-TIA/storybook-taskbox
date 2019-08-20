// Very simple wrapper around TaskList - which manages its own data via Redux -
// and a top level error handler pulled from Redux
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import TaskList from "./TaskList"; // the Connect(PureTaskList) wrapped container object

const PureInboxScreen = function({ error }) {
  if (error) {
    return (
      <div className="page lists-show">
        <div className="wrapper-message">
          <span className="icon-face-sad" />
          <div className="title-message">Whoops</div>
          <div className="subtitle-message">You fucked up</div>
        </div>
      </div>
    );
  }
  //
  // Problem here is at this point none of the DS tasks are used... TaskList just populates with the default
  // tasks in the TaskList 'default' story.
  //
  return (
    <div className="page lists-show">
      <nav>
        <h1 clsasName="title-page">
          <span className="title-wrapper">Taskbox</span>
        </h1>
      </nav>
      <TaskList />
    </div>
  );
};

PureInboxScreen.propTypes = {
  error: PropTypes.string
};

PureInboxScreen.defaultProps = {
  error: null
};

// ES6 Again with the syntax
export default connect(({ error }) => ({ error }))(PureInboxScreen);
export { PureInboxScreen };
