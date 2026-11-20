import { buildLlmsTxt } from "@/features/portfolio/services/llms.service";
import { getSiteUrl } from "@/shared/utils/site-url.util";

export const dynamic = "force-static";

export async function GET() {
    const body = await buildLlmsTxt(getSiteUrl());

    return new Response(body, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
}
