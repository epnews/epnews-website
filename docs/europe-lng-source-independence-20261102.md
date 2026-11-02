# LNG cargo source independence screening

The executable audit accepts manually collected case records with a `sources` array of `{type,url}`. It flags cases containing both a terminal-discharge source and a vessel-tracking source on different hostnames for **human independence review**, not verification. Different hostnames can syndicate the same underlying feed, and matching vessel identity requires actual IMO, chronology, load/transshipment, discharge quantity and source methodology checks. Public records may be incomplete.

No live cargo source is fetched by this milestone; there are no verified arrivals or physical-origin assertions. Preserve missing fields as unknown and do not turn reported US/NSP partner-label shifts into influence scores. SOI audit stays 20/30, meter readiness 53%. No command-meter UI changes.
