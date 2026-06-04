import { defineType, defineField } from "sanity";

/**
 * Lightweight Mux reference. Stores the public playback id so the
 * front-end can mount <MuxPlayer playback-id="…" />.
 *
 * For an upload-from-Studio workflow, install `sanity-plugin-mux-input`
 * and replace this object with `{ type: "mux.video" }` — the front-end
 * MuxVideo component already reads `playbackId`.
 */
export const muxVideo = defineType({
  name: "muxVideo",
  title: "Vidéo (Mux)",
  type: "object",
  fields: [
    defineField({
      name: "playbackId",
      title: "Playback ID",
      type: "string",
      description: "Identifiant de lecture public Mux",
    }),
    defineField({
      name: "aspectRatio",
      title: "Format",
      type: "string",
      options: {
        list: [
          { title: "16:9", value: "16/9" },
          { title: "2.39:1 (Scope)", value: "2.39/1" },
          { title: "9:16 (Vertical)", value: "9/16" },
          { title: "1:1", value: "1/1" },
          { title: "4:3", value: "4/3" },
        ],
      },
      initialValue: "16/9",
    }),
  ],
});
