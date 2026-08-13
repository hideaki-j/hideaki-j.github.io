# Citation impact evidence

The homepage claim is backed by a browser-reviewed snapshot of Hideaki Joko's
Google Scholar profile dated 2026-08-12.

- 160 citing-result occurrences were enumerated across all 14 profile papers.
- Those results resolve to 140 distinct Scholar record IDs and 134 normalized
  titles (the same citing work can cite more than one profile paper or appear in
  multiple Scholar versions).
- Paper pages and rendered PDFs were opened to verify author and affiliation
  information. `citation_manual_evidence.json` records newly reviewed papers;
  earlier reviewed rows were reconciled from `citation_info.csv`.
- Author identity normalization yields 487 unique researchers.
- Affiliation splitting and organization-alias normalization yields 179 unique
  institutions.

The public wording rounds these audited counts down to the durable claim:
"480+ researchers across 175+ institutions worldwide."

Files:

- `scholar_citation_results.json`: the 160 Scholar result occurrences and their
  source profile-paper buckets.
- `citation_manual_evidence.json`: paper-level author/affiliation evidence URLs.
- `citation_info.csv`: the flattened, auditable spreadsheet used for counting.
- `citation_impact_summary.json`: exact totals and the normalization method.
- `../scripts/recount_citation_impact.py`: deterministic recount script.
