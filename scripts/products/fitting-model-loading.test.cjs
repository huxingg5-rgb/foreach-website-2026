/* eslint-disable @typescript-eslint/no-require-imports -- Exercise browser scheduling with deterministic lifecycle events. */
const test = require('node:test');
const assert = require('node:assert/strict');
require('tsx/cjs');
const { scheduleFittingModelLoad, observeFittingModelActivity } = require('../../components/products/detail/fitting-model-loading.ts');

function environment({ ready = 'loading', hidden = false, idle = true, observer = true } = {}) {
  const host = new EventTarget(), page = new EventTarget();
  page.readyState = ready; page.hidden = hidden;
  let next = 0, observe, disconnected = false;
  const jobs = new Map();
  host.setTimeout = callback => { jobs.set(++next, callback); return next; };
  host.clearTimeout = id => jobs.delete(id);
  if (idle) {
    host.requestIdleCallback = host.setTimeout;
    host.cancelIdleCallback = host.clearTimeout;
  }
  if (observer) host.IntersectionObserver = class {
    constructor(callback) { observe = callback; }
    observe() {}
    disconnect() { disconnected = true; }
  };
  return { host, page, jobs,
    run() { const callbacks = [...jobs.values()]; jobs.clear(); callbacks.forEach(fn => fn()); },
    load() { page.readyState = 'complete'; host.dispatchEvent(new Event('load')); },
    hide(value) { page.hidden = value; page.dispatchEvent(new Event('visibilitychange')); },
    intersect(value) { observe([{ isIntersecting: value }]); },
    disconnected: () => disconnected,
  };
}

test('automatic fitting loading waits for initial resources and an idle slot, then runs once', () => {
  const e = environment(); let starts = 0;
  scheduleFittingModelLoad(() => starts++, e.host, e.page);
  assert.equal(e.jobs.size, 0);
  e.load(); assert.equal(starts, 0); assert.equal(e.jobs.size, 1);
  e.run(); e.load(); e.hide(false); e.run();
  assert.equal(starts, 1);
});

test('hidden pages defer pending automatic work until visible again', () => {
  const e = environment({ ready: 'complete', hidden: true }); let starts = 0;
  scheduleFittingModelLoad(() => starts++, e.host, e.page);
  assert.equal(e.jobs.size, 0);
  e.hide(false); assert.equal(e.jobs.size, 1);
  e.hide(true); assert.equal(e.jobs.size, 0);
  e.run(); assert.equal(starts, 0);
  e.hide(false); e.run(); assert.equal(starts, 1);
});

test('manual selection or navigation cancels automatic loading before and after page load', () => {
  for (const ready of ['loading', 'complete']) {
    const e = environment({ ready }); let starts = 0;
    const stop = scheduleFittingModelLoad(() => starts++, e.host, e.page);
    stop(); e.load(); e.hide(false); e.run();
    assert.equal(starts, 0); assert.equal(e.jobs.size, 0);
  }
});

test('browsers without idle callbacks still defer model loading and support cancellation', () => {
  const e = environment({ ready: 'complete', idle: false }); let starts = 0;
  const stop = scheduleFittingModelLoad(() => starts++, e.host, e.page);
  assert.equal(starts, 0); assert.equal(e.jobs.size, 1);
  stop(); e.run(); assert.equal(starts, 0);
  scheduleFittingModelLoad(() => starts++, e.host, e.page);
  e.run(); assert.equal(starts, 1);
});

test('rendering is active only while the model area and browser tab are visible', () => {
  const e = environment(); const states = [];
  const stop = observeFittingModelActivity({}, value => states.push(value), e.host, e.page);
  e.intersect(false); e.intersect(true); e.hide(true); e.hide(false); e.intersect(false);
  assert.deepEqual(states, [false, true, false, true, false]);
  stop(); assert.ok(e.disconnected());
  e.hide(false); e.intersect(true);
  assert.equal(states.length, 5);
});

test('visibility fallback still pauses a background tab and cleans up on navigation', () => {
  const e = environment({ observer: false, hidden: true }); const states = [];
  const stop = observeFittingModelActivity({}, value => states.push(value), e.host, e.page);
  e.run(); e.hide(false); e.hide(true);
  assert.deepEqual(states, [false, true, false]);
  stop(); e.hide(false); assert.equal(states.length, 3);
  const next = environment({ observer: false });
  const dispose = observeFittingModelActivity({}, () => assert.fail('disposed'), next.host, next.page);
  dispose(); next.run();
});
