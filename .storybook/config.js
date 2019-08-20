// Changes here are because we are running a CRA app and need to
// adapt it for SB
// More ES6 questions
// 1. import with CSS file?
// 2. => syntax
import { configure } from "@storybook/react";

// Storyshots - use Babel macro instead of 'require.context' for use in Jest
import requireContext from "require-context.macro";

// Make SB use our CSS file. Intellisense didn't pick this up at all
// NB this is *copied* from the learnstorybook-code GitHub repo at
// https://github.com/chromaui/learnstorybook-code/tree/master/src
// Didn't fork this one here
import "../src/index.css";

// Tell SB where to find stories
// Replace require.context with Babel macro for use in Storyshots
// I think this is because in the context of Storyshots require.context is undefined,
// perhaps Webpack is not loaded for Storyshots tests? Who knows
//const req = require.context("../src", true, /\.stories.js$/);
const req = requireContext("../src/components", true, /\.stories.js$/);

function loadStories() {
  // CRA app - stories are not kept here
  // require('../src/stories');
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
