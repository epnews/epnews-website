#!/usr/bin/env python3
"""Acquire EIA NGM Table 24 and gate onsystem sales coverage reconciliation.

No percentages are fabricated: extracted candidate rows require explicit review.
"""
import hashlib,json,re,urllib.request
from pathlib import Path
URL='https://www.eia.gov/naturalgas/monthly/pdf/table_24.pdf'
MONTHS=[f'{y}-{m:02d}' for y in (2025,2026) for m in range(1,7)]
def main():
 out={'source':URL,'table':'NGM Table 24','months':MONTHS,'rawPdfSha256':None,'nationalCoveragePct':{},'candidateUnitedStatesLines':[],'complete':False,'reviewStatus':'NOT_VERIFIED','onsystemGrossSalesValueUsd':None,'lngCausedCostUsd':None,'netNationalBenefitUsd':None,'geopoliticalInfluenceScore':None,'errors':[]}
 try:
  import pdfplumber
  with urllib.request.urlopen(urllib.request.Request(URL,headers={'User-Agent':'EPNews-evidence-audit/1.0'}),timeout=60) as r:raw=r.read()
  out['rawPdfSha256']=hashlib.sha256(raw).hexdigest()
  Path('eia-table24-source.pdf').write_bytes(raw)
  with pdfplumber.open('eia-table24-source.pdf') as doc:
   for idx,page in enumerate(doc.pages):
    txt=page.extract_text() or ''
    for line in txt.splitlines():
     if re.search(r'\b(?:U\.S\.|United States|Total U\.S\.)\b',line,re.I):
      out['candidateUnitedStatesLines'].append({'pdfPage':idx+1,'line':line[:400]})
  # PDF's multi-column month/year headers need verified association.
  # Never guess from row order, nor substitute a national figure with a state figure.
  out['errors'].append('National monthly coverage mapping requires independent header-to-row verification; no sales values released.')
 except Exception as e:out['errors'].append(repr(e))
 Path('eia-table24-coverage-audit.json').write_text(json.dumps(out,indent=2)+'\n')
 print(json.dumps({'pdfSha256':out['rawPdfSha256'],'candidateLines':len(out['candidateUnitedStatesLines']),'errors':out['errors']},indent=2))
 if not out['rawPdfSha256']:raise SystemExit(2)
if __name__=='__main__':main()
