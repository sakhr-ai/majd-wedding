import { useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { wishSchema, wishesQuery } from "@/lib/guestbook";

export function Wishes() {
  const qc = useQueryClient();
  const wishes = useQuery(wishesQuery);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (input: { name: string; message: string }) => {
      const { error } = await supabase.from("wishes").insert(input);
      if (error) throw error;
    },
    onSuccess: () => {
      setMessage("");
      qc.invalidateQueries({ queryKey: wishesQuery.queryKey });
      toast.success("شكراً لتهنئتك الجميلة 💐");
    },
    onError: () => toast.error("تعذر إرسال التهنئة، حاول مرة أخرى"),
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = wishSchema.safeParse({ name, message });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "تحقق من البيانات");
      return;
    }
    setError(null);
    mutation.mutate(parsed.data);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="glass-card space-y-3 p-5">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="اسمك"
          maxLength={60}
          className="h-11 rounded-full border-input bg-glass px-5 text-ivory placeholder:text-muted-foreground"
        />
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="اكتب تهنئتك للعروسين…"
          maxLength={300}
          rows={3}
          className="resize-none rounded-2xl border-input bg-glass px-5 py-3 text-ivory placeholder:text-muted-foreground"
        />
        {error && <p className="text-center text-sm text-destructive">{error}</p>}
        <Button type="submit" variant="gold" className="w-full" disabled={mutation.isPending}>
          <Send />
          {mutation.isPending ? "جارٍ الإرسال…" : "أرسل التهنئة"}
        </Button>
      </form>

      <div className="max-h-[28rem] space-y-3 overflow-y-auto pe-1">
        {wishes.isLoading && <p className="text-center text-sm text-muted-foreground">جارٍ التحميل…</p>}
        {wishes.data?.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">كن أول من يهنئ العروسين</p>
        )}
        {wishes.data?.map((w) => (
          <figure key={w.id} className="glass-card rounded-2xl px-5 py-4">
            <blockquote className="text-[15px] leading-relaxed text-ivory">{w.message}</blockquote>
            <figcaption className="mt-2 text-xs text-gold">— {w.name}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
