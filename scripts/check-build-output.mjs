// Guard against injected content (gambling/malware links, foreign scripts, iframes) in the static build.
// Runs after `next build` (see ci-cd.yml) and fails the pipeline, so nothing unexpected is ever deployed.
//
// - Every external URL in the output must point to a host in ALLOWED_HOSTS. Adding a new external link to the
//   portfolio therefore needs a deliberate, reviewed change to this list.
// - Pages may only load scripts from this site; <iframe>, <object>, <embed>, <frame> and meta refresh are forbidden.
//
// Usage: node scripts/check-build-output.mjs [outDir]   (default: out)
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const OUT_DIR = process.argv[2] ?? "out";

const ALLOWED_HOSTS = new Set([
    // This site and standards referenced by sitemap/JSON-LD/SVG
    "portfolio.longvi.org",
    "schema.org",
    "www.sitemaps.org",
    "www.w3.org",
    // XML namespace declared inside an SVG logo (not a link)
    "www.inkscape.org",
    // Profile, contact and references
    "github.com",
    "www.facebook.com",
    "www.linkedin.com",
    "zalo.me",
    "www.google.com",
    "www.tiktok.com",
    "quanaibuilder.com",
    "verysell.ai",
    "thanglong.edu.vn",
    "vi.wikipedia.org",
    // Project and app store links
    "moanland.com",
    "vinfastreev.com",
    "uboardesg.vn",
    "uleadgen.net",
    "irdop.org",
    "play.google.com",
    "apps.apple.com",
    "www.youtube.com",
    // Technology homepages (tech-links.constants.ts)
    "alembic.sqlalchemy.org",
    "ant.design",
    "betterstack.com",
    "claude.com",
    "code.visualstudio.com",
    "core.telegram.org",
    "cursor.com",
    "developer.mozilla.org",
    "developer.wordpress.org",
    "developers.cloudflare.com",
    "developers.google.com",
    "docs.docker.com",
    "elevenlabs.io",
    "fastapi.tiangolo.com",
    "firebase.google.com",
    "flutter.dev",
    "frigate.video",
    "gemini.google",
    "git-scm.com",
    "goauthentik.io",
    "gofastmcp.com",
    "headscale.net",
    "jwt.io",
    "kafka.apache.org",
    "labs.google",
    "langfuse.com",
    "leafletjs.com",
    "maps.vietmap.vn",
    "mariadb.org",
    "min.io",
    "nestjs.com",
    "nextjs.org",
    "nginx.org",
    "nodejs.org",
    "nodered.org",
    "postgis.net",
    "react.dev",
    "reactnative.dev",
    "redis.io",
    "redux.js.org",
    "redux-toolkit.js.org",
    "sentry.io",
    "socket.io",
    "spring.io",
    "stomp-js.github.io",
    "tailscale.com",
    "tailwindcss.com",
    "typeorm.io",
    "www.adobe.com",
    "www.anthropic.com",
    "www.capcut.com",
    "www.cloudflare.com",
    "www.docker.com",
    "www.elastic.co",
    "www.figma.com",
    "www.java.com",
    "www.langchain.com",
    "www.litellm.ai",
    "www.microsoft365.com",
    "www.mongodb.com",
    "www.mysql.com",
    "www.php.net",
    "www.postgresql.org",
    "www.postman.com",
    "www.python.org",
    "www.sqlalchemy.org",
    "www.synology.com",
    "www.typescriptlang.org",
]);

const TEXT_EXTENSIONS = new Set([".html", ".txt", ".xml", ".json", ".webmanifest", ".js", ".css", ".svg"]);
// Matches absolute and protocol-relative URLs, also inside JSON-escaped strings (\/\/).
const URL_PATTERN = /(?:https?:)?(?:\/\/|\\\/\\\/)([a-z0-9.-]+\.[a-z]{2,})/gi;
const FORBIDDEN_TAGS = /<(iframe|object|embed|frame)\b/i;
const META_REFRESH = /<meta[^>]+http-equiv=["']?refresh/i;
const SCRIPT_SRC = /<script\b[^>]*\bsrc=["']([^"']+)["']/gi;

function listFiles(dir) {
    return readdirSync(dir).flatMap((name) => {
        const path = join(dir, name);
        return statSync(path).isDirectory() ? listFiles(path) : [path];
    });
}

// Hosts that only appear inside the framework's own bundles (comments, error docs) are not links on the page.
function isFrameworkBundle(file) {
    return file.includes(`${join("_next", "static")}`) && [".js", ".css"].includes(extname(file));
}

const problems = [];

for (const file of listFiles(OUT_DIR)) {
    const extension = extname(file);
    if (!TEXT_EXTENSIONS.has(extension) || isFrameworkBundle(file)) continue;
    const text = readFileSync(file, "utf8");
    const where = relative(OUT_DIR, file);

    for (const match of text.matchAll(URL_PATTERN)) {
        const host = match[1].toLowerCase();
        if (!ALLOWED_HOSTS.has(host)) problems.push(`${where}: link to unexpected host "${host}"`);
    }

    if (extension !== ".html") continue;
    if (FORBIDDEN_TAGS.test(text)) problems.push(`${where}: contains a forbidden embed tag (iframe/object/embed/frame)`);
    if (META_REFRESH.test(text)) problems.push(`${where}: contains a meta refresh redirect`);
    for (const match of text.matchAll(SCRIPT_SRC)) {
        const src = match[1];
        if (!src.startsWith("/") || src.startsWith("//")) problems.push(`${where}: loads an external script "${src}"`);
    }
}

const unique = [...new Set(problems)];
if (unique.length > 0) {
    console.error(`Build output check failed (${unique.length} problem(s)):`);
    unique.forEach((problem) => console.error(`  - ${problem}`));
    console.error("If a new external link is intended, add its host to ALLOWED_HOSTS in scripts/check-build-output.mjs.");
    process.exit(1);
}
process.stdout.write("Build output check passed: no unexpected hosts, external scripts or embeds.\n");
