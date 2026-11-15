import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const rsvpSchema = z.object({
  name: z.string().trim().min(1, "الرجاء كتابة الاسم").max(80, "الاسم طويل جداً"),
  phone: z
    .string()
    .trim()
    .max(30, "رقم غير صالح")
    .regex(/^[0-9+\s-]*$/, "رقم غير صالح")
    .optional()
    .or(z.literal("")),
  guests: z.number().int().min(1).max(10),
  attending: z.boolean(),
});

export const wishSchema = z.object({
  name: z.string().trim().min(1, "الرجاء كتابة الاسم").max(60, "الاسم طويل جداً"),
  message: z.string().trim().min(1, "اكتب تهنئتك").max(300, "التهنئة طويلة جداً (300 حرف كحد أقصى)"),
});

export const attendingTotalQuery = queryOptions({
  queryKey: ["attending-total"],
  queryFn: async () => {
    const { data, error } = await supabase.rpc("attending_total");
    if (error) throw error;
    return data ?? 0;
  },
});

export const wishesQuery = queryOptions({
  queryKey: ["wishes"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("wishes")
      .select("id, name, message, created_at")
      .order("created_at", { ascending: false })
      .limit(60);
    if (error) throw error;
    return data;
  },
});
