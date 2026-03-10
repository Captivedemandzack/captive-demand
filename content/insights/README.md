# Insights Content

```
TO ADD A NEW INSIGHT POST:
1. Create a new .md or .mdx file in /content/insights/
2. Use the frontmatter template below — all fields required except `tags`
3. Set featured: true for only 1-2 posts at a time (these appear in the hero carousel)
4. The slug must match the filename (e.g. local-seo-2025.md → slug: "local-seo-2025")
5. Save the file — it appears automatically in the archive and feeds

TO ADD A NEW CASE STUDY: (separate system — do NOT put in /content/insights/)
→ Use the existing case study content system in /src/data/case-studies.ts
```

## Frontmatter Template

```yaml
---
title: "Your Post Title"
slug: "your-post-slug"
excerpt: "A short description for cards and SEO."
category: "SEO/AEO"  # One of: SEO/AEO | Website Design | Email Marketing | Marketing Automation | Strategy | Industry Insights
author:
  name: "Spencer Donaldson"
  title: "Founder, Captive Demand"
  avatar: "/images/team/spencer.jpg"
publishedAt: "2025-02-15"
readTime: 6
featured: true
coverImage: "/images/insights/cover.jpg"
tags:
  - "SEO"
  - "Local Search"
---
```
