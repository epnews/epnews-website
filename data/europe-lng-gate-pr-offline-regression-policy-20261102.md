# Gate LNG research: catch offline failures before merging

## Why this is needed

On November 2, the authenticated Gate research pipeline failed **after** a PR passed the general EP News publishing and article checks. Two failures were preventable offline:

- The empty-arrival status audit produced a Python integer zero where a `Decimal` was required.
- The cross-diagnostic consistency step used double shell continuation backslashes, dropping the `--report` argument.

The existing general PR checks do not execute the specialized Gate LNG research tests. As a result, passing a PR does **not** establish that the authenticated Gate pipeline will pass after merge.

## Change

Adds `.github/workflows/gate-offline-pr-regressions.yml`, triggered for pull requests touching Gate LNG research scripts or its workflow. It runs the same **18 existing offline research test scripts** as the authenticated main workflow and a new regression guard for double-backslash shell continuations.

- No GIE key, production token or external network request is needed.
- Uses `contents: read` only.
- The authenticated operator fetch and archived-source integrity steps still run separately on main, where secrets are available.
- The new check appears on matching PRs as **Gate LNG offline regression suite**. Configure it as a required branch-protection check after the workflow is verified; this PR does not claim to change repository branch protection.
- This is not a claim that live data, vessel discharges, SOI influence or economic benefit have been verified by offline tests.

The last authenticated workflow before this PR, [run 41434903639](https://github.com/epnews/epnews-website/actions/runs/41434903639), **succeeded** and uploaded its research artifact.

## Review

Confirm the new check appears and passes on this PR. After merge, verify the authenticated main workflow remains healthy. Future Gate LNG PRs should wait for the specialized regression check as well as the existing publishing and article checks before merging.
