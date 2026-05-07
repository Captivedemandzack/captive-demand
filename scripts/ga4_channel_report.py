#!/usr/bin/env python3
"""
GA4 Data API: OAuth desktop flow + launch-focused performance snapshot.

Pulls metrics that help tell a "what changed after the new site shipped" story:
period-over-period totals, engagement quality, channel mix, and top landing
pages (last 30 days vs the prior 30 days).

Install:

    pip install google-analytics-data google-auth-oauthlib google-auth

Run:

    python scripts/ga4_channel_report.py

Optional property override:

    GA4_PROPERTY_ID=426558326 python scripts/ga4_channel_report.py

Credentials: `oauth_credentials.json` and `token.json` in the repo root.
"""

from __future__ import annotations

import os
import sys
from pathlib import Path

from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import DateRange, Dimension, Metric, OrderBy, RunReportRequest
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ("https://www.googleapis.com/auth/analytics.readonly",)

PROPERTY_ID = os.environ.get("GA4_PROPERTY_ID", "530574976")

ROOT = Path(__file__).resolve().parent.parent
OAUTH_SECRETS = ROOT / "oauth_credentials.json"
TOKEN_PATH = ROOT / "token.json"

# GA4 relative windows: compare last 30 days to the 30 days before that
CURRENT_RANGE = ("30daysAgo", "today")
PRIOR_RANGE = ("60daysAgo", "31daysAgo")

SUMMARY_METRICS = (
    "sessions",
    "totalUsers",
    "newUsers",
    "engagedSessions",
    "engagementRate",
    "averageSessionDuration",
    "conversions",
    "screenPageViews",
)


def load_credentials() -> Credentials:
    if not OAUTH_SECRETS.is_file():
        raise FileNotFoundError(
            f"Missing OAuth client file: {OAUTH_SECRETS}\n"
            "Download Desktop client JSON from Google Cloud Console and save it there.",
        )

    creds: Credentials | None = None
    if TOKEN_PATH.is_file():
        creds = Credentials.from_authorized_user_file(str(TOKEN_PATH), SCOPES)

    if creds and creds.valid:
        return creds

    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
        TOKEN_PATH.write_text(creds.to_json(), encoding="utf-8")
        return creds

    flow = InstalledAppFlow.from_client_secrets_file(str(OAUTH_SECRETS), SCOPES)
    creds = flow.run_local_server(port=0)
    TOKEN_PATH.write_text(creds.to_json(), encoding="utf-8")
    print(f"Saved refreshed credentials to {TOKEN_PATH}", file=sys.stderr)
    return creds


def _parse_float(s: str) -> float:
    try:
        return float(s)
    except (TypeError, ValueError):
        return 0.0


def _fmt_duration_seconds(s: str) -> str:
    sec = _parse_float(s)
    if sec <= 0:
        return "0:00"
    m = int(sec // 60)
    r = int(round(sec % 60))
    return f"{m}:{r:02d}"


def _pct_change(prior: float, current: float) -> str:
    if prior <= 0:
        return "n/a (prior was 0)"
    return f"{((current - prior) / prior) * 100:+.1f}%"


def fetch_aggregate_metrics(
    client: BetaAnalyticsDataClient,
    start: str,
    end: str,
    metrics: tuple[str, ...],
) -> dict[str, str]:
    req = RunReportRequest(
        property=f"properties/{PROPERTY_ID}",
        metrics=[Metric(name=m) for m in metrics],
        date_ranges=[DateRange(start_date=start, end_date=end)],
    )
    resp = client.run_report(req)
    if not resp.rows:
        return {m: "0" for m in metrics}
    row = resp.rows[0]
    out: dict[str, str] = {}
    for i, h in enumerate(resp.metric_headers):
        out[h.name] = row.metric_values[i].value
    return out


def print_table(title: str, headers: list[str], rows: list[list[str]]) -> None:
    print(f"\n{'─' * 72}")
    print(title)
    print(f"{'─' * 72}")
    if not rows:
        print("(No rows)")
        return
    col_widths = [len(h) for h in headers]
    for r in rows:
        for i, cell in enumerate(r):
            col_widths[i] = max(col_widths[i], len(cell))

    def fmt(cells: list[str]) -> str:
        return "  ".join(cells[i].ljust(col_widths[i]) for i in range(len(cells)))

    print(fmt(headers))
    print(fmt(["-" * w for w in col_widths]))
    for r in rows:
        print(fmt(r))


def run_launch_snapshot(client: BetaAnalyticsDataClient) -> None:
    print()
    print("=" * 72)
    print(f"GA4 Property {PROPERTY_ID} · Launch narrative snapshot")
    print("(Site performance: last 30 days vs prior 30 days, plus landing pages)")
    print("=" * 72)
    print()
    print("Windows:")
    print(f"  Current period:  {CURRENT_RANGE[0]} → {CURRENT_RANGE[1]} (last ~30 days)")
    print(f"  Prior period:    {PRIOR_RANGE[0]} → {PRIOR_RANGE[1]} (previous ~30 days)")
    print()
    print("Tip: Align the site launch date with these windows in your deck. If the")
    print("launch landed mid-window, shorten or customize ranges in this script.")

    prior = fetch_aggregate_metrics(client, PRIOR_RANGE[0], PRIOR_RANGE[1], SUMMARY_METRICS)
    curr = fetch_aggregate_metrics(client, CURRENT_RANGE[0], CURRENT_RANGE[1], SUMMARY_METRICS)

    summary_rows: list[list[str]] = []
    labels = {
        "sessions": "Sessions",
        "totalUsers": "Total users",
        "newUsers": "New users",
        "engagedSessions": "Engaged sessions",
        "engagementRate": "Engagement rate",
        "averageSessionDuration": "Avg session duration",
        "conversions": "Conversions (all key events)",
        "screenPageViews": "Screen / page views",
    }

    for key in SUMMARY_METRICS:
        p_raw = prior.get(key, "0")
        c_raw = curr.get(key, "0")
        p_f = _parse_float(p_raw)
        c_f = _parse_float(c_raw)

        if key == "engagementRate":
            p_disp = f"{p_f * 100:.1f}%" if p_f <= 1 else f"{p_f:.1f}%"
            c_disp = f"{c_f * 100:.1f}%" if c_f <= 1 else f"{c_f:.1f}%"
            delta = _pct_change(p_f, c_f)
        elif key == "averageSessionDuration":
            p_disp = _fmt_duration_seconds(p_raw)
            c_disp = _fmt_duration_seconds(c_raw)
            delta = _pct_change(p_f, c_f)
        else:
            p_disp = str(int(round(p_f))) if p_f == int(p_f) else f"{p_f:.1f}"
            c_disp = str(int(round(c_f))) if c_f == int(c_f) else f"{c_f:.1f}"
            delta = _pct_change(p_f, c_f)

        summary_rows.append([labels[key], p_disp, c_disp, delta])

    print_table(
        "HEADLINE METRICS (period vs period)",
        ["Metric", "Prior 30d", "Last 30d", "Change"],
        summary_rows,
    )

    # Channel breakdown (current period only)
    ch_req = RunReportRequest(
        property=f"properties/{PROPERTY_ID}",
        dimensions=[Dimension(name="sessionDefaultChannelGroup")],
        metrics=[
            Metric(name="sessions"),
            Metric(name="totalUsers"),
            Metric(name="engagedSessions"),
            Metric(name="engagementRate"),
        ],
        date_ranges=[DateRange(start_date=CURRENT_RANGE[0], end_date=CURRENT_RANGE[1])],
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="sessions"), desc=True)],
        limit=50,
    )
    ch_resp = client.run_report(ch_req)
    ch_rows: list[list[str]] = []
    for row in ch_resp.rows:
        ch = row.dimension_values[0].value
        s = row.metric_values[0].value
        u = row.metric_values[1].value
        es = row.metric_values[2].value
        er = _parse_float(row.metric_values[3].value)
        er_disp = f"{er * 100:.1f}%" if er <= 1 else f"{er:.1f}%"
        ch_rows.append([ch, s, u, es, er_disp])

    print_table(
        "ACQUISITION · Default channel group (last 30 days, sorted by sessions)",
        ["Channel", "Sessions", "Users", "Engaged sess.", "Engagement rate"],
        ch_rows,
    )

    # Top landing pages: where sessions started (good for homepage vs deeper LP story)
    lp_req = RunReportRequest(
        property=f"properties/{PROPERTY_ID}",
        dimensions=[Dimension(name="landingPagePlusQueryString")],
        metrics=[
            Metric(name="sessions"),
            Metric(name="totalUsers"),
            Metric(name="engagedSessions"),
            Metric(name="engagementRate"),
            Metric(name="averageSessionDuration"),
        ],
        date_ranges=[DateRange(start_date=CURRENT_RANGE[0], end_date=CURRENT_RANGE[1])],
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="sessions"), desc=True)],
        limit=15,
    )
    lp_resp = client.run_report(lp_req)
    lp_rows: list[list[str]] = []
    for row in lp_resp.rows:
        page = row.dimension_values[0].value or "(not set)"
        if len(page) > 52:
            page = page[:49] + "..."
        s = row.metric_values[0].value
        u = row.metric_values[1].value
        es = row.metric_values[2].value
        er = _parse_float(row.metric_values[3].value)
        er_disp = f"{er * 100:.1f}%" if er <= 1 else f"{er:.1f}%"
        dur = _fmt_duration_seconds(row.metric_values[4].value)
        lp_rows.append([page, s, u, es, er_disp, dur])

    print_table(
        "TOP LANDING PAGES (session starts · last 30 days)",
        ["Landing page", "Sessions", "Users", "Engaged sess.", "Engage rate", "Avg sess."],
        lp_rows,
    )

    print()
    print("─" * 72)
    print("How to use this for Agentis:")
    print("  • Lead with HEADLINE METRICS change column after aligning dates to go-live.")
    print("  • Use CHANNEL rows to show whether quality traffic held or shifted.")
    print("  • Use LANDING PAGES to show homepage vs key LPs owning session starts.")
    print("  • Conversions = GA4 key events; ensure critical events are marked in GA4.")
    print()


def main() -> None:
    creds = load_credentials()
    client = BetaAnalyticsDataClient(credentials=creds)
    run_launch_snapshot(client)


if __name__ == "__main__":
    main()
