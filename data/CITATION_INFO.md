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

## Run the viewer locally

```sh
python3 data/citation_map_viewer/server.py
```

Open http://127.0.0.1:8000. Refresh to reload the pickle files; Ctrl+C to stop.
