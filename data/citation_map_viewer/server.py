#!/usr/bin/env python3
"""Serve the citation viewer directly from the repository's trusted pickle files."""

from __future__ import annotations

import argparse
import json
import pickle
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit


VIEWER_DIR = Path(__file__).resolve().parent
ROOT_DIR = VIEWER_DIR.parent.parent
CITATION_PATH = VIEWER_DIR.parent / "citation_info.pkl"
INSTITUTION_PATH = VIEWER_DIR.parent / "institutions.pkl"
CONTENT_DATA_PATH = ROOT_DIR / "content-data.js"

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


def validate(citation: dict, registry: dict) -> None:
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

    registered_countries = {
        country
        for institution in registry["institutions"].values()
        for country in institution.get("countries", ())
    }
    missing_countries = registered_countries - set(COUNTRY_CONTINENTS)
    if missing_countries:
        raise ValueError(f"countries are missing continent mappings: {sorted(missing_countries)}")


def load_payload() -> dict:
    # Reload on every request so refreshing the viewer picks up saved edits.
    citation = load_pickle(CITATION_PATH)
    institutions = load_pickle(INSTITUTION_PATH)
    validate(citation, institutions)
    return {
        "citation": citation,
        "institutions": institutions,
        "country_continents": COUNTRY_CONTINENTS,
    }


class ViewerHandler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        path = urlsplit(self.path).path
        try:
            if path == "/api/data":
                body = json.dumps(load_payload(), ensure_ascii=False).encode("utf-8")
                content_type = "application/json; charset=utf-8"
            elif path in ("/", "/index.html"):
                body = (VIEWER_DIR / "index.html").read_bytes()
                content_type = "text/html; charset=utf-8"
            elif path == "/content-data.js":
                body = CONTENT_DATA_PATH.read_bytes()
                content_type = "text/javascript; charset=utf-8"
            else:
                self.send_error(404)
                return
        except Exception as error:
            self.log_error("Unable to load viewer data: %s", error)
            body = json.dumps({"error": str(error)}).encode("utf-8")
            self.respond(500, body, "application/json; charset=utf-8")
            return
        self.respond(200, body, content_type)

    def respond(self, status: int, body: bytes, content_type: str) -> None:
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8000)
    args = parser.parse_args()
    with ThreadingHTTPServer(("127.0.0.1", args.port), ViewerHandler) as server:
        print(f"Citation viewer: http://127.0.0.1:{server.server_port}", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()
