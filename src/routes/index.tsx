import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, ChevronDown, Clock, Lock, MapPin, Navigation } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/invite/BottomNav";
import { Countdown } from "@/components/invite/Countdown";
import { Petals } from "@/components/invite/Petals";
import { Reveal, SectionTitle } from "@/components/invite/Reveal";
import { Rsvp } from "@/components/invite/Rsvp";
import { SaveTheDate } from "@/components/invite/SaveTheDate";
import { Wishes } from "@/components/invite/Wishes";
import { invitation, mapsEmbedUrl, mapsUrl } from "@/lib/invitation";
import heroAsset from "@/assets/couple-full.png";

const title = `حفل زفاف ${invitation.groom} & ${invitation.bride}`;
const description = `${invitation.inviteText.opening} ${invitation.inviteText.introduction} السيد ${invitation.inviteText.father1} والسيد ${invitation.inviteText.father2} ${invitation.inviteText.closing} يوم ${invitation.dayName} ${invitation.dateText} في ${invitation.venue}.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

const RULES = [
  { icon: Clock, label: "‏ حفل الزفاف للرجال والنساء منفصل في نفس التوقيت" },
  { icon: Lock, label: "الدعوة خاصة" },
];

function Names({ size = "lg", titles = true }: { size?: "lg" | "md"; titles?: boolean }) {
  const cls = size === "lg" ? "text-[clamp(2.75rem,7svh,3.75rem)]" : "text-5xl";
  return (
    <div className="flex flex-col items-center leading-none">
      {titles && <span className="mb-2 text-sm text-sand">{invitation.groomTitle}</span>}
      <span className={`font-display ${cls} text-ivory`}>{invitation.groom}</span>
      <span className="font-script my-4 text-5xl leading-none text-gold-gradient">&amp;</span>
      {titles && <span className="mb-2 text-sm text-sand">{invitation.brideTitle}</span>}
      <span className={`font-display ${cls} text-ivory`}>{invitation.bride}</span>
    </div>
  );
}

const COVER_SPARKLES = [
  ["15%", "21%"],
  ["27%", "69%"],
  ["76%", "18%"],
  ["84%", "42%"],
  ["68%", "77%"],
  ["19%", "84%"],
  ["89%", "72%"],
  ["40%", "13%"],
] as const;

function InvitationCover({ isOpening, onOpen }: { isOpening: boolean; onOpen: () => void }) {
  return (
    <div
      aria-hidden={isOpening}
      inert={isOpening}
      className={`fixed inset-0 z-50 flex min-h-svh items-center justify-center overflow-hidden bg-espresso transition-opacity duration-1000 ease-out ${
        isOpening ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <img
        src={heroAsset}
        alt=""
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-xl"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/35 via-espresso/55 to-espresso/80" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 43%, oklch(0.74 0.12 85 / 0.2), transparent 42%)",
        }}
      />

      {COVER_SPARKLES.map(([left, top], index) => (
        <span
          key={`${left}-${top}`}
          aria-hidden="true"
          className="animate-pulse absolute size-1 rounded-full bg-sand/55 shadow-glow motion-reduce:animate-none"
          style={{ left, top, animationDelay: `${index * 260}ms` }}
        />
      ))}

      <button
        type="button"
        onClick={onOpen}
        aria-label={`افتح دعوة زفاف ${invitation.groom} و${invitation.bride}`}
        className={`group relative z-10 flex size-40 flex-col items-center justify-center gap-1 overflow-hidden rounded-full border border-sand/35 bg-espresso/30 px-4 text-center text-sand shadow-glow backdrop-blur-md transition-[transform,opacity,filter,box-shadow,border-color] duration-700 ease-out hover:scale-105 hover:border-gold/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-espresso active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100 ${
          isOpening ? "scale-125 opacity-0 blur-sm" : "opacity-100"
        }`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-1 rounded-full border border-sand/20"
        />
        <span className="font-display text-xl leading-tight text-ivory">{"M"}</span>
        <span aria-hidden="true" className="font-script text-3xl leading-none text-gold-gradient">
          &amp;
        </span>
        <span className="font-display text-xl leading-tight text-ivory">{"H"}</span>
        <span className="mt-2 text-[10px] tracking-[0.28em] text-sand/70 transition-colors duration-500 group-hover:text-gold">
          OPEN
        </span>
      </button>
    </div>
  );
}

function Invitation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      dir="rtl"
      lang="ar"
      className={`relative min-h-screen pb-32 ${isOpen ? "" : "h-svh overflow-hidden"}`}
    >
      <div
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`transition-opacity duration-1000 ease-out ${
          isOpen ? "opacity-100 delay-150" : "pointer-events-none opacity-0"
        }`}
      >
        <Petals />

        {/* Hero image */}
        <header className="relative mx-auto max-w-md px-5 py-5">
          <div className="animate-rise glass-card p-1.5">
            <img
              src={heroAsset}
              alt="العريس والعروسة أمام قوس مضيء"
              width={854}
              height={735}
              className="mx-auto block w-[min(100%,calc(34svh*1.162))] rounded-[1.4rem] object-contain"
            />
          </div>

          <a
            href="#invite"
            aria-label="انتقل للأسفل"
            className="animate-soft-pulse mt-6 hidden justify-center text-sand tall:flex"
          >
            <ChevronDown className="size-6" />
          </a>
        </header>

        <main className="relative z-20 mx-auto max-w-md space-y-20 px-5">
          {/* Invitation text */}
          <section id="invite" className="pt-8 text-center">
            <Reveal>
              <p className="font-display text-2xl leading-loose text-ivory">
                بسم الله الرحمن الرحيم
              </p>

              <div className="mt-6 space-y-2 text-lg leading-loose text-sand">
                <p>{invitation.inviteText.opening}</p>
                <p>{invitation.inviteText.introduction}</p>
                <p>
                  السيد{" "}
                  <strong className="font-bold text-ivory">
                    {invitation.inviteText.father1}
                  </strong>
                  {" والسيد "}
                  <strong className="font-bold text-ivory">
                    {invitation.inviteText.father2}
                  </strong>
                </p>
                <p>{invitation.inviteText.closing}</p>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                يوم {invitation.dayName} الموافق {invitation.dateText}
              </p>
              <p className="mt-3 font-display text-2xl text-gold-gradient">
                {invitation.venue}
              </p>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                بانتظار تشريفكم لنا لنحتفل معاً بهذه المناسبة السعيدة
              </p>
            </Reveal>

            {/* Names and event details follow the invitation text */}
            <div className="animate-rise glass-card mt-4 mx-4 rounded-3xl px-4 py-5 text-center [animation-delay:200ms]">
              <p className="font-display text-base text-sand">حــفــل زفــاف</p>
              <div className="mt-2">
                <Names />
              </div>
              <div className="mt-4 flex items-center justify-center gap-4 text-sm text-sand">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="size-4 text-gold" />
                  {invitation.dayName} {invitation.dateText}
                </span>
                <span className="h-4 w-px bg-border" />
                <span className="flex items-center gap-1.5">
                  <Clock className="size-4 text-gold" />
                  {invitation.timeText}
                </span>
              </div>
            </div>
          </section>

          {/* Location */}
          <section id="location">
            <Reveal>
              <SectionTitle kicker="LOCATION">الموقع</SectionTitle>
              <div className="glass-card overflow-hidden">
                <iframe
                  title="خريطة موقع الحفل"
                  src={mapsEmbedUrl}
                  loading="lazy"
                  className="h-52 w-full border-0 opacity-80 grayscale-[60%] sepia-[35%]"
                />
                <div className="flex items-start gap-3 p-5">
                  <MapPin className="mt-1 size-5 shrink-0 text-gold" />
                  <div className="flex-1">
                    <p className="font-display text-xl text-ivory">{invitation.venue}</p>
                    {invitation.address.map((l) => (
                      <p key={l} className="text-sm text-muted-foreground">
                        {l}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="px-5 pb-5">
                  <Button variant="glass" className="w-full" asChild>
                    <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                      <Navigation />
                      افتح في الخرائط
                    </a>
                  </Button>
                </div>
              </div>
            </Reveal>
          </section>

          {/* Save the date */}
          <section>
            <Reveal>
              <SectionTitle kicker="SAVE THE DATE">احفظ الموعد</SectionTitle>
              <SaveTheDate />
            </Reveal>
          </section>

          {/* Countdown */}
          <section className="text-center">
            <Reveal>
              <SectionTitle kicker="COUNTDOWN">العد التنازلي</SectionTitle>
              <Countdown />
            </Reveal>
          </section>

          {/* Etiquette */}
          <section>
            <Reveal className="mx-auto grid max-w-sm grid-cols-2 gap-2.5">
              {RULES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="glass-card flex flex-col items-center gap-2 px-2 py-5 text-center"
                >
                  <Icon className="size-5 text-gold" />
                  <span className="text-xs leading-relaxed text-sand">{label}</span>
                </div>
              ))}
            </Reveal>
          </section>

          {/* Groom's message */}
          <section className="text-center">
            <Reveal>
              <SectionTitle kicker="FROM THE GROOM">كلمة العريس</SectionTitle>
              <img
                src={heroAsset}
                alt="العريس والعروسة أمام قوس مضيء"
                width={854}
                height={735}
                className="mx-auto mb-5 h-48 w-48 rounded-2xl object-cover"
              />
              <p className="text-lg leading-loose text-ivory">{invitation.groomMessage}</p>
              <p className="mt-5 font-display text-xl text-gold-gradient">{invitation.groom}</p>
            </Reveal>
          </section>

          {/* RSVP */}
          <section id="rsvp" className="scroll-mt-8">
            <Reveal>
              <SectionTitle kicker="RSVP">تأكيد الحضور</SectionTitle>
              <Rsvp />
            </Reveal>
          </section>

          {/* Wishes */}
          <section id="wishes" className="scroll-mt-8">
            <Reveal>
              <SectionTitle kicker="WISHES">التهاني</SectionTitle>
              <Wishes />
            </Reveal>
          </section>

          <footer className="pb-6 pt-4 text-center">
            <Names size="md" titles={false} />
            <p className="mt-5 text-sm tracking-[0.4em] text-muted-foreground">
              {invitation.dateText}
            </p>
          </footer>
        </main>

        <BottomNav />
      </div>

      <InvitationCover isOpening={isOpen} onOpen={() => setIsOpen(true)} />
    </div>
  );
}
