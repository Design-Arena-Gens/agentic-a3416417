"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const NICHE_LIBRARY = [
  "AI Productivity",
  "Personal Finance",
  "Gaming",
  "Fitness & Wellness",
  "Mindset & Stoicism",
  "Crypto & Web3",
  "Luxury Lifestyle",
  "No-Code Tools",
  "Digital Nomad",
  "Celebrity News"
];

const HERO_ANGLES = [
  "Reveal",
  "Countdown",
  "Spreadsheet Flex",
  "Day In The Life",
  "Before vs After",
  "Myth Busting",
  "Silent Story"
];

const CORE_EMOTIONS = [
  { id: "curiosity", label: "Curiosity Spike" },
  { id: "inspiration", label: "Inspiration" },
  { id: "shock", label: "Shock & Awe" },
  { id: "relief", label: "Relief" },
  { id: "status", label: "Status Boost" }
];

const CTA_OBJECTIVES = [
  "Grow Subscribers",
  "Drive Newsletter Sign-ups",
  "Sell Digital Product",
  "Grow Discord",
  "Affiliate Conversion"
];

const PACING_PROFILES = [
  { id: "rapid", label: "Rapid Fire (45-60s)", bpm: "152", cuts: "18-24" },
  { id: "story", label: "Story Arc (90s)", bpm: "112", cuts: "10-14" },
  { id: "guide", label: "Tutorial Flow (4 min)", bpm: "96", cuts: "22-28" }
];

const audioLibrary = {
  curiosity: [
    { name: "Dawn Patrol", vibe: "dark synth build", bpm: 150 },
    { name: "Orbit Drift", vibe: "ambient tension", bpm: 148 }
  ],
  inspiration: [
    { name: "Skyward", vibe: "cinematic rise", bpm: 120 },
    { name: "Canvas Bloom", vibe: "feel good pop", bpm: 118 }
  ],
  shock: [
    { name: "Night Run", vibe: "aggressive trap", bpm: 160 },
    { name: "Voltage", vibe: "distorted bass", bpm: 168 }
  ],
  relief: [
    { name: "Homespun", vibe: "acoustic calm", bpm: 92 },
    { name: "Afterglow", vibe: "lofi rinse", bpm: 88 }
  ],
  status: [
    { name: "Gilded", vibe: "lux trap", bpm: 140 },
    { name: "Midnight Silk", vibe: "smooth drill", bpm: 146 }
  ]
};

const frameworks = {
  openings: [
    "Ultra-tight cold open that finishes a sentence viewers already started in their head.",
    "Flash 3-shot montage that escalates tension before dropping the hook line.",
    "Direct-to-camera voiceover paired with motion-tracked text for instant clarity."
  ],
  storyBeats: [
    "Plot twist at 70% timeline to reset retention curve.",
    "Pattern interrupt every 7 seconds using match cuts or zoom ramps.",
    "Use contrast framing: problem scenes are shot static, solution scenes have parallax motion."
  ],
  ctas: [
    "Soft CTA layered under montage with timed lower thirds.",
    "Deliver CTA as a tease for the next video to chain retention.",
    "Embed CTA inside final stat reveal so viewers screenshot the moment."
  ]
};

const ideaPrompts = [
  {
    label: "Blueprint Drop",
    description:
      "Break down a repeatable 3-step system with overlays that viewers can screenshot."
  },
  {
    label: "Case Study Flip",
    description:
      "Rebuild someone else’s viral moment using your workflow, show the contrasts."
  },
  {
    label: "Hidden Costs",
    description:
      "Highlight unseen mistakes rookies make with a fast ‘what I’d do instead’ payoff."
  },
  {
    label: "Automation Duel",
    description:
      "Compare manual vs automated approach and let data visualizations settle the debate."
  },
  {
    label: "Timeline Warp",
    description:
      "Narrate a transformation over months using aggressive jump cuts and sound design."
  }
];

const hookBuilders = [
  {
    name: "Shock Stat",
    template: "This {niche} hack saved me {metric}, but nobody talks about it."
  },
  {
    name: "Reverse Promise",
    template: "If you’re still {pain}, you’re ignoring the {niche} trick in step {number}."
  },
  {
    name: "Reveal",
    template: "Watch me expose the {niche} play that’s printing {outcome} on autopilot."
  },
  {
    name: "Day Zero",
    template: "Day 0 of building a faceless {niche} channel → here’s the unfair leverage."
  }
];

const packagingAngles = [
  { titlePattern: "I Built a {niche} Machine That Prints {metric}", length: 58 },
  { titlePattern: "Why {number} of {nichePlural} Quit (And How I Cheated)", length: 72 },
  { titlePattern: "Steal My {niche} Pipeline Before It Blows Up", length: 52 }
];

const whipPanShots = [
  "Screen recording with motion blur transition between steps",
  "Macro shot of gear with teal/orange grade to signal premium status",
  "Hand-written note reveal with drop shadow for nostalgic feel"
];

const retentionPillars = [
  "Segment your story into 3 micro arcs. Each arc needs its own tension + reward.",
  "Layer captions with alternating font weights every 3-4 words to make scanning addictive.",
  "End each scene on an upward audio sweep so momentum never collapses.",
  "Front-load your strongest visuals within 4 seconds; repeat them with variations at the end."
];

const tagsLibrary = [
  "faceless",
  "youtube-automation",
  "viral-video",
  "shorts",
  "ai-tools",
  "content-strategy",
  "storytelling",
  "retention-hacks",
  "hooks",
  "editing"
];

function randomFrom(list, count = 1) {
  const pool = [...list];
  const picks = [];
  for (let i = 0; i < count && pool.length; i += 1) {
    const index = Math.floor(Math.random() * pool.length);
    picks.push(pool.splice(index, 1)[0]);
  }
  return picks;
}

function generateHook(template, niche) {
  const replacements = {
    niche,
    metric: ["$4,200", "20 hours", "6 months", "75% of watch time"][Math.floor(Math.random() * 4)],
    pain: ["stuck at 1k views", "editing until 3AM", "bleeding retention", "copying everyone else"][
      Math.floor(Math.random() * 4)
    ],
    number: Math.floor(Math.random() * 5) + 2,
    nichePlural: niche.endsWith("s") ? `${niche} creators` : `${niche} creators`,
    outcome: ["cashflow", "retention", "watch time", "subs"][Math.floor(Math.random() * 4)]
  };

  return template.replace(/\{(\w+)\}/g, (_, key) => replacements[key] ?? _);
}

function buildScriptBeats(niche, emotion, angle) {
  return [
    {
      beat: "Cold Open (0-3s)",
      detail: `Slam viewers with the ${angle.toLowerCase()} moment in ${niche} using punchy kinetic typography.`
    },
    {
      beat: "Setup (3-15s)",
      detail: `Name the villain emotion (${emotion.label.toLowerCase()}) and show the dashboard/data proving the pain.`
    },
    {
      beat: "The Flip (15-45s)",
      detail: `Stack the three core steps. Use pattern interrupts (snap zoom, whip pan, glitch) between each reveal.`
    },
    {
      beat: "Receipts (45-70s)",
      detail: "Time-lapse your screen recording with motion-tracked callouts that reinforce the transformation."
    },
    {
      beat: "CTA & Loop (70s+)",
      detail: "CTA layered as a teaser for the next playbook. End on a looped beat so the watch session restarts."
    }
  ];
}

function generatePublishingSchedule(niche) {
  const cadences = [
    { day: "Monday", drop: "High Stakes Reveal", purpose: "Spike CTR & retention baseline" },
    { day: "Wednesday", drop: "Authority Breakdown", purpose: "Build trust & channel session time" },
    { day: "Saturday", drop: "Community Pulse", purpose: "Spark comments & algorithmic velocity" }
  ];

  return cadences.map((slot) => ({
    ...slot,
    optimization: `Repurpose into 3 Shorts focusing on ${niche} micro moments within 48 hours.`
  }));
}

function computePerformanceOutlook(pacing, emotion) {
  const base = 74;
  const pacingBoost = pacing.id === "rapid" ? 12 : pacing.id === "story" ? 8 : 5;
  const emotionBoost = emotion.id === "shock" ? 10 : emotion.id === "curiosity" ? 9 : 6;

  const retention = Math.min(96, base + pacingBoost + emotionBoost);
  const shareability = Math.min(92, 60 + emotionBoost * 2);
  const bingeFactor = Math.min(95, 65 + pacingBoost * 2);

  return {
    retention,
    shareability,
    bingeFactor
  };
}

function buildIdeaPack({ niche, emotion, objective, pacing }) {
  const primaryAngle = randomFrom(HERO_ANGLES)[0];
  const hookTemplate = randomFrom(hookBuilders)[0];
  const hooks = randomFrom(hookBuilders, 2).map((h) => ({
    framework: h.name,
    line: generateHook(h.template, niche)
  }));

  const scriptBeats = buildScriptBeats(niche, emotion, primaryAngle);

  const packaging = packagingAngles.map((angle) => ({
    pattern: angle.titlePattern,
    suggestion: angle.titlePattern
      .replace("{niche}", niche)
      .replace("{nichePlural}", niche.endsWith("s") ? niche : `${niche}s`)
      .replace("{metric}", ["$12k/mo", "90% retention", "7x watch time"][Math.floor(Math.random() * 3)])
      .replace("{number}", Math.floor(Math.random() * 7) + 3)
  }));

  const audio = audioLibrary[emotion.id] ?? audioLibrary.curiosity;
  const shots = randomFrom(whipPanShots, 3);

  return {
    primaryAngle,
    hookTemplate,
    hooks,
    scriptBeats,
    packaging,
    editingStack: {
      pacing: pacing.label,
      bpm: pacing.bpm,
      cutFrequency: pacing.cuts,
      overlays: randomFrom(
        [
          "HUD overlays to telegraph metrics",
          "Masked gradient wipes to separate timelines",
          "3D LUT with subtle teal-magenta split",
          "Dynamic subtitles (Bebas Neue bold + Inter body)"
        ],
        2
      )
    },
    audio,
    shots,
    retentionPillars: randomFrom(retentionPillars, 3),
    repurpose: generatePublishingSchedule(niche),
    objective
  };
}

function useIdeaEngine(state) {
  return useMemo(() => buildIdeaPack(state), [state]);
}

const fadeVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 }
};

export default function Page() {
  const [niche, setNiche] = useState(NICHE_LIBRARY[0]);
  const [ideaPrompt, setIdeaPrompt] = useState(ideaPrompts[0].label);
  const [emotion, setEmotion] = useState(CORE_EMOTIONS[0]);
  const [objective, setObjective] = useState(CTA_OBJECTIVES[0]);
  const [pacing, setPacing] = useState(PACING_PROFILES[0]);

  const state = useMemo(
    () => ({
      niche,
      prompt: ideaPrompt,
      emotion,
      objective,
      pacing
    }),
    [niche, ideaPrompt, emotion, objective, pacing]
  );

  const ideaPack = useIdeaEngine({
    niche,
    emotion,
    objective,
    pacing
  });
  const performance = computePerformanceOutlook(pacing, emotion);

  return (
    <main
      style={{
        maxWidth: "1120px",
        margin: "0 auto",
        padding: "4rem 1.5rem 6rem",
        display: "flex",
        flexDirection: "column",
        gap: "2.5rem"
      }}
    >
      <header className="gradient-border">
        <motion.div
          className="glass"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            borderRadius: "24px",
            padding: "2.5rem"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
              <div>
                <div className="pill">Faceless Channel Command Center</div>
                <h1 style={{ fontSize: "2.75rem", margin: "1.25rem 0 0.5rem" }}>
                  Engineer Your Next Viral Drop in Minutes
                </h1>
                <p style={{ margin: 0, maxWidth: "560px", opacity: 0.85, lineHeight: 1.6 }}>
                  Feed in your niche and desired emotion. We generate hooks, scripts, motion design cues, audio beds,
                  and a publishing schedule optimized for channels that stay behind the camera.
                </p>
              </div>
              <motion.button
                className="cta-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const newNiche = randomFrom(NICHE_LIBRARY)[0];
                  setNiche(newNiche);
                  setIdeaPrompt(randomFrom(ideaPrompts)[0].label);
                  setEmotion(randomFrom(CORE_EMOTIONS)[0]);
                  setObjective(randomFrom(CTA_OBJECTIVES)[0]);
                  setPacing(randomFrom(PACING_PROFILES)[0]);
                }}
              >
                Regenerate Blueprint
              </motion.button>
            </div>
            <div className="stat-grid">
              <motion.div className="stat-card" variants={fadeVariant} initial="hidden" animate="visible">
                <span>Retention Forecast</span>
                <strong>{performance.retention}%</strong>
              </motion.div>
              <motion.div className="stat-card" variants={fadeVariant} initial="hidden" animate="visible">
                <span>Shareability Index</span>
                <strong>{performance.shareability}%</strong>
              </motion.div>
              <motion.div className="stat-card" variants={fadeVariant} initial="hidden" animate="visible">
                <span>Binge Factor</span>
                <strong>{performance.bingeFactor}%</strong>
              </motion.div>
              <motion.div className="stat-card" variants={fadeVariant} initial="hidden" animate="visible">
                <span>Objective</span>
                <strong style={{ fontSize: "1rem" }}>{ideaPack.objective}</strong>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </header>

      <section className="grid two-columns">
        <div className="gradient-border">
          <div className="glass" style={{ padding: "2rem" }}>
            <div className="section-title">
              <h2>Channel DNA</h2>
              <span>Tune inputs → blueprint updates live</span>
            </div>
            <div className="grid" style={{ gap: "1.25rem" }}>
              <label style={{ display: "grid", gap: "0.6rem" }}>
                <span style={{ fontSize: "0.85rem", opacity: 0.75 }}>Niche</span>
                <select
                  value={niche}
                  onChange={(event) => setNiche(event.target.value)}
                  style={{
                    background: "rgba(15, 23, 42, 0.75)",
                    border: "1px solid rgba(148, 163, 184, 0.3)",
                    color: "#f8fafc",
                    padding: "0.75rem 0.9rem",
                    borderRadius: "12px"
                  }}
                >
                  {NICHE_LIBRARY.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label style={{ display: "grid", gap: "0.6rem" }}>
                <span style={{ fontSize: "0.85rem", opacity: 0.75 }}>Viral Prompt</span>
                <select
                  value={ideaPrompt}
                  onChange={(event) => setIdeaPrompt(event.target.value)}
                  style={{
                    background: "rgba(15, 23, 42, 0.75)",
                    border: "1px solid rgba(148, 163, 184, 0.3)",
                    color: "#f8fafc",
                    padding: "0.75rem 0.9rem",
                    borderRadius: "12px"
                  }}
                >
                  {ideaPrompts.map((prompt) => (
                    <option value={prompt.label} key={prompt.label}>
                      {prompt.label}
                    </option>
                  ))}
                </select>
              </label>
              <label style={{ display: "grid", gap: "0.6rem" }}>
                <span style={{ fontSize: "0.85rem", opacity: 0.75 }}>Trigger Emotion</span>
                <div className="grid" style={{ gap: "0.75rem" }}>
                  {CORE_EMOTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setEmotion(option)}
                      className={clsx("stacked-card", emotion.id === option.id && "active")}
                      style={{
                        textAlign: "left",
                        border:
                          emotion.id === option.id
                            ? "1px solid rgba(99, 102, 241, 0.6)"
                            : "1px solid rgba(148, 163, 184, 0.2)"
                      }}
                    >
                      <strong style={{ fontSize: "0.95rem" }}>{option.label}</strong>
                      <span style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                        Drive decisions with {option.label.toLowerCase()} cues.
                      </span>
                    </button>
                  ))}
                </div>
              </label>
              <label style={{ display: "grid", gap: "0.6rem" }}>
                <span style={{ fontSize: "0.85rem", opacity: 0.75 }}>Primary Objective</span>
                <select
                  value={objective}
                  onChange={(event) => setObjective(event.target.value)}
                  style={{
                    background: "rgba(15, 23, 42, 0.75)",
                    border: "1px solid rgba(148, 163, 184, 0.3)",
                    color: "#f8fafc",
                    padding: "0.75rem 0.9rem",
                    borderRadius: "12px"
                  }}
                >
                  {CTA_OBJECTIVES.map((target) => (
                    <option value={target} key={target}>
                      {target}
                    </option>
                  ))}
                </select>
              </label>
              <label style={{ display: "grid", gap: "0.6rem" }}>
                <span style={{ fontSize: "0.85rem", opacity: 0.75 }}>Pacing Profile</span>
                <div className="grid" style={{ gap: "0.6rem" }}>
                  {PACING_PROFILES.map((profile) => (
                    <button
                      key={profile.id}
                      type="button"
                      onClick={() => setPacing(profile)}
                      className="stacked-card"
                      style={{
                        textAlign: "left",
                        border:
                          pacing.id === profile.id
                            ? "1px solid rgba(236, 72, 153, 0.6)"
                            : "1px solid rgba(148, 163, 184, 0.2)"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <strong>{profile.label}</strong>
                        <span className="badge positive">{profile.cuts} cuts</span>
                      </div>
                      <span style={{ fontSize: "0.8rem", opacity: 0.7 }}>Target BPM {profile.bpm}</span>
                    </button>
                  ))}
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="gradient-border">
          <motion.div className="glass" style={{ padding: "2rem" }} variants={fadeVariant} initial="hidden" animate="visible">
            <div className="section-title">
              <h2>Concept Snapshot</h2>
              <span>{ideaPrompt}</span>
            </div>
            <div className="grid" style={{ gap: "1rem" }}>
              <div className="stacked-card">
                <p>
                  <strong>Primary Angle:</strong> {ideaPack.primaryAngle}
                </p>
              </div>
              <div className="stacked-card">
                <p>
                  <strong>Hero Emotion:</strong> {emotion.label}
                </p>
              </div>
              <div className="stacked-card">
                <p>
                  <strong>Opening Move:</strong> {frameworks.openings[Math.floor(Math.random() * frameworks.openings.length)]}
                </p>
              </div>
              <div className="stacked-card">
                <p>
                  <strong>Pattern Interrupts:</strong> {frameworks.storyBeats[Math.floor(Math.random() * frameworks.storyBeats.length)]}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="gradient-border">
        <div className="glass" style={{ padding: "2.25rem" }}>
          <div className="section-title">
            <h2>Hook Arsenal</h2>
            <span>Pick 1 for hero, remix others into Shorts</span>
          </div>
          <div className="grid" style={{ gap: "1rem" }}>
            {ideaPack.hooks.map((hook) => (
              <div className="stacked-card" key={hook.line}>
                <h3>{hook.framework}</h3>
                <p style={{ fontSize: "1.15rem", fontWeight: 600 }}>{hook.line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-border">
        <div className="glass" style={{ padding: "2.25rem" }}>
          <div className="section-title">
            <h2>Script Blueprint</h2>
            <span>Lock beats → send to editor</span>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Beat</th>
                <th>Execution</th>
              </tr>
            </thead>
            <tbody>
              {ideaPack.scriptBeats.map((beat) => (
                <tr key={beat.beat}>
                  <td style={{ width: "180px", fontWeight: 600 }}>{beat.beat}</td>
                  <td>{beat.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid two-columns">
        <div className="gradient-border">
          <div className="glass" style={{ padding: "2rem" }}>
            <div className="section-title">
              <h2>Editing Stack</h2>
              <span>Exact post-production spec</span>
            </div>
            <div className="grid" style={{ gap: "1rem" }}>
              <div className="stacked-card">
                <h3>Pacing</h3>
                <p>{ideaPack.editingStack.pacing}</p>
              </div>
              <div className="stacked-card">
                <h3>Target BPM</h3>
                <p>{ideaPack.editingStack.bpm}</p>
              </div>
              <div className="stacked-card">
                <h3>Cut Frequency</h3>
                <p>{ideaPack.editingStack.cutFrequency}</p>
              </div>
              <div className="stacked-card">
                <h3>Overlay Moves</h3>
                <p>{ideaPack.editingStack.overlays.join(" • ")}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="gradient-border">
          <div className="glass" style={{ padding: "2rem" }}>
            <div className="section-title">
              <h2>Audio Bed</h2>
              <span>Match vibe to motion</span>
            </div>
            <div className="grid" style={{ gap: "1rem" }}>
              {ideaPack.audio.map((track) => (
                <div className="stacked-card" key={track.name}>
                  <h3>{track.name}</h3>
                  <p>
                    {track.vibe} • {track.bpm} BPM
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="gradient-border">
        <div className="glass" style={{ padding: "2.25rem" }}>
          <div className="section-title">
            <h2>Packaging</h2>
            <span>Title, description, tags</span>
          </div>
          <div className="grid three-columns">
            {ideaPack.packaging.map((pack) => (
              <div className="stacked-card" key={pack.pattern}>
                <h3>Title Angle</h3>
                <p>{pack.suggestion}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1.5rem" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>Description Starter</h3>
            <p style={{ opacity: 0.85, lineHeight: 1.6 }}>
              {`Steal my ${ideaPack.primaryAngle.toLowerCase()} playbook for ${niche}. I walk through every automation, template, and asset I use to keep this channel faceless while scaling ${ideaPack.objective.toLowerCase()}.`}
            </p>
          </div>
          <div style={{ marginTop: "1.25rem" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>Tags</h3>
            <div className="tag-cloud">
              {randomFrom(tagsLibrary, 7).map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="gradient-border">
        <div className="glass" style={{ padding: "2.25rem" }}>
          <div className="section-title">
            <h2>Shot List</h2>
            <span>Stack B-roll sequences</span>
          </div>
          <div className="grid" style={{ gap: "1rem" }}>
            {ideaPack.shots.map((shot) => (
              <div className="stacked-card" key={shot}>
                <p>{shot}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-border">
        <div className="glass" style={{ padding: "2.25rem" }}>
          <div className="section-title">
            <h2>Retention Playbook</h2>
            <span>Stay above algorithm thresholds</span>
          </div>
          <ul style={{ margin: 0, paddingLeft: "1.5rem", display: "grid", gap: "0.75rem" }}>
            {ideaPack.retentionPillars.map((pillar) => (
              <li key={pillar} style={{ lineHeight: 1.6 }}>
                {pillar}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="gradient-border">
        <div className="glass" style={{ padding: "2.25rem" }}>
          <div className="section-title">
            <h2>Publishing Pipeline</h2>
            <span>Repurpose for compounding reach</span>
          </div>
          <div className="timeline">
            {ideaPack.repurpose.map((slot) => (
              <div className="timeline-item" key={slot.day}>
                <span>{slot.day}</span>
                <div>
                  <strong style={{ display: "block", marginBottom: "0.35rem" }}>{slot.drop}</strong>
                  <p style={{ marginBottom: "0.25rem" }}>{slot.purpose}</p>
                  <p style={{ opacity: 0.7 }}>{slot.optimization}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
