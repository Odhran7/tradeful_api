// This is config for prometheus monitoring

import { collectDefaultMetrics, Registry } from 'prom-client';

const register = new Registry();

const initMetrics = () => {
  collectDefaultMetrics({ register });
};

export { register, initMetrics };