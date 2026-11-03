# Energy Institute 2026: 2025 energy dependence source audit

Source: uploaded `EI-Stats-Review-ALL-data.xlsx`, 2026 Statistical Review of World Energy. Sheet `Total Energy Supply (TES) -EJ`, columns BI (2024) and BJ (2025). US row 7, Russia row 62, China row 93, India row 95, European Union row 114. The source-defined European Union is used, not Total Europe.

The staged observations are **total energy supply in EJ**, not energy-import dependence percentages. The workbook also contains fuel-specific production, consumption and trade tables, but they do not by themselves establish a complete IEA-compatible energy balance. Before computing net imports divided by energy use, verify fuel coverage, imports and exports, stock changes, bunkers, transformation and differences in primary-energy accounting. Reconcile 2024 derived country values to the World Bank `EG.IMP.CONS.ZS` series and validate EU27 separately. Do not substitute an EI-based estimate for an official WDI observation without explicit labeling.

This PR deliberately does not change live needles, selectors, meter values, comparison tools or evidence panels. Missing 2025 energy-import-dependence values remain missing pending a complete, reproducible calculation.
