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

## Verified update: 2026-09-06

Added two previously absent Scholar records, after comparing all ConEL and CREL citing-result pages with the stored IDs:

- `JBUtwH7OayEJ`: [You Know What I Mean: A Benchmark for Agentic Conversational Reference Grounding](https://arxiv.org/html/2608.29834v1), Karen Fuchs, Uri Katz, and Yoav Goldberg (2026). All three list Bar-Ilan University (Israel); Goldberg additionally lists Allen Institute for AI (USA). The author block supplies affiliations and the bibliography cites ConEL (Joko et al., 2021).
- `v1lZqMyyUJ4J`: [Automatic Event Recognition in Oral History](https://studenttheses.uu.nl/items/f2a0de26-27f0-4ab5-9d8d-09a4d4be8399/full), Yanthe Roumen (2026), Utrecht University (The Netherlands). The university record identifies the author and university; Scholar's CREL citing-results list supplies the citation relationship. The thesis advisor is not counted as an author.

These add four author identities and three canonical institutions. Complete-portfolio totals: **162 citation links, 142 Scholar work records, 498 researchers, 180 institutions**. Counts include self-citations and retain the existing identity normalization and institution mappings. Scholar versions are not merged into unique publications by this count.

The page content is rendered from `content-data.js`; the HTML shells contain no hardcoded citation totals. Updated its biography and publication-card claims, publication counts (LAPS 73, ConEL 37, CREL 15, CRS Arena 11), h-index (6), and yearly series from the live Scholar charts. The old displayed per-paper distribution differed from the database even though both summed to 160. First-author totals are 151, calculated by excluding CRS Arena's 11 citations (6 in 2025, 5 in 2026). The complete yearly series is 2, 0, 1, 1, 14, 18, 20, 55, 51 for 2018–2026. The second summary column is since 2021 (159 citations), although its legacy object key is `since2020`.

`citation_update_2026-09-06.json` records this snapshot. The new content fingerprint hashes sorted, compact UTF-8 JSON of the citation graph's `authors`, `institutions`, and `works` dictionaries. Both pickle metadata records share that fingerprint. Source row count preserves the 933 legacy rows and adds five author-affiliation rows; it is provenance, not a unique-person count.
