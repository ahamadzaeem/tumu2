import { createClient } from "@supabase/supabase-js";

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Types
export interface Flavor {
  id: string;
  name: string;
  category: string;
  description?: string;
  image: string;
  color?: string;
  textColor?: string;
  tag?: string;
  tagBg?: string;
  tagText?: string;
  display_order?: number;
  is_active?: boolean;
}

export interface StoreLocation {
  id: string;
  name: string;
  city: string;
  address: string;
  country?: string;
  phone?: string;
  opening_hours?: string;
  hours?: string;
  google_maps_url: string;
  map_embed_url?: string;
  latitude?: number;
  longitude?: number;
  image?: string;
  status?: "Open Now" | "Coming Soon" | "Renovating";
  is_active?: boolean;
  display_order?: number;
}

// Curated default initial data for seamless fallback
export const DEFAULT_FLAVORS: Flavor[] = [
  {
    id: "matcha_green_tea",
    name: "Matcha Green Tea",
    category: "ASIAN INSPIRED",
    description: "Authentic Kyoto Uji matcha cream with an earthy and sweet profile.",
    image: "/images/tumu/flavour_v3_04_matcha_green_tea.png",
    color: "bg-[#98FF98]",
    textColor: "text-[#1A2E44]",
    tag: "Asian Inspired",
    tagBg: "bg-[#1A2E44]",
    tagText: "text-white",
    display_order: 1,
    is_active: true
  },
  {
    id: "vanilla",
    name: "Vanilla Bean Dream",
    category: "CLASSIC",
    description: "Classic Madagascar vanilla bean folded into rich Hokkaido cream.",
    image: "/images/tumu/flavour_v3_02_vanilla.png",
    color: "bg-white",
    textColor: "text-[#1A2E44]",
    tag: "Classic",
    tagBg: "bg-[#1A2E44]",
    tagText: "text-white",
    display_order: 2,
    is_active: true
  },
  {
    id: "pistachio_crunch",
    name: "Pistachio Crunch",
    category: "SIGNATURE",
    description: "Roasted Bronte pistachios blended for nutty perfection with a crunchy finish.",
    image: "/images/tumu/flavour_v3_08_pistachio_crunch.png",
    color: "bg-[#93C572]",
    textColor: "text-[#1A2E44]",
    tag: "Signature",
    tagBg: "bg-[#1A2E44]",
    tagText: "text-white",
    display_order: 3,
    is_active: true
  },
  {
    id: "strawberry_bliss",
    name: "Strawberry Bliss",
    category: "FRUIT BLENDS",
    description: "Sweet Japanese strawberries folded into light and velvety whipped cream.",
    image: "/images/tumu/flavour_v3_05_strawberry_bliss.png",
    color: "bg-[#FF9999]",
    textColor: "text-[#1A2E44]",
    tag: "Fruit Blends",
    tagBg: "bg-[#1A2E44]",
    tagText: "text-white",
    display_order: 4,
    is_active: true
  },
  {
    id: "dark_chocolate",
    name: "Double Dark Chocolate",
    category: "CLASSIC",
    description: "Single-origin cocoa blend with rich bittersweet velvety cream.",
    image: "/images/tumu/flavour_v3_01_dark_chocolate.png",
    color: "bg-[#3D1C00]",
    textColor: "text-white",
    tag: "Bestseller",
    tagBg: "bg-white",
    tagText: "text-[#3D1C00]",
    display_order: 5,
    is_active: true
  },
  {
    id: "tiramisu_indulgence",
    name: "Tiramisu Indulgence",
    category: "SIGNATURE",
    description: "Espresso-soaked savoiardi flavor with mascarpone cream and cocoa dust.",
    image: "/images/tumu/flavour_v3_07_tiramisu_indulgence.png",
    color: "bg-[#C68E17]",
    textColor: "text-white",
    tag: "Signature",
    tagBg: "bg-white",
    tagText: "text-[#C68E17]",
    display_order: 6,
    is_active: true
  },
  {
    id: "mango_infusion",
    name: "Mango Infusion",
    category: "FRUIT BLENDS",
    description: "Sun-ripened tropical mango puree swirled into refreshing cream.",
    image: "/images/tumu/flavour_v2_new_mango.png",
    color: "bg-[#FFE066]",
    textColor: "text-[#1A2E44]",
    tag: "Fruit Blends",
    tagBg: "bg-[#1A2E44]",
    tagText: "text-white",
    display_order: 7,
    is_active: true
  },
  {
    id: "lotus_biscoff",
    name: "Lotus Biscoff",
    category: "SIGNATURE",
    description: "Iconic caramelized biscuit butter topped with crushed crunchy Biscoff.",
    image: "/images/tumu/flavour_v3_03_lotus_biscoff.png",
    color: "bg-[#D35400]",
    textColor: "text-white",
    tag: "Signature",
    tagBg: "bg-white",
    tagText: "text-[#D35400]",
    display_order: 8,
    is_active: true
  }
];

export const DEFAULT_LOCATIONS: StoreLocation[] = [
  {
    id: "tumu-shibuya",
    name: "TUMU Shibuya Flagship",
    city: "Tokyo",
    country: "Japan",
    address: "21-1 Udagawacho, Shibuya City, Tokyo 150-0042",
    phone: "+81 3-5456-7890",
    opening_hours: "Daily: 10:00 AM – 10:00 PM",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=Shibuya+Crossing+Tokyo",
    latitude: 35.6595,
    longitude: 139.7005,
    image: "/images/tumu/franchise_new_1.jpg",
    status: "Open Now",
    is_active: true,
    display_order: 1
  },
  {
    id: "tumu-ginza",
    name: "TUMU Ginza Six Mall",
    city: "Tokyo",
    country: "Japan",
    address: "6-10-1 Ginza, Chuo City, Tokyo 104-0061",
    phone: "+81 3-6263-8888",
    opening_hours: "Daily: 10:30 AM – 8:30 PM",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=Ginza+Six+Tokyo",
    latitude: 35.6696,
    longitude: 139.7644,
    image: "/images/tumu/franchise_new_2.jpg",
    status: "Open Now",
    is_active: true,
    display_order: 2
  },
  {
    id: "tumu-marina-bay",
    name: "TUMU Marina Bay Sands Kiosk",
    city: "Singapore",
    country: "Singapore",
    address: "10 Bayfront Ave, #B2-K12 The Shoppes, Singapore 018956",
    phone: "+65 6688 8868",
    opening_hours: "Mon – Sun: 10:00 AM – 11:00 PM",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=Marina+Bay+Sands+Singapore",
    latitude: 1.2847,
    longitude: 103.8610,
    image: "/images/tumu/franchise_kiosk_cyan.jpg",
    status: "Open Now",
    is_active: true,
    display_order: 3
  },
  {
    id: "tumu-dubai-mall",
    name: "TUMU The Dubai Mall",
    city: "Dubai",
    country: "UAE",
    address: "Financial Centre Rd, Downtown Dubai - Level 1 Near Ice Rink",
    phone: "+971 4 362 7500",
    opening_hours: "Daily: 10:00 AM – Midnight",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=The+Dubai+Mall+Downtown+Dubai",
    latitude: 25.1972,
    longitude: 55.2744,
    image: "/images/tumu/franchise_new_3.jpg",
    status: "Coming Soon",
    is_active: true,
    display_order: 4
  }
];

// Helper Fetch Functions
export async function fetchFlavors(): Promise<Flavor[]> {
  if (!supabase) return DEFAULT_FLAVORS;

  try {
    const { data, error } = await supabase
      .from("flavors")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_FLAVORS;
    }
    return data as Flavor[];
  } catch (err) {
    console.error("Failed to fetch flavors from Supabase, using defaults:", err);
    return DEFAULT_FLAVORS;
  }
}

export async function fetchAllFlavorsAdmin(): Promise<Flavor[]> {
  if (!supabase) return DEFAULT_FLAVORS;

  try {
    const { data, error } = await supabase
      .from("flavors")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data) {
      return DEFAULT_FLAVORS;
    }
    return data as Flavor[];
  } catch (err) {
    console.error("Failed to fetch admin flavors:", err);
    return DEFAULT_FLAVORS;
  }
}

export async function fetchLocations(): Promise<StoreLocation[]> {
  if (!supabase) return DEFAULT_LOCATIONS;

  try {
    const { data, error } = await supabase
      .from("locations")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_LOCATIONS;
    }
    return data as StoreLocation[];
  } catch (err) {
    console.error("Failed to fetch locations from Supabase, using defaults:", err);
    return DEFAULT_LOCATIONS;
  }
}

export async function fetchAllLocationsAdmin(): Promise<StoreLocation[]> {
  if (!supabase) return DEFAULT_LOCATIONS;

  try {
    const { data, error } = await supabase
      .from("locations")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data) {
      return DEFAULT_LOCATIONS;
    }
    return data as StoreLocation[];
  } catch (err) {
    console.error("Failed to fetch admin locations:", err);
    return DEFAULT_LOCATIONS;
  }
}
