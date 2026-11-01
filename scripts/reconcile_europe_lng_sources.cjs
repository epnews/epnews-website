#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
const eurostat={2025:{us:25.838331,ru:7.428523,total:74.763896},2026:{us:29.181938,ru:7.734844,total:71.913064}};
const nupi={2025:{us:41,ru:11,other:19,reportedUsShare:57,reportedRuShare:16},2026:{us:44,ru:13,other:13,reportedUsShare:62,reportedRuShare:19}};
const report={title:'EU27 Eurostat versus EEA Bruegel/NUPI LNG H1 2025-26 diagnostic',sources:{
 eurostat:'https://ec.europa.eu/eurostat/databrowser/view/nrg_ti_gasm/default/table?lang=en',
 eurostatArtifact:'https://github.com/epnews/epnews-website/actions/runs/41270962043',
 nupi:'https://www.geopol.no/en/content/download/32346/1270746/NUPI_Policy_Brief_15_Piria_Szulecki_Lentschig.pdf?version=4',
 euCouncil:'https://www.consilium.europa.eu/en/policies/united-states/'},
 definitions:{eurostat:'EU27_2020 monthly natural gas import statistics; G3200 LNG; MIO_M3; partner US/RU/TOTAL',nupi:'EEA external LNG inflows based on Bruegel, excluding Norway as indigenous EEA production; reported volumes rounded to whole bcm'},
 comparisons:[],externalCrossCheck:{year:2025,euCouncilUsLNGBcm:82.9,euCouncilUsLNGSharePct:'almost 58%',sourceFamily:'Council citing Bruegel',warning:'Annual 2025 figure is NOT an independent primary dataset or a H1 matched comparison; it corroborates a higher-magnitude Bruegel-style US flow series.'},
 status:'unreconciled',meterPolicy:'No supplier-dependence or geopolitical-influence needle activation from cross-source comparisons.'};
for(const year of [2025,2026]){
 const e=eurostat[year],n=nupi[year],nt=n.us+n.ru+n.other;
 const out={year,eu27Bcm:e,eeaRoundedBcm:n,eeaRoundedTotalBcm:nt,
  differenceBcm:{us:n.us-e.us,ru:n.ru-e.ru,total:nt-e.total},
  usShare:{eu27Pct:100*e.us/e.total,nupiReportedPct:n.reportedUsShare,gapPercentagePoints:n.reportedUsShare-100*e.us/e.total},
  ruShare:{eu27Pct:100*e.ru/e.total,nupiReportedPct:n.reportedRuShare,gapPercentagePoints:n.reportedRuShare-100*e.ru/e.total},
  warning:'NUPI volumes and shares rounded independently; differences are diagnostic, not precise reconciliations.'};
 assert(out.differenceBcm.us>10,'Expected major unresolved US numerator difference');
 report.comparisons.push(out);
}
fs.writeFileSync(process.argv[2]||'europe-lng-reconciliation-diagnostic.json',JSON.stringify(report,null,2)+'\n');
console.log('EU27/EEA diagnostic written: material US numerator mismatch; unresolved classification/coverage.');
