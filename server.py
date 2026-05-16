from __future__ import annotations

import re
import time
import xml.etree.ElementTree as ET
from pathlib import Path

import urllib.request
from flask import Flask, jsonify, send_from_directory

ROOT = Path(__file__).resolve().parent
CACHE_TTL = 300

HERO_VIDEOS = {
    "thekareka": "",
    "karekasatoru": "",
}

# Curated long-form videos used as fallback when RSS doesn't return enough.
# These are verified non-Shorts from the channel, with real titles.
FALLBACK_VIDEOS: dict[str, list[dict]] = {
    "thekareka": [
        {"id": "peRtYl7L5RU", "title": "\u062f\u062e\u0644\u062a \u0644\u0639\u0628\u0629 \u0639\u0627\u062f\u064a\u0629\u2026 \u0644\u0642\u064a\u062a \u0646\u0641\u0633\u064a \u0641\u064a \u062d\u0631\u0628 \u0631\u0648\u0628\u0648\u062a\u0627\u062a \u0645\u0631\u0639\u0628\u0629 \ud83e\udd16\ud83d\udca5", "url": "https://www.youtube.com/watch?v=peRtYl7L5RU", "thumbnail": "https://i.ytimg.com/vi/peRtYl7L5RU/maxresdefault.jpg"},
        {"id": "Z2tr1IaLR1E", "title": "\u0627\u063a\u0628\u0649 \u0646\u0627\u0633 \u0628\u062a\u0644\u0639\u0628 \u0641\u0627\u0644\u0648\u0631\u0627\u0646\u062a", "url": "https://www.youtube.com/watch?v=Z2tr1IaLR1E", "thumbnail": "https://i.ytimg.com/vi/Z2tr1IaLR1E/maxresdefault.jpg"},
        {"id": "PAP6xV_MPBA", "title": "\u0627\u0644\u062c\u064a\u0644 \u0627\u0644\u062c\u062f\u064a\u062f \u0645\u0646 \u0627\u0644\u062c\u064a\u0645\u0631\u0632 \u0628\u0642\u0649 \u063a\u0631\u064a\u0628\u2026 \u0648\u0625\u062d\u0646\u0627 \u0627\u0644\u0633\u0628\u0628", "url": "https://www.youtube.com/watch?v=PAP6xV_MPBA", "thumbnail": "https://i.ytimg.com/vi/PAP6xV_MPBA/maxresdefault.jpg"},
        {"id": "xkBNTgQzCuY", "title": "\u0643\u0646\u062a \u0641\u0627\u0643\u0631 \u0646\u0641\u0633\u064a \u062c\u0627\u0645\u062f\u2026 \u0644\u062d\u062f \u0645\u0627 \u0642\u0627\u0628\u0644\u062a\u0647", "url": "https://www.youtube.com/watch?v=xkBNTgQzCuY", "thumbnail": "https://i.ytimg.com/vi/xkBNTgQzCuY/maxresdefault.jpg"},
        {"id": "W1rJ6EvDWU4", "title": "\u0625\u0632\u0627\u064a \u0644\u0639\u0628\u0629 \u0645\u0631\u0628\u0639\u0627\u062a \u0645\u0646 \u063a\u064a\u0631 \u0642\u0635\u0629 \u0643\u0633\u0631\u062a \u064a\u0648\u062a\u064a\u0648\u0628 \u0643\u0644\u0647\u061f | \u062d\u0643\u0627\u064a\u0629 \u0645\u0627\u064a\u0646 \u0643\u0631\u0627\u0641\u062a", "url": "https://www.youtube.com/watch?v=W1rJ6EvDWU4", "thumbnail": "https://i.ytimg.com/vi/W1rJ6EvDWU4/maxresdefault.jpg"},
        {"id": "_ht2MguU9k4", "title": "\u0644\u0648 \u0645\u0644\u0639\u0628\u062a\u0634 Bloodborne\u2026 \u0639\u0645\u0631\u0643 \u0645\u0627 \u0644\u0639\u0628\u062a Souls \u0628\u062c\u062f", "url": "https://www.youtube.com/watch?v=_ht2MguU9k4", "thumbnail": "https://i.ytimg.com/vi/_ht2MguU9k4/maxresdefault.jpg"},
        {"id": "HHEPs5pLJn4", "title": "\u0644\u064a\u0647 \u0643\u0644 \u0623\u0644\u0639\u0627\u0628 \u0627\u0644\u0633\u0648\u0628\u0631 \u0647\u064a\u0631\u0648 \u0628\u062a\u062e\u0633\u0631 \u0642\u062f\u0627\u0645 \u0628\u0627\u062a\u0645\u0627\u0646 \u0623\u0631\u0643\u0627\u0645 \u0644\u062d\u062f \u062f\u0644\u0648\u0642\u062a\u064a\u061f", "url": "https://www.youtube.com/watch?v=HHEPs5pLJn4", "thumbnail": "https://i.ytimg.com/vi/HHEPs5pLJn4/maxresdefault.jpg"},
        {"id": "2JOafyezhMc", "title": "\u0623\u0642\u0633\u0649 \u0645\u0639\u0627\u0631\u0643 \u062d\u064a\u0627\u062a\u064a \u0645\u0639 \u0632\u0639\u0645\u0627\u0621 \u0627\u0644\u0623\u0644\u0639\u0627\u0628\u2026 \u062f\u0648\u0644 \u0645\u0633\u062a\u062d\u064a\u0644 \u064a\u062a\u0643\u0631\u0631\u0648\u0627", "url": "https://www.youtube.com/watch?v=2JOafyezhMc", "thumbnail": "https://i.ytimg.com/vi/2JOafyezhMc/maxresdefault.jpg"},
        {"id": "rrOYvNtF-fI", "title": "\u062a\u0623\u062c\u064a\u0644 GTA VI\u2026 \u0623\u0643\u0628\u0631 \u062e\u0627\u0632\u0648\u0642 \u0623\u062e\u062f\u062a\u0647 \u0628\u0639\u062f \u0634\u0631\u0627\u0626\u064a \u0644\u0644PS5 \u0628\u064a\u0648\u0645!", "url": "https://www.youtube.com/watch?v=rrOYvNtF-fI", "thumbnail": "https://i.ytimg.com/vi/rrOYvNtF-fI/maxresdefault.jpg"},
        {"id": "mbP5Csxj-cM", "title": "\u0627\u0644\u0644\u0639\u0628\u0629 \u0627\u0644\u0644\u064a \u0643\u0633\u0631\u062a \u0642\u0648\u0627\u0639\u062f \u0627\u0644\u062a\u0627\u0631\u064a\u062e\u2026 Expedition 33 \ud83d\udd25", "url": "https://www.youtube.com/watch?v=mbP5Csxj-cM", "thumbnail": "https://i.ytimg.com/vi/mbP5Csxj-cM/maxresdefault.jpg"},
    ],
    "karekasatoru": [
        {"id": "BNEz68H3jJE", "title": "استقبال اللاجئين على طريقة المهندس لويد فرونتيرا", "url": "https://www.youtube.com/watch?v=BNEz68H3jJE", "thumbnail": "https://i.ytimg.com/vi/BNEz68H3jJE/maxresdefault.jpg"},
        {"id": "yt7Y13_3WNo", "title": "ما في راحة كله شغل مع المهندس لويد فرونتيرا", "url": "https://www.youtube.com/watch?v=yt7Y13_3WNo", "thumbnail": "https://i.ytimg.com/vi/yt7Y13_3WNo/maxresdefault.jpg"},
        {"id": "kDMxNaL69QQ", "title": "لما تاخد فيزا رئيس شركة امازون وتصرف براحتك", "url": "https://www.youtube.com/watch?v=kDMxNaL69QQ", "thumbnail": "https://i.ytimg.com/vi/kDMxNaL69QQ/maxresdefault.jpg"},
        {"id": "U9P0VbDAw9o", "title": "قصة احقر انسان في العالم || ملخص قصة لويد الموسم الثاني الحلقة الثامنة #8", "url": "https://www.youtube.com/watch?v=U9P0VbDAw9o", "thumbnail": "https://i.ytimg.com/vi/U9P0VbDAw9o/maxresdefault.jpg"},
        {"id": "PgQD-MiTnuw", "title": "لويد فرونتيرا حبيب الشعب", "url": "https://www.youtube.com/watch?v=PgQD-MiTnuw", "thumbnail": "https://i.ytimg.com/vi/PgQD-MiTnuw/maxresdefault.jpg"},
        {"id": "IzH5GDPsZ8E", "title": "لما تتعامل مع اسوأ نظام في العالم", "url": "https://www.youtube.com/watch?v=IzH5GDPsZ8E", "thumbnail": "https://i.ytimg.com/vi/IzH5GDPsZ8E/maxresdefault.jpg"},
        {"id": "GbzX5CRZW10", "title": "قصة احقر انسان في العالم || ملخص قصة لويد الموسم الثاني الحلقة السابعة #7", "url": "https://www.youtube.com/watch?v=GbzX5CRZW10", "thumbnail": "https://i.ytimg.com/vi/GbzX5CRZW10/maxresdefault.jpg"},
        {"id": "E3eObsw_DoE", "title": "لما توصل صعبها على غيرك", "url": "https://www.youtube.com/watch?v=E3eObsw_DoE", "thumbnail": "https://i.ytimg.com/vi/E3eObsw_DoE/maxresdefault.jpg"},
    ],
}

SOCIAL_LINKS = {
    "instagram": "https://www.instagram.com/thekareka/",
    "tiktok": "https://www.tiktok.com/@thekareka0",
    "youtube": "https://www.youtube.com/@TheKareka",
    "discord": "https://discord.com/invite/kgang",
    "twitch": "https://www.twitch.tv/thekareka",
}

CHANNELS = {
    "thekareka": {
        "id": "thekareka",
        "channel_id": "UCOfka052EuDSTxWGeTOM8oQ",
        "handle": "TheKareka",
        "name": "The Kareka",
        "name_ar": "ذا كاريكا",
        "url": "https://www.youtube.com/@TheKareka",
        "accent": "blue",
        "subscriber_goal": 1_000_000,
        "fallback_subscribers": 412000,
        "fallback_views": 64570000,
        "video_count": 335,
        "description_en": "Gamer · Otaku. Epic gaming moments & entertainment.",
        "description_ar": "جيمر · أوتاكو. لحظات جيمنج ملحمية ومحتوى ترفيهي.",
        "avatar": "https://yt3.googleusercontent.com/EDKRP6VYsL_hVmPGKZUfrs-0LJms_NM71VC65pE92zqri9mBaDrATRsoViNK3x9lLvIzdqyJUA=s176-c-k-c0x00ffffff-no-rj",
    },
    "karekasatoru": {
        "id": "karekasatoru",
        "channel_id": "UCtwnm5j8DrDd6MWW2J1GZMg",
        "handle": "KarekaSatoru",
        "name": "Kareka Satoru",
        "name_ar": "كاريكا ساتورو",
        "url": "https://www.youtube.com/@KarekaSatoru",
        "accent": "red",
        "subscriber_goal": 100_000,
        "fallback_subscribers": 83300,
        "fallback_views": 6350000,
        "video_count": 80,
        "description_en": "Anime summaries, stories & otaku entertainment.",
        "description_ar": "ملخصات أنمي وقصص ومحتوى أوتاكو ترفيهي.",
        "avatar": "https://yt3.googleusercontent.com/WMYli36-Nogc3LgQHgaZFCzkj4jILZ8Y2uwL4gdoYN5OOwM-SDV_vZcZB9fenI_-1E7td-4ixA=s176-c-k-c0x00ffffff-no-rj",
    },
}

_stats_cache: dict[str, dict] = {}
_videos_cache: dict[str, tuple[float, list]] = {}


def _fetch_url(url: str) -> str:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            )
        },
    )
    with urllib.request.urlopen(req, timeout=20) as resp:
        return resp.read().decode("utf-8", "ignore")


def parse_subscriber_count(text: str | None) -> int | None:
    if not text:
        return None
    text = text.strip().lower().replace(",", "").replace(" ", "")
    mult = 1
    if text.endswith("k"):
        mult = 1_000
        text = text[:-1]
    elif text.endswith("m"):
        mult = 1_000_000
        text = text[:-1]
    elif text.endswith("b"):
        mult = 1_000_000_000
        text = text[:-1]
    try:
        return int(float(text) * mult)
    except ValueError:
        return None


def scrape_channel_stats(channel_id: str) -> dict:
    now = time.time()
    cached = _stats_cache.get(channel_id)
    if cached and now - cached.get("_ts", 0) < CACHE_TTL:
        return cached

    subscribers = None
    views = None
    try:
        html = _fetch_url(f"https://www.youtube.com/channel/{channel_id}")
        sub_match = re.search(
            r'"subscriberCountText":\{"simpleText":"([^"]+)"', html
        )
        if not sub_match:
            sub_match = re.search(
                r'"subscriberCountText":\{"accessibility"[^}]*\},"simpleText":"([^"]+)"',
                html,
            )
        if sub_match:
            subscribers = parse_subscriber_count(sub_match.group(1))

        view_match = re.search(r'"viewCountText":\{"simpleText":"([^"]+)"', html)
        if view_match:
            views_text = view_match.group(1).replace(" views", "").replace(" مشاهدة", "")
            views = parse_subscriber_count(views_text.replace(",", ""))
    except Exception:
        pass

    result = {
        "channel_id": channel_id,
        "subscribers": subscribers,
        "views": views,
        "_ts": now,
    }
    _stats_cache[channel_id] = result
    return result


MIN_LONG_VIDEO_SEC = 61
FEATURED_VIDEO_COUNT = 8
RSS_SCAN_LIMIT = 50  # YouTube RSS only provides up to 15 entries typically


def _is_long_form_video(entry, ns: dict) -> bool:
    title_el = entry.find("a:title", ns)
    title = (title_el.text or "").lower() if title_el is not None else ""
    # Reject if title explicitly marks it as a Short
    if "#short" in title or "#shorts" in title or " #short " in f" {title} ":
        return False

    link_el = entry.find("a:link", ns)
    if link_el is not None:
        href = (link_el.attrib.get("href") or "").lower()
        # Reject if the URL path contains /shorts/
        if "/shorts/" in href:
            return False

    group = entry.find("media:group", ns)
    if group is not None:
        dur_el = group.find("yt:duration", ns)
        if dur_el is not None:
            try:
                seconds = int(dur_el.attrib.get("seconds", 0))
            except ValueError:
                seconds = 0
            # Only reject if duration is explicitly known to be < 61s
            # If seconds == 0 it means duration is unknown -> treat as long-form
            if 0 < seconds < MIN_LONG_VIDEO_SEC:
                return False
    return True


def fetch_rss_videos(channel_id: str, limit: int = FEATURED_VIDEO_COUNT) -> list[dict]:
    now = time.time()
    cached = _videos_cache.get(channel_id)
    if cached and now - cached[0] < CACHE_TTL:
        return cached[1]

    videos: list[dict] = []
    try:
        url = f"https://www.youtube.com/feeds/videos.xml?channel_id={channel_id}"
        raw = _fetch_url(url)
        root = ET.fromstring(raw)
        ns = {
            "a": "http://www.w3.org/2005/Atom",
            "yt": "http://www.youtube.com/xml/schemas/2015",
            "media": "http://search.yahoo.com/mrss/",
        }
        for entry in root.findall("a:entry", ns)[:RSS_SCAN_LIMIT]:
            if not _is_long_form_video(entry, ns):
                continue
            vid_el = entry.find("yt:videoId", ns)
            title_el = entry.find("a:title", ns)
            link_el = entry.find("a:link", ns)
            if vid_el is None or title_el is None:
                continue
            vid = vid_el.text or ""
            watch_url = f"https://www.youtube.com/watch?v={vid}"
            videos.append(
                {
                    "id": vid,
                    "title": title_el.text or "",
                    "url": watch_url,
                    "thumbnail": f"https://i.ytimg.com/vi/{vid}/maxresdefault.jpg",
                }
            )
            if len(videos) >= limit:
                break
    except Exception:
        pass

    _videos_cache[channel_id] = (now, videos)
    return videos


def resolve_hero_video(channel_key: str, rss_videos: list[dict]) -> str | None:
    custom = HERO_VIDEOS.get(channel_key, "").strip()
    if custom:
        return custom
    if rss_videos:
        return rss_videos[0]["id"]
    return None


def _fill_videos_with_fallback(rss_videos: list[dict], key: str) -> list[dict]:
    """Top-up rss_videos with FALLBACK_VIDEOS until we have FEATURED_VIDEO_COUNT."""
    if len(rss_videos) >= FEATURED_VIDEO_COUNT:
        return rss_videos
    seen_ids = {v["id"] for v in rss_videos}
    result = list(rss_videos)
    for fv in FALLBACK_VIDEOS.get(key, []):
        if fv["id"] not in seen_ids and len(result) < FEATURED_VIDEO_COUNT:
            result.append(fv)
            seen_ids.add(fv["id"])
    return result


def build_channel_payload(key: str) -> dict:
    ch = CHANNELS[key]
    live = scrape_channel_stats(ch["channel_id"])
    rss_videos = fetch_rss_videos(ch["channel_id"])
    videos = _fill_videos_with_fallback(rss_videos, key)
    hero_video = resolve_hero_video(key, videos)

    return {
        **ch,
        "subscribers": live.get("subscribers") or ch["fallback_subscribers"],
        "views": live.get("views") or ch["fallback_views"],
        "videos": videos,
        "hero_video": hero_video,
        "updated_at": int(time.time()),
    }


app = Flask(__name__, static_folder="static", static_url_path="/static")

@app.after_request
def add_security_headers(response):
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    # Content-Security-Policy setup to allow necessary resources while restricting malicious ones
    response.headers['Content-Security-Policy'] = "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval';"
    return response


@app.route("/favicon.ico")
def favicon():
    return send_from_directory(ROOT / "static" / "images", "favicon.ico")


@app.route("/")
def index():
    return send_from_directory(ROOT, "index.html")


@app.route("/api/channels")
def api_channels():
    return jsonify(
        {
            "channels": [build_channel_payload(k) for k in CHANNELS],
            "social": SOCIAL_LINKS,
            "contact": "starstart195@gmail.com",
        }
    )


@app.route("/api/channel/<channel_key>")
def api_channel(channel_key: str):
    if channel_key not in CHANNELS:
        return jsonify({"error": "not found"}), 404
    return jsonify(build_channel_payload(channel_key))


@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    print("Kareka Portfolio: http://127.0.0.1:5000")
    # debug=False for security
    app.run(host="127.0.0.1", port=5000, debug=False)
