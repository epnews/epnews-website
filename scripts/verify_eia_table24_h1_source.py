#!/usr/bin/env python3
"""Independently verify national H1 coverage values against Table 24 PDF page headers."""
import hashlib,json,re,urllib.request
from pathlib import Path
import pdfplumber
DATA=Path('data/eia-h1-table24-monthly-coverage.json')
PAGE_MONTHS={2:['August','July','June'],3:['May','April','March'],4:['February','January']}
MONTH_NUM={'January':1,'February':2,'March':3,'April':4,'May':5,'June':6}
def parse_pdf(blob,year):
 rows={};proof=[]
 with pdfplumber.open(__import__('io').BytesIO(blob)) as doc:
  for page_num,months in PAGE_MONTHS.items():
   lines=(doc.pages[page_num-1].extract_text() or '').splitlines()
   header=' '.join(lines[:5])
   if not re.search(r'\b'+str(year)+r'\b',header):raise ValueError(f'{year} page {page_num}: year header absent')
   if not all(re.search(r'\b'+m+r'\b',header) for m in months):raise ValueError(f'{year} page {page_num}: month header mismatch: {header}')
   totals=[line for line in lines if re.match(r'^\s*Total\s+',line)]
   if len(totals)!=1:raise ValueError(f'{year} page {page_num}: expected 1 national Total row; got {len(totals)}')
   tokens=totals[0].split()
   if len(tokens)!=10:raise ValueError(f'{year} page {page_num}: expected nine sector values; got {tokens}')
   for i,month in enumerate(months):
    if month not in MONTH_NUM:continue
    vals=tokens[1+i*3:4+i*3]
    if not all(re.fullmatch(r'\d{1,3}\.\d',v) for v in vals):raise ValueError(f'{year} {month}: nonnumeric/revised value {vals}')
    rows[MONTH_NUM[month]]={'residential':float(vals[0]),'commercial':float(vals[1]),'industrial':float(vals[2])}
    proof.append({'month':f'{year}-{MONTH_NUM[month]:02d}','pdfPage':page_num,'header':header[:250],'nationalTotalRow':totals[0]})
 if sorted(rows)!=list(range(1,7)):raise ValueError(f'{year}: missing months {sorted(rows)}')
 return rows,proof
def verify(data,raw):
 proofs=[]
 for year in ('2025','2026'):
  rows,proof=parse_pdf(raw[year],year)
  for sector in ('residential','industrial'):
   expected=data['sectors'][sector][year]
   actual=[rows[m][sector] for m in range(1,7)]
   if actual!=expected:raise ValueError(f'{year} {sector}: source={actual}, committed={expected}')
  proofs.extend(proof)
 return proofs
def main():
 data=json.loads(DATA.read_text())
 raw={}
 for year,url in data['sources'].items():
  with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'EPNews-source-verification/1.0'}),timeout=60) as response:raw[year]=response.read()
 proof=verify(data,raw)
 result={'status':'SOURCE_PDF_MONTHLY_VERIFIED','sourceSha256':{y:hashlib.sha256(b).hexdigest() for y,b in raw.items()},'matchedMonthlyRows':len(proof),'sourceEvidence':proof,'actualConsumerExpenditureUsd':None,'lngCausedDomesticCostUsd':None,'netNationalBenefitUsd':None,'geopoliticalInfluenceScore':None}
 Path('eia-table24-h1-independent-verification.json').write_text(json.dumps(result,indent=2)+'\n')
 print('Verified',len(proof),'national monthly rows across 2025 and 2026; residential and industrial matched.')
if __name__=='__main__':main()
