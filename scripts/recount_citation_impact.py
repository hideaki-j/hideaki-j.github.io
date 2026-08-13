#!/usr/bin/env python3
"""Rebuild the citation-impact evidence table from Scholar and paper reviews."""

import argparse
import csv
import difflib
import json
import re
import unicodedata
from collections import defaultdict
from datetime import date
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"


def normalized(value):
    value = "".join(
        character
        for character in unicodedata.normalize("NFKD", value or "")
        if unicodedata.category(character) != "Mn"
    ).casefold()
    return re.sub(r"[^\w]+|_+", " ", value, flags=re.UNICODE).strip()


TITLE_ALIASES = {
    normalized("Conversational agents: A framework for evaluation (CAFE)(Dagstuhl Perspectives Workshop 24352)"):
        ("table", normalized("Manifesto from Dagstuhl Perspectives Workshop 24352—Conversational Agents: A Framework for Evaluation (CAFE)")),
    normalized("Dagstuhl Reports, Vol. 11, Issue 1 ISSN 2193-2433"):
        ("table", normalized("Manifesto from Dagstuhl Perspectives Workshop 24352—Conversational Agents: A Framework for Evaluation (CAFE)")),
    normalized("WildClaims: Conversational Information Access in the Wild(Chat)"):
        ("table", normalized("WildClaims: Information Access Conversations in the Wild(Chat)")),
    normalized("Mapping the Collaboration between Crowdsourcing and Large"):
        ("manual", normalized("Mapping the Collaboration between Crowdsourcing and Large Language Models: A Fine-Grained Survey")),
}


AUTHOR_ALIASES = {
    normalized("Arjen de Vries"): "Arjen P. de Vries",
    normalized("Atoosa Kasrizadeh"): "Atoosa Kasirzadeh",
    normalized("Clemencia Siro"): "Clemencia N. Siro",
    normalized("Maeda Hanafi"): "Maeda F Hanafi",
}


INSTITUTION_ALIASES = {
    "Adobe Research": "Adobe",
    "Amazon.com, Inc.": "Amazon",
    "Amazon, Palo Alto": "Amazon",
    "Artificial Intelligence Graduate School, UNIST": "UNIST",
    "Baidu Inc.": "Baidu",
    "Department of Computer Science and Operations Research, University of Montreal": "University of Montreal",
    "DIMES, University of Calabria": "University of Calabria",
    "Fujitsu Ltd.": "Fujitsu",
    "Gaoling School of Artificial Intelligence, Renmin University of China": "Renmin University of China",
    "Google Deepmind": "Google DeepMind",
    "Graduate School of Artificial Intelligence, POSTECH": "POSTECH",
    "Harbin Institute of Technology, Shenzhen": "Harbin Institute of Technology",
    "Huawei Noah’s Ark Lab": "Huawei",
    "Huawei Technologies Co., Ltd.": "Huawei",
    "IBM Research": "IBM",
    "IBM Research AI": "IBM",
    "IBM Technologies": "IBM",
    "IIIA-CSIC": "Artificial Intelligence Research Institute (IIIA-CSIC)",
    "Konica Minolta Inc.": "Konica Minolta",
    "Kuaishou Inc": "Kuaishou",
    "Mitsubishi Electric Corporation, Information Technology R&D Center": "Mitsubishi Electric Corporation",
    "Nippon Telegraph and Telephone Corporation": "NTT",
    "Noah’s Ark Lab, Huawei": "Huawei",
    "NTT Digital Twin Computing Research Center": "NTT",
    "School of Cyber Science and Technology, University of Science and Technology of China": "University of Science and Technology of China",
    "School of Information Science and Technology, University of Science and Technology of China": "University of Science and Technology of China",
    "The University of Edinburgh": "University of Edinburgh",
    "The University of Queensland": "University of Queensland",
    "Tsinghua Shenzhen International Graduate School": "Tsinghua University",
    "TU Delft": "Delft University of Technology",
    "University of California, La Jolla": "University of California San Diego",
}


MULTI_INSTITUTION = {
    "City University of Hong Kong and Dalian University of Technology": ["City University of Hong Kong", "Dalian University of Technology"],
    "City University of Hong Kong and University of Science and Technology of China": ["City University of Hong Kong", "University of Science and Technology of China"],
    "Institut de Robòtica i Informàtica Industrial (IRI-CSIC) / Universitat Politècnica de Catalunya (UPC)": ["IRI-CSIC", "Universitat Politècnica de Catalunya"],
    "IRI (UPC-CSIC)": ["IRI-CSIC", "Universitat Politècnica de Catalunya"],
    "IRI-CSIC, UPC BarcelonaTech": ["IRI-CSIC", "Universitat Politècnica de Catalunya"],
    "Nanyang Technological University / A*STAR": ["Nanyang Technological University", "A*STAR"],
    "NEC Laboratories Europe / KU Leuven": ["NEC Laboratories Europe", "KU Leuven"],
    "NEC Laboratories Europe / Ss. Cyril and Methodius University / CAIR": ["NEC Laboratories Europe", "Ss. Cyril and Methodius University", "CAIR"],
    "Northwestern Polytechnical University and Shanghai Artificial Intelligence Laboratory": ["Northwestern Polytechnical University", "Shanghai Artificial Intelligence Laboratory"],
    "TU Eindhoven & JADS": ["Eindhoven University of Technology", "JADS"],
    "University of Exeter and LMU Munich": ["University of Exeter", "Ludwig Maximilian University of Munich"],
    "University of Milan / ASST Santi Paolo e Carlo": ["University of Milan", "ASST Santi Paolo e Carlo"],
    "Vrije Universiteit Brussel & University of Antwerp": ["Vrije Universiteit Brussel", "University of Antwerp"],
}


def institutions(raw):
    result = []
    for part in filter(None, (part.strip() for part in (raw or "").split(";"))):
        for item in MULTI_INSTITUTION.get(part, [part]):
            result.append(INSTITUTION_ALIASES.get(item, item))
    return result


def find_title(title, table_by_title, manual_by_title):
    key = normalized(title)
    if key in manual_by_title:
        return "manual", key
    if key in table_by_title:
        return "table", key
    if key in TITLE_ALIASES:
        return TITLE_ALIASES[key]
    options = []
    for candidate in table_by_title:
        options.append((difflib.SequenceMatcher(None, key, candidate).ratio(), "table", candidate))
    for candidate in manual_by_title:
        options.append((difflib.SequenceMatcher(None, key, candidate).ratio(), "manual", candidate))
    score, source, candidate = max(options)
    if score < 0.82:
        raise ValueError(f"No evidence match for {title!r}; best score was {score:.3f}")
    return source, candidate


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--scholar", type=Path, default=DATA / "scholar_citation_results.json")
    parser.add_argument("--manual", type=Path, default=DATA / "citation_manual_evidence.json")
    parser.add_argument("--as-of", default=date.today().isoformat())
    args = parser.parse_args()

    scholar = json.loads(args.scholar.read_text())
    manual = json.loads(args.manual.read_text())
    with (DATA / "citation_info.csv").open(newline="") as handle:
        existing = list(csv.DictReader(handle))

    table_by_title = defaultdict(list)
    for row in existing:
        table_by_title[normalized(row["Title"])].append(row)
    manual_by_title = {normalized(item["title"]): item for item in manual}

    output = []
    for citation in scholar:
        source, key = find_title(citation["title"], table_by_title, manual_by_title)
        if source == "manual":
            evidence = manual_by_title[key]
            source_rows = [
                {"Author": author, "Affiliation": affiliation, "Country": "", "Evidence URL": evidence["evidence_url"]}
                for author, affiliation in evidence["authors"]
            ]
        else:
            source_rows = table_by_title[key]

        for source_row in source_rows:
            canonical_author = AUTHOR_ALIASES.get(normalized(source_row["Author"]), source_row["Author"])
            for institution in institutions(source_row.get("Affiliation", "")):
                output.append({
                    "Cited paper": citation["cited_work"],
                    "Title": citation["title"],
                    "Author": source_row["Author"],
                    "Canonical Author": canonical_author,
                    "Affiliation": source_row.get("Affiliation", ""),
                    "Canonical Institution": institution,
                    "Country": source_row.get("Country", ""),
                    "Evidence URL": source_row.get("Evidence URL") or citation.get("paper_url") or citation.get("full_text_url") or citation["scholar_page"],
                    "Scholar ID": citation["scholar_id"],
                    "Scholar Page": citation["scholar_page"],
                })

    fields = list(output[0])
    unique_rows = {}
    for row in output:
        key = (
            row["Cited paper"],
            normalized(row["Title"]),
            normalized(row["Canonical Author"]),
            normalized(row["Canonical Institution"]),
            row["Scholar ID"],
        )
        current = unique_rows.get(key)
        if current is None or sum(character.islower() for character in row["Author"]) > sum(character.islower() for character in current["Author"]):
            unique_rows[key] = row
    output = sorted(unique_rows.values(), key=lambda row: (row["Cited paper"], normalized(row["Title"]), normalized(row["Canonical Author"]), normalized(row["Canonical Institution"])))
    with (DATA / "citation_info.csv").open("w", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields, lineterminator="\n")
        writer.writeheader()
        writer.writerows(output)

    authors = {normalized(row["Canonical Author"]) for row in output}
    affiliations = {normalized(row["Canonical Institution"]) for row in output}
    summary = {
        "as_of": args.as_of,
        "google_scholar_profile": "https://scholar.google.com/citations?user=clyZUqIAAAAJ&hl=en",
        "citation_results": len(scholar),
        "distinct_scholar_records": len({item["scholar_id"] for item in scholar}),
        "distinct_normalized_titles": len({normalized(item["title"]) for item in scholar}),
        "unique_researchers": len(authors),
        "unique_institutions": len(affiliations),
        "homepage_claim": "480+ researchers across 175+ institutions worldwide",
        "method": "Unique researchers use accent/case/punctuation normalization plus documented identity aliases. Institutions expand explicit multi-affiliation strings and apply documented organization aliases.",
    }
    (DATA / "citation_impact_summary.json").write_text(json.dumps(summary, indent=2) + "\n")
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
