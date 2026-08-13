import csv
import json
import re
import unicodedata
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def normalized(value):
    value = "".join(
        character
        for character in unicodedata.normalize("NFKD", value or "")
        if unicodedata.category(character) != "Mn"
    ).casefold()
    return re.sub(r"[^\w]+|_+", " ", value, flags=re.UNICODE).strip()


with (ROOT / "data/citation_info.csv").open(newline="") as handle:
    rows = list(csv.DictReader(handle))
summary = json.loads((ROOT / "data/citation_impact_summary.json").read_text())
scholar = json.loads((ROOT / "data/scholar_citation_results.json").read_text())

authors = {normalized(row["Canonical Author"]) for row in rows}
institutions = {normalized(row["Canonical Institution"]) for row in rows}

assert len(scholar) == summary["citation_results"] == 160
assert len(authors) == summary["unique_researchers"] == 487
assert len(institutions) == summary["unique_institutions"] == 179
assert "Google DeepMind" in {row["Canonical Institution"] for row in rows}
assert "Stanford University" in {row["Canonical Institution"] for row in rows}

print("Citation impact evidence checks passed.")
