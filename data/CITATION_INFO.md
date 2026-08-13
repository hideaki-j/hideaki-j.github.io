# Citation map data

## `citation_info.pkl`

Normalized citation graph:

- `schema_version`: integer
- `metadata`: source row count and content hash
- `authors`: `author_id -> {canonical_name, aliases?}`
- `institutions`: legacy `institution_id -> {canonical_name}` directory
- `works`: `scholar_id -> {title, evidence_url, citations, authorships}`

Each authorship contains an `author_id` and affiliation records with `institution_ids`, `countries`, and an optional original `label`.

## `institutions.pkl`

Authoritative institution registry:

- `schema_version`: integer
- `metadata`: registry counts and matching citation-data hash
- `institutions`: `institution_id -> {canonical_name, aliases, countries}`
- `name_map`: recorded affiliation name -> tuple of canonical `institution_id` values

Countries are registered per institution, preventing countries from unrelated co-affiliations from being assigned to each other. IDs are `institution_` plus the first 12 hexadecimal characters of the canonical name's SHA-256 hash.

## Convert for the viewer

```sh
python3 data/citation_map_viewer/convert.py
```

This reads both pickle files plus publication authorship metadata from `content-data.js`, adds country-to-continent classifications, then writes only `data.js`. The output contains gzip-compressed binary data encoded as Base64, with no readable records. `index.html` is fixed and loads `data.js`; all displayed totals are calculated in the browser.
