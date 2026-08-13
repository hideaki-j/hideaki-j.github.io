#!/usr/bin/env python3
"""Convert repository citation sources into the browser-readable data.js."""

from __future__ import annotations

import base64
import gzip
import json
import os
import pickle
import subprocess
import tempfile
from pathlib import Path


VIEWER_DIR = Path(__file__).resolve().parent
ROOT_DIR = VIEWER_DIR.parent.parent
CITATION_PATH = VIEWER_DIR.parent / "citation_info.pkl"
INSTITUTION_PATH = VIEWER_DIR.parent / "institutions.pkl"
CONTENT_DATA_PATH = ROOT_DIR / "content-data.js"
OUTPUT_PATH = VIEWER_DIR / "data.js"

COUNTRY_CONTINENTS = {
    "Australia": "Oceania",
    "Austria": "Europe",
    "Belgium": "Europe",
    "Brazil": "South America",
    "Canada": "North America",
    "China": "Asia",
    "Czech Republic": "Europe",
    "Denmark": "Europe",
    "Estonia": "Europe",
    "Finland": "Europe",
    "France": "Europe",
    "Germany": "Europe",
    "Hong Kong": "Asia",
    "India": "Asia",
    "Iran": "Asia",
    "Israel": "Asia",
    "Italy": "Europe",
    "Japan": "Asia",
    "Macao": "Asia",
    "North Macedonia": "Europe",
    "Norway": "Europe",
    "Portugal": "Europe",
    "Saudi Arabia": "Asia",
    "Singapore": "Asia",
    "South Korea": "Asia",
    "Spain": "Europe",
    "Switzerland": "Europe",
    "The Netherlands": "Europe",
    "UK": "Europe",
    "USA": "North America",
}


def load_pickle(path: Path) -> dict:
    with path.open("rb") as handle:
        value = pickle.load(handle)
    if not isinstance(value, dict):
        raise TypeError(f"{path.name} must contain a dictionary")
    return value


def load_portfolio_authorships() -> dict[str, bool]:
    script = r"""
const fs = require("fs");
const vm = require("vm");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(process.argv[1], "utf8"), context);
const publications = context.window.siteContent.pages.publications.scholarProfile.publications;
const result = {};
for (const publication of publications) {
  if (!publication.citationCode) continue;
  const authors = String(publication.authors || "").trim();
  result[publication.citationCode] = /^(H Joko|H JOKO|城光英彰)/.test(authors);
}
process.stdout.write(JSON.stringify(result));
"""
    completed = subprocess.run(
        ["node", "-e", script, str(CONTENT_DATA_PATH)],
        check=True,
        capture_output=True,
        text=True,
    )
    return json.loads(completed.stdout)


def validate(citation: dict, registry: dict, portfolio_authorships: dict[str, bool]) -> None:
    required_citation_keys = {"schema_version", "metadata", "authors", "institutions", "works"}
    required_registry_keys = {"schema_version", "metadata", "institutions", "name_map"}
    if not required_citation_keys.issubset(citation):
        raise ValueError("citation_info.pkl is missing required keys")
    if not required_registry_keys.issubset(registry):
        raise ValueError("institutions.pkl is missing required keys")
    if citation["metadata"].get("content_sha256") != registry["metadata"].get("citation_content_sha256"):
        raise ValueError("institutions.pkl was built for a different citation snapshot")

    institution_ids = set(registry["institutions"])
    unknown_ids = {
        institution_id
        for targets in registry["name_map"].values()
        for institution_id in targets
        if institution_id not in institution_ids
    }
    if unknown_ids:
        raise ValueError(f"name_map references unknown institution IDs: {sorted(unknown_ids)}")

    citation_codes = {
        code
        for work in citation["works"].values()
        for code in work.get("citations", {})
    }
    missing_codes = citation_codes - set(portfolio_authorships)
    if missing_codes:
        raise ValueError(f"content-data.js is missing citationCode values: {sorted(missing_codes)}")

    registered_countries = {
        country
        for institution in registry["institutions"].values()
        for country in institution.get("countries", ())
    }
    missing_countries = registered_countries - set(COUNTRY_CONTINENTS)
    if missing_countries:
        raise ValueError(f"countries are missing continent mappings: {sorted(missing_countries)}")


def convert() -> None:
    citation = load_pickle(CITATION_PATH)
    institutions = load_pickle(INSTITUTION_PATH)
    portfolio_authorships = load_portfolio_authorships()
    validate(citation, institutions, portfolio_authorships)

    payload = {
        "citation": citation,
        "institutions": institutions,
        "country_continents": COUNTRY_CONTINENTS,
        "first_author_codes": sorted(
            code for code, is_first_author in portfolio_authorships.items() if is_first_author
        ),
    }
    json_bytes = json.dumps(
        payload,
        ensure_ascii=False,
        separators=(",", ":"),
    ).encode("utf-8")
    encoded = base64.b64encode(gzip.compress(json_bytes, compresslevel=9, mtime=0)).decode("ascii")
    output = f'window._D="{encoded}";\n'

    file_descriptor, temporary_name = tempfile.mkstemp(
        dir=VIEWER_DIR,
        prefix=".data-",
        suffix=".js",
    )
    try:
        with os.fdopen(file_descriptor, "w", encoding="ascii", newline="\n") as handle:
            handle.write(output)
        os.replace(temporary_name, OUTPUT_PATH)
    except BaseException:
        Path(temporary_name).unlink(missing_ok=True)
        raise

    print(
        f"Wrote {OUTPUT_PATH.name}: {len(citation['works'])} works, "
        f"{len(institutions['institutions'])} institutions, "
        f"{len(payload['first_author_codes'])} first-author portfolio works"
    )


if __name__ == "__main__":
    convert()
