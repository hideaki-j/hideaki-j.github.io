const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');
const chartSource = source.slice(
  source.indexOf('function easeInOutCubic('),
  source.indexOf('// Normalize asset paths')
);

function createChart(dpr) {
  const frames = [];
  let hidden = true;
  let size = { width: 404, height: 180 };
  let allocations = 0;
  let draws = 0;
  const ctx = new Proxy({}, {
    get: (_, key) => key === 'fillRect' ? () => draws++ : () => {},
    set: () => true
  });
  class Canvas {
    constructor() { this.bitmapWidth = 300; this.bitmapHeight = 150; }
    get width() { return this.bitmapWidth; }
    set width(value) { this.bitmapWidth = value; allocations++; }
    get height() { return this.bitmapHeight; }
    set height(value) { this.bitmapHeight = value; allocations++; }
    get clientWidth() { return hidden ? 0 : size.width; }
    get clientHeight() { return hidden ? 0 : size.height; }
    getBoundingClientRect() { return hidden ? { width: 0, height: 0 } : size; }
    getContext() { return ctx; }
    closest() {
      return { classList: { contains: () => !hidden }, hasAttribute: () => hidden };
    }
  }
  const canvas = new Canvas();
  const window = {
    devicePixelRatio: dpr,
    requestAnimationFrame: fn => frames.push(fn),
    cancelAnimationFrame: () => {}
  };
  const context = vm.createContext({
    window, HTMLElement: Canvas, document: { getElementById: () => canvas },
    requestAnimationFrame: window.requestAnimationFrame,
    performance: { now: () => 0 }
  });
  vm.runInContext(chartSource, context);
  const profile = { citations: { byYear: { years: [2025, 2026], all: [52, 57] } } };
  function render() {
    context.scheduleScholarCitationGraph(profile, 'all');
    let remaining = 30;
    while (frames.length && remaining-- > 0) frames.shift()(0);
    assert.equal(frames.length, 0, 'render retries must finish');
  }
  return {
    canvas, render,
    show: () => { hidden = false; }, hide: () => { hidden = true; },
    resize: next => { size = next; },
    get allocations() { return allocations; }, get draws() { return draws; }
  };
}

for (const dpr of [1, 2, 3]) {
  const chart = createChart(dpr);
  for (let i = 0; i < 100; i++) chart.render();
  assert.equal(chart.canvas.width, 300, `hidden width must stay unchanged at DPR ${dpr}`);
  assert.equal(chart.canvas.height, 150, `hidden height must stay unchanged at DPR ${dpr}`);
  assert.equal(chart.allocations, 0, 'hidden chart must not allocate graphics buffers');

  chart.show();
  chart.render();
  assert.equal(chart.canvas.width, 404 * dpr);
  assert.equal(chart.canvas.height, 180 * dpr);
  assert.equal(chart.draws, 2, 'both annual bars must render when shown');
  const allocations = chart.allocations;
  for (let i = 0; i < 100; i++) { chart.hide(); chart.render(); chart.show(); chart.render(); }
  assert.equal(chart.allocations, allocations, 'tab switching must reuse the correctly sized bitmap');

  chart.resize({ width: 320, height: 180 });
  chart.render();
  assert.equal(chart.canvas.width, 320 * dpr, 'visible resizing must update bitmap size');
  chart.resize({ width: 0, height: 0 });
  const previousAllocations = chart.allocations;
  chart.render();
  assert.equal(chart.allocations, previousAllocations, 'unmeasurable canvas must not reuse backing size as CSS size');
}

console.log('Citation chart resize regression checks passed.');
