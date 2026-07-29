import { practiceInfo } from '../data/content';

export interface ClinicStatus {
  isOpen: boolean;
  statusTextSq: string;
  statusTextEn: string;
  nextOpenTextSq: string;
  nextOpenTextEn: string;
  currentDayNameSq: string;
  currentDayNameEn: string;
  currentDayIndex: number;
}

export function getClinicCurrentStatus(): ClinicStatus {
  // Kosovo is Europe/Tirane or Europe/Belgrade (UTC+1 winter / UTC+2 summer)
  const now = new Date();
  
  // Format options for Europe/Tirane time
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Europe/Tirane',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(now);
  
  let dayOfWeekStr = 'Mon';
  let hour = 12;
  let minute = 0;

  for (const part of parts) {
    if (part.type === 'weekday') dayOfWeekStr = part.value;
    if (part.type === 'hour') hour = parseInt(part.value, 10);
    if (part.type === 'minute') minute = parseInt(part.value, 10);
  }

  // Convert weekday string to JS day index (0 = Sun, 1 = Mon, ... 6 = Sat)
  const dayMap: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6
  };
  const currentDayIndex = dayMap[dayOfWeekStr] ?? now.getDay();

  const dayInfo = practiceInfo.workingHours.find((h) => h.dayIndex === currentDayIndex);
  
  const currentMinutes = hour * 60 + minute;
  const openMinutes = 10 * 60; // 10:00 AM
  const closeMinutes = 18 * 60; // 18:00 (6:00 PM)

  let isOpen = false;

  if (dayInfo && !dayInfo.isClosed) {
    if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
      isOpen = true;
    }
  }

  const currentDayNameSq = dayInfo?.daySq || 'Sot';
  const currentDayNameEn = dayInfo?.dayEn || 'Today';

  let nextOpenTextSq = 'Hapet të hënën në 10:00';
  let nextOpenTextEn = 'Opens Monday at 10:00';

  if (!isOpen) {
    if (currentDayIndex >= 1 && currentDayIndex <= 5) {
      if (currentMinutes < openMinutes) {
        nextOpenTextSq = `Hapet sot në 10:00`;
        nextOpenTextEn = `Opens today at 10:00`;
      } else {
        if (currentDayIndex === 5) {
          nextOpenTextSq = `Hapet të hënën në 10:00`;
          nextOpenTextEn = `Opens Monday at 10:00`;
        } else {
          nextOpenTextSq = `Hapet nesër në 10:00`;
          nextOpenTextEn = `Opens tomorrow at 10:00`;
        }
      }
    } else {
      nextOpenTextSq = `Hapet të hënën në 10:00`;
      nextOpenTextEn = `Opens Monday at 10:00`;
    }
  }

  return {
    isOpen,
    statusTextSq: isOpen ? 'HAPUR TANI' : 'MBYLLUR TANI',
    statusTextEn: isOpen ? 'OPEN NOW' : 'CLOSED NOW',
    nextOpenTextSq,
    nextOpenTextEn,
    currentDayNameSq,
    currentDayNameEn,
    currentDayIndex,
  };
}

export function generateWhatsAppLink(
  fullName?: string,
  phone?: string,
  serviceTitle?: string,
  preferredDate?: string,
  preferredTime?: string,
  notes?: string
): string {
  const doctorNum = practiceInfo.whatsappNumber; // 38348872828
  
  let message = `Përshëndetje Dr. Fitore Arifi Sinani,\n\nDëshiroj të caktoj një termin për vizitë mjekësore.`;
  
  if (fullName && fullName.trim()) {
    message += `\n👤 Emri: ${fullName.trim()}`;
  }
  if (phone && phone.trim()) {
    message += `\n📞 Tel: ${phone.trim()}`;
  }
  if (serviceTitle && serviceTitle.trim()) {
    message += `\n🩺 Shërbimi: ${serviceTitle.trim()}`;
  }
  if (preferredDate && preferredDate.trim()) {
    message += `\n📅 Data: ${preferredDate.trim()}`;
  }
  if (preferredTime && preferredTime.trim()) {
    message += `\n⏰ Ora: ${preferredTime.trim()}`;
  }
  if (notes && notes.trim()) {
    message += `\n📝 Shënime: ${notes.trim()}`;
  }

  message += `\n\nJu lutem më konfirmoni nëse kjo kohë është e lirë. Ju faleminderit!`;

  return `https://wa.me/${doctorNum}?text=${encodeURIComponent(message)}`;
}
