import { useEffect, useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Minus, Plus, Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { attendingTotalQuery, rsvpSchema } from "@/lib/guestbook";
import { cn } from "@/lib/utils";

const DONE_KEY = "wedding-rsvp-done";

export function Rsvp() {
  const qc = useQueryClient();
  const total = useQuery(attendingTotalQuery);
  const [done, setDone] = useState<null | "yes" | "no">(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(1);
  const [attending, setAttending] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const v = localStorage.getItem(DONE_KEY);
    if (v === "yes" || v === "no") setDone(v);
  }, []);

  const mutation = useMutation({
    mutationFn: async (input: ReturnType<typeof rsvpSchema.parse>) => {
      const { error } = await supabase.from("rsvps").insert({
        name: input.name,
        phone: input.phone || null,
        guests: input.attending ? input.guests : 1,
        attending: input.attending,
      });
      if (error) throw error;
    },
    onSuccess: (_d, input) => {
      const v = input.attending ? "yes" : "no";
      localStorage.setItem(DONE_KEY, v);
      setDone(v);
      qc.invalidateQueries({ queryKey: attendingTotalQuery.queryKey });
      toast.success(input.attending ? "تم تأكيد حضورك، بانتظارك 🤍" : "شكراً لإبلاغنا، نتمنى رؤيتك قريباً");
    },
    onError: () => toast.error("تعذر الإرسال، حاول مرة أخرى"),
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = rsvpSchema.safeParse({ name, phone, guests, attending });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "تحقق من البيانات");
      return;
    }
    setError(null);
    mutation.mutate(parsed.data);
  };

  return (
    <div className="space-y-4">
      <div className="glass-card flex items-center justify-between px-6 py-4">
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="size-4 text-gold" />
          عدد الحضور المؤكد
        </span>
        <span className="font-body text-3xl font-bold tabular-nums text-ivory">
          {total.data ?? "—"}
        </span>
      </div>

      {done ? (
        <div className="glass-card flex flex-col items-center gap-3 p-8 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-gold-gradient text-primary-foreground shadow-glow">
            <Check className="size-7" />
          </span>
          <p className="font-display text-2xl text-ivory">
            {done === "yes" ? "بانتظار تشريفكم" : "شكراً لإبلاغنا"}
          </p>
          <p className="text-sm text-muted-foreground">تم تسجيل ردك بنجاح</p>
          <button
            type="button"
            className="text-xs text-muted-foreground underline underline-offset-4"
            onClick={() => {
              localStorage.removeItem(DONE_KEY);
              setDone(null);
            }}
          >
            تسجيل رد لشخص آخر
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="glass-card space-y-4 p-6">
          <div className="grid grid-cols-2 gap-2 rounded-full border p-1">
            {[
              { v: true, label: "سأحضر بإذن الله" },
              { v: false, label: "أعتذر عن الحضور" },
            ].map((o) => (
              <button
                key={String(o.v)}
                type="button"
                onClick={() => setAttending(o.v)}
                className={cn(
                  "rounded-full py-2.5 text-sm transition-all",
                  attending === o.v ? "bg-gold-gradient font-bold text-primary-foreground" : "text-muted-foreground",
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="الاسم الكريم"
            maxLength={80}
            className="h-12 rounded-full border-input bg-glass px-5 text-ivory placeholder:text-muted-foreground"
          />
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="رقم الجوال (اختياري)"
            inputMode="tel"
            dir="ltr"
            maxLength={30}
            className="h-12 rounded-full border-input bg-glass px-5 text-right text-ivory placeholder:text-muted-foreground"
          />
          {attending && (
            <div className="flex items-center justify-between rounded-full border px-5 py-2">
              <span className="text-sm text-muted-foreground">عدد الأشخاص</span>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  aria-label="زيادة"
                  onClick={() => setGuests((g) => Math.min(10, g + 1))}
                  className="flex size-8 items-center justify-center rounded-full border text-sand"
                >
                  <Plus className="size-4" />
                </button>
                <span className="w-5 text-center text-lg font-bold tabular-nums text-ivory">{guests}</span>
                <button
                  type="button"
                  aria-label="إنقاص"
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  className="flex size-8 items-center justify-center rounded-full border text-sand"
                >
                  <Minus className="size-4" />
                </button>
              </div>
            </div>
          )}
          {error && <p className="text-center text-sm text-destructive">{error}</p>}
          <Button type="submit" variant="gold" size="xl" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? "جارٍ الإرسال…" : "تأكيد"}
          </Button>
        </form>
      )}
    </div>
  );
}
