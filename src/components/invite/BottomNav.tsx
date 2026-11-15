import { CalendarCheck, MapPin, MessageCircle, MessagesSquare } from "lucide-react";
import { invitation, mapsUrl } from "@/lib/invitation";

const item = "flex flex-1 flex-col items-center gap-1 rounded-full py-2 text-[11px] text-sand transition-colors hover:bg-accent";

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-4 z-40 mx-auto w-[min(92%,26rem)]">
      <div className="glass-card flex items-stretch gap-1 rounded-full p-1.5">
        <a className={item} href={`https://wa.me/${invitation.contactWhatsapp}`} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="size-5" />
          تواصل
        </a>
        <a className={item} href={mapsUrl} target="_blank" rel="noopener noreferrer">
          <MapPin className="size-5" />
          الموقع
        </a>
        <a className={item} href="#wishes">
          <MessagesSquare className="size-5" />
          التهاني
        </a>
        <a className={`${item} bg-gold-gradient font-bold text-primary-foreground hover:brightness-110`} href="#rsvp">
          <CalendarCheck className="size-5" />
          تأكيد الحضور
        </a>
      </div>
    </nav>
  );
}
