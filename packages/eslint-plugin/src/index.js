import pkg from '../package.json' with { type: 'json' };
import base from './configs/base.js';
import comments from './configs/comments.js';
import next from './configs/next.js';
import react from './configs/react.js';
import typescript from './configs/typescript.js';
import vitest from './configs/vitest.js';

const { name, version } = pkg;

/** @type {import('eslint').ESLint.Plugin} */
export const plugin = {
  meta: {
    name,
    version,
  },
  configs: {
    base,
    comments,
    next,
    react,
    typescript,
    vitest,
  },
};
