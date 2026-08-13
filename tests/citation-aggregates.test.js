const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const rootDir = path.resolve(__dirname, '..');
const contentDataPath = path.join(rootDir, 'content-data.js');

function loadSiteContent() {
  const source = fs.readFileSync(contentDataPath, 'utf8');
  const context = { window: {} };

  vm.createContext(context);
  vm.runInContext(source, context, { filename: contentDataPath });

  assert.ok(context.window.siteContent, 'content-data.js must define window.siteContent');
  return context.window.siteContent;
}

function numericCitationCount(publication) {
  const value = Number(publication.cited_by);
  assert.ok(
    Number.isFinite(value),
    `${publication.title} must have a numeric cited_by value`
  );
  return value;
}

function isFirstAuthor(publication) {
  const authors = (publication.authors || '').trim();
  return (
    authors.startsWith('H Joko') ||
    authors.startsWith('H JOKO') ||
    authors.startsWith('城光英彰')
  );
}

function sum(values) {
  return values.reduce((total, value) => {
    const numericValue = Number(value);
    assert.ok(Number.isFinite(numericValue), 'citation year arrays must contain only numbers');
    return total + numericValue;
  }, 0);
}

const siteContent = loadSiteContent();
const scholarProfile = siteContent.pages?.publications?.scholarProfile;

assert.ok(scholarProfile, 'publications.scholarProfile must exist');
assert.ok(Array.isArray(scholarProfile.publications), 'scholarProfile.publications must be an array');

const { profile, publications } = scholarProfile;
const citations = profile?.citations || {};
const byYear = citations.byYear || {};
const citedPublications = publications.filter((publication) => numericCitationCount(publication) > 0);
const citationCodes = citedPublications.map((publication) => publication.citationCode);

assert.ok(
  citationCodes.every(Boolean),
  'every cited publication must define citationCode for the citation map'
);
assert.equal(
  new Set(citationCodes).size,
  citationCodes.length,
  'publication citationCode values must be unique'
);

const publicationCitationTotal = publications.reduce(
  (total, publication) => total + numericCitationCount(publication),
  0
);
const firstAuthorCitationTotal = publications
  .filter(isFirstAuthor)
  .reduce((total, publication) => total + numericCitationCount(publication), 0);

assert.equal(
  citations.all?.citations,
  publicationCitationTotal,
  'citations.all.citations must equal the sum of publication cited_by values'
);

assert.equal(
  citations.firstAuthor?.citations,
  firstAuthorCitationTotal,
  'citations.firstAuthor.citations must equal the sum of first-author publication cited_by values'
);

assert.ok(Array.isArray(byYear.years), 'citations.byYear.years must be an array');
assert.ok(Array.isArray(byYear.counts), 'citations.byYear.counts must be an array');
assert.ok(Array.isArray(byYear.all), 'citations.byYear.all must be an array');
assert.ok(Array.isArray(byYear.firstAuthor), 'citations.byYear.firstAuthor must be an array');

assert.equal(byYear.counts.length, byYear.years.length, 'byYear.counts length must match years');
assert.equal(byYear.all.length, byYear.years.length, 'byYear.all length must match years');
assert.equal(byYear.firstAuthor.length, byYear.years.length, 'byYear.firstAuthor length must match years');

assert.deepEqual(
  byYear.all,
  byYear.counts,
  'citations.byYear.all must stay in sync with citations.byYear.counts'
);

assert.equal(
  sum(byYear.counts),
  citations.all?.citations,
  'sum of citations.byYear.counts must equal citations.all.citations'
);

assert.equal(
  sum(byYear.all),
  citations.all?.citations,
  'sum of citations.byYear.all must equal citations.all.citations'
);

assert.equal(
  sum(byYear.firstAuthor),
  citations.firstAuthor?.citations,
  'sum of citations.byYear.firstAuthor must equal citations.firstAuthor.citations'
);

const sinceYear = 2021;
const sinceCitationTotal = byYear.years.reduce((total, year, index) => {
  return Number(year) >= sinceYear ? total + Number(byYear.counts[index]) : total;
}, 0);

assert.equal(
  citations.since2020?.citations,
  sinceCitationTotal,
  `citations.since2020.citations must equal citation counts since ${sinceYear}`
);

console.log('Citation aggregate checks passed.');
