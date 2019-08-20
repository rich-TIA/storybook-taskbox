// JSX questions
// 1. {`backquote ${name}`} syntax for prop value
// 2. onCick={event => funccall()} syntax and where does 'event' come from?
// 3. <span className={`backquote-style-name`} syntax
// 4. Comment {/* ... */} makes sense

import React from "react";

// Type-safety - alternative to Typescript. Think this is part of the React distro
import PropTypes from "prop-types";

function Task({ task: { id, title, state }, onArchiveTask, onPinTask }) {
  return (
    <div className={`list-item ${state}`}>
      <label className="checkbox">
        <input
          type="checkbox"
          defaultChecked={state === "TASK_ARCHIVED"}
          disabled={true}
          name="checked"
        />
        <span className="checkbox-custom" onClick={() => onArchiveTask(id)} />
      </label>
      <div className="title">
        <input
          type="text"
          value={title}
          readOnly={true}
          placeholder="Input title"
        />
      </div>
      <div className="actions" onClick={event => event.stopPropagation()}>
        {state !== "TASK_ARCHIVED" && (
          // ----- [ Interestingly, the following line gave an eslint warning: ] -----
          // The href attribute is required for an anchor to be keyboard accessible.
          // Provide a valid, navigable address as the href value.
          // If you cannot provide an href, but still need the element to resemble a link,
          // use a button and change it with appropriate styles.
          // Learn more: https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md  jsx-a11y/anchor-is-valid
          <a onClick={() => onPinTask(id)}>
            <span className={`icon-star`} />
          </a>
        )}
      </div>
      {/* No longer required */}
      {/* <input type="text" value={title} readOnly={true} /> */}
    </div>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired
  }),
  onArchiveTask: PropTypes.func,
  onPinTask: PropTypes.func
};

// 1. Expose for import statement
// 2. default => anonymous func; allows us to import Task from 'file'
//    without qualification.
// Can put this on the same line as the definition ('export default function ...')
// But I think this makes clear propTypes are defined before export
// See https://24ways.org/2014/javascript-modules-the-es6-way/
export default Task;
