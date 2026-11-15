import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Camera, ChevronDown, Clock, Lock, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/invite/BottomNav";
import { Countdown } from "@/components/invite/Countdown";
import { Petals } from "@/components/invite/Petals";
import { Reveal, SectionTitle } from "@/components/invite/Reveal";
import { Rsvp } from "@/components/invite/Rsvp";
import { SaveTheDate } from "@/components/invite/SaveTheDate";
import { Wishes } from "@/components/invite/Wishes";
import { invitation, mapsEmbedUrl, mapsUrl } from "@/lib/invitation";
import hero from "@/assets/hero-veil.jpg";
import table from "@/assets/moment-table.jpg";
import bouquet from "@/assets/moment-bouquet.jpg";
import rings from "@/assets/moment-rings.jpg";
import venue from "@/assets/moment-venue.jpg";

const title = `حفل زفاف ${invitation.groom} & ${invitation.bride}`;
const description = `يتشرفون بدعوتكم لحضور حفل زفافهما يوم ${invitation.dayName} ${invitation.dateText} في ${invitation.venue}.`;

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
  { icon: Camera, label: "ممنوع التصوير" },
  { icon: Clock, label: "يرجى الحضور في الوقت المحدد" },
  { icon: Lock, label: "فعالية خاصة" },
];

const MOMENTS = [
  { src: venue, alt: "مدخل قاعة الحفل المزين بالورود" },
  { src: bouquet, alt: "باقة ورد العروس" },
  { src: table, alt: "طاولة الحفل بالشموع والورود" },
  { src: rings, alt: "خاتما الزواج" },
];

function Names({ size = "lg" }: { size?: "lg" | "md" }) {
  const cls = size === "lg" ? "text-6xl" : "text-5xl";
  return (
    <div className="flex flex-col items-center leading-none">
      <span className={`font-display ${cls} text-ivory`}>{invitation.groom}</span>
      <span className="font-script my-1 text-5xl text-gold-gradient">&amp;</span>
      <span className={`font-display ${cls} text-ivory`}>{invitation.bride}</span>
    </div>
  );
}

function Invitation() {
  return (
    <div dir="rtl" lang="ar" className="relative min-h-screen pb-32">
      <Petals />

      {/* Cover */}
      <header className="relative h-[100svh] min-h-[640px] overflow-hidden">
        <img
          src={hero}
          alt="فستان العروس والورود تحت قوس مضيء"
          width={1024}
          height={1792}
          className="absolute inset-0 size-full scale-105 object-cover"
        />
        <div className="bg-hero-fade absolute inset-0" />
        <div className="relative z-20 mx-auto flex h-full max-w-md flex-col items-center justify-end px-6 pb-16 text-center">
          <p className="animate-rise text-sm tracking-[0.5em] text-sand">حـفـل زفـاف</p>
          <div className="animate-rise mt-5 [animation-delay:200ms]">
            <Names />
          </div>
          <div className="animate-rise mt-8 flex items-center gap-5 text-sm text-sand [animation-delay:400ms]">
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
          <a href="#invite" aria-label="انتقل للأسفل" className="animate-soft-pulse mt-10 text-sand">
            <ChevronDown className="size-6" />
          </a>
        </div>
      </header>

      <main className="relative z-20 mx-auto max-w-md space-y-20 px-5">
        {/* Invitation text */}
        <section id="invite" className="pt-8 text-center">
          <Reveal>
            <p className="font-display text-2xl leading-loose text-ivory">بسم الله الرحمن الرحيم</p>
            <p className="mt-6 text-lg leading-loose text-sand">{invitation.inviteText}</p>
            <p className="mt-6 text-sm text-muted-foreground">
              يوم {invitation.dayName} الموافق {invitation.dateText}
            </p>
            <p className="mt-3 font-display text-2xl text-gold-gradient">❀ {invitation.venue} ❀</p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              بانتظار تشريفكم لنا لنحتفل معاً بهذه المناسبة السعيدة 💐
            </p>
          </Reveal>
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
          <Reveal className="grid grid-cols-3 gap-2.5">
            {RULES.map(({ icon: Icon, label }) => (
              <div key={label} className="glass-card flex flex-col items-center gap-2 px-2 py-5 text-center">
                <Icon className="size-5 text-gold" />
                <span className="text-xs leading-relaxed text-sand">{label}</span>
              </div>
            ))}
          </Reveal>
        </section>

        {/* Couple message */}
        <section className="text-center">
          <Reveal>
            <span className="font-script text-6xl leading-none text-gold/40">“</span>
            <p className="-mt-4 text-lg leading-loose text-ivory">{invitation.coupleMessage}</p>
            <p className="mt-5 font-display text-xl text-gold-gradient">
              {invitation.bride} &amp; {invitation.groom}
            </p>
          </Reveal>
        </section>

        {/* Gallery */}
        <section>
          <Reveal>
            <SectionTitle kicker="MOMENTS">لحظات من الحفل</SectionTitle>
          </Reveal>
          <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none]">
            {MOMENTS.map((m) => (
              <img
                key={m.alt}
                src={m.src}
                alt={m.alt}
                loading="lazy"
                width={1024}
                height={1280}
                className="aspect-[4/5] w-[72%] shrink-0 snap-center rounded-3xl border object-cover shadow-glow"
              />
            ))}
          </div>
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
          <Names size="md" />
          <p className="mt-5 text-sm tracking-[0.4em] text-muted-foreground">{invitation.dateText}</p>
        </footer>
      </main>

      <BottomNav />
    </div>
  );
}
