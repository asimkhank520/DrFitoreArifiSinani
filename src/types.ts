export type Language = 'sq' | 'en';

export interface WorkingHour {
  daySq: string;
  dayEn: string;
  hours: string;
  isClosed: boolean;
  dayIndex: number; // 0 = Sun, 1 = Mon, ..., 6 = Sat
}

export interface ServiceItem {
  id: string;
  titleSq: string;
  titleEn: string;
  descriptionSq: string;
  descriptionEn: string;
  iconName: string;
  duration: string;
}

export interface PracticeInfo {
  doctorName: string;
  titleSq: string;
  titleEn: string;
  phoneDisplay: string;
  phoneRaw: string;
  whatsappNumber: string;
  email: string;
  address: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
    fullFormatted: string;
    mapQuery: string;
  };
  workingHours: WorkingHour[];
  facebookUrl: string;
  instagramUrl: string;
}

export interface AppointmentFormData {
  fullName: string;
  phone: string;
  serviceId: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}
