import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import commentsRules from '../rules/comments.js';

/** @type {import('eslint').Linter.Config} */
export const commentsConfig = {
  name: '@jabworks/eslint-config-comments',
  rules: commentsRules,
};

/** @type {import('eslint').Linter.Config[]} */
const configs = [comments.recommended, commentsConfig];

export default configs;
