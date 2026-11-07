const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('app.js', 'utf8');
const shareCode = source.slice(source.indexOf('// Article sharing:'));
assert.ok(source.includes('type="button" data-share-article='));
assert.ok(!source.includes('rel="noopener noreferrer">SHARE THIS ARTICLE'));
async function run(navigator, expected) {
  const status = {textContent: ''};
  const input = {hidden: true, focus() { this.focused = true; }, select() { this.selected = true; }};
  const button = {dataset: {shareArticle: 'power'}, closest() { return {querySelector(selector) { return selector === 'input' ? input : status; }}; }};
  let listener;
  const context = vm.createContext({navigator, byId: id => ({id, title: 'Who benefits?'}), document: {addEventListener(type, handler) { listener = handler; }}});
  vm.runInContext(shareCode, context);
  await context.shareArticle(button);
  assert.equal(button.disabled, false);
  assert.equal(status.textContent, expected);
  if (expected.startsWith('Copy this')) {
    assert.equal(input.value, 'https://epnews.pages.dev/article/power');
    assert.ok(input.focused && input.selected && !input.hidden);
  }
  let prevented = false;
  button.disabled = true;
  listener({target: {closest: () => button}, preventDefault() { prevented = true; }});
  assert.ok(prevented, 'Share clicks must not navigate');
}
(async () => {
  await run({share: async data => {
    assert.equal(data.url, 'https://epnews.pages.dev/article/power');
    assert.equal(data.title, 'Who benefits?');
  }}, '');
  await run({share: async () => { throw {name: 'AbortError'}; }, clipboard: {writeText() { assert.fail('Cancellation must not copy'); }}}, '');
  const clipboard = {writeText: async url => assert.equal(url, 'https://epnews.pages.dev/article/power')};
  await run({clipboard}, 'Link copied — paste it to share.');
  await run({share: async () => { throw {name: 'NotAllowedError'}; }, clipboard}, 'Link copied — paste it to share.');
  await run({}, 'Copy this link to share the article.');
  await run({clipboard: {writeText: async () => { throw Error('denied'); }}}, 'Copy this link to share the article.');
  console.log('PASS: native sharing, cancellation, clipboard, denied APIs, manual copy, and navigation prevention');
})().catch(error => { console.error(error); process.exitCode = 1; });
