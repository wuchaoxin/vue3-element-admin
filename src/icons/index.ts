/* eslint-disable @typescript-eslint/no-explicit-any */
const req = require.context("./svg", false, /\.svg$/);
const requireAll = (requireContext: any) =>
  requireContext.keys().map(requireContext);
requireAll(req);
