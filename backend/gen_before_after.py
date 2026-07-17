"""One-shot script to generate before/after patient reference images for the
Results section of Manasa Skin Clinic. Uses Emergent LLM key + Gemini
Nano Banana. Saves PNGs to /app/frontend/public/before-after/.

Cases:
  1. Indian woman — acne  (before / after)
  2. Indian woman — pigmentation / melasma  (before / after)
  3. Indian man   — hair fall / PRP scalp  (before / after)
"""
import asyncio
import base64
import os
import sys
from pathlib import Path
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT = Path(__file__).parent
load_dotenv(ROOT / ".env")

OUT = Path("/app/frontend/public/before-after")
OUT.mkdir(parents=True, exist_ok=True)

BASE_STYLE = (
    "ultra-realistic clinical dermatology reference photograph, natural neutral "
    "studio lighting, soft ivory background, shallow depth of field, high detail "
    "skin texture, professional medical documentation, no text, no watermark, "
    "no logo, no overlays, subject looking calmly at camera, tasteful and "
    "respectful, editorial luxury dermatology aesthetic"
)

CASES = [
    (
        "acne_before",
        "Close-up front-facing portrait of a South Indian woman in her mid-20s "
        "with medium-brown skin tone showing moderate active acne — papules and "
        "pustules across the cheeks, forehead and chin, some post-inflammatory "
        "erythema. Natural expression, no makeup. " + BASE_STYLE,
    ),
    (
        "acne_after",
        "Same South Indian woman in her mid-20s with medium-brown skin tone, now "
        "showing dramatically clearer skin after treatment — smooth even complexion, "
        "healthy glow, minimal residual marks. Natural expression, no makeup. "
        + BASE_STYLE,
    ),
    (
        "pigmentation_before",
        "Close-up front-facing portrait of a North Indian woman in her early 30s "
        "with wheatish skin tone showing visible melasma pigmentation — brown "
        "patches across the upper cheeks and forehead, uneven skin tone. Natural "
        "expression, no makeup. " + BASE_STYLE,
    ),
    (
        "pigmentation_after",
        "Same North Indian woman in her early 30s with wheatish skin tone, now "
        "with visibly even, luminous, unified skin tone after pigmentation "
        "treatment — dark patches faded to a uniform warm complexion. Natural "
        "expression, no makeup. " + BASE_STYLE,
    ),
    (
        "hair_before",
        "Top-of-head view of an Indian man in his mid-30s showing early androgenic "
        "hair loss — visible thinning at the crown and receding frontal hairline, "
        "sparse hair density. Neutral studio lighting from above. " + BASE_STYLE,
    ),
    (
        "hair_after",
        "Top-of-head view of the same Indian man in his mid-30s after PRP hair "
        "therapy — visibly denser regrown hair at the crown and restored frontal "
        "hairline, thicker healthier scalp coverage. Neutral studio lighting from "
        "above. " + BASE_STYLE,
    ),
]


async def gen(name: str, prompt: str):
    api_key = os.getenv("EMERGENT_LLM_KEY")
    if not api_key:
        print("ERR: EMERGENT_LLM_KEY missing")
        sys.exit(1)
    chat = LlmChat(api_key=api_key, session_id=f"ba-{name}", system_message="You are a photorealistic image generator.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    msg = UserMessage(text=prompt)
    _text, images = await chat.send_message_multimodal_response(msg)
    if not images:
        print(f"[{name}] no images returned")
        return False
    for i, img in enumerate(images):
        raw = base64.b64decode(img["data"])
        # keep only the first image per case
        path = OUT / f"{name}.png"
        path.write_bytes(raw)
        print(f"[{name}] wrote {path} ({len(raw)/1024:.1f} KB)")
        break
    return True


async def main():
    for name, prompt in CASES:
        try:
            ok = await gen(name, prompt)
            if not ok:
                print(f"[{name}] FAILED")
        except Exception as e:
            print(f"[{name}] EXCEPTION: {e}")


if __name__ == "__main__":
    asyncio.run(main())
