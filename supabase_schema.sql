-- ========================================================
-- TUMU CRISP & CREAM - SUPABASE DATABASE SCHEMA
-- Execute this script in your Supabase SQL Editor
-- ========================================================

-- 1. Create FLAVORS Table
CREATE TABLE IF NOT EXISTS public.flavors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'CLASSIC',
  description TEXT,
  image TEXT NOT NULL,
  color TEXT DEFAULT 'bg-white',
  text_color TEXT DEFAULT 'text-[#1A2E44]',
  tag TEXT,
  tag_bg TEXT DEFAULT 'bg-[#1A2E44]',
  tag_text TEXT DEFAULT 'text-white',
  display_order INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create STORE LOCATIONS Table
CREATE TABLE IF NOT EXISTS public.locations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  country TEXT DEFAULT 'Japan',
  phone TEXT,
  opening_hours TEXT,
  google_maps_url TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  image TEXT,
  status TEXT DEFAULT 'Open Now',
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.flavors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

-- 4. Public Read Policies
DROP POLICY IF EXISTS "Public can view active flavors" ON public.flavors;
CREATE POLICY "Public can view active flavors" 
  ON public.flavors 
  FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Public can view active locations" ON public.locations;
CREATE POLICY "Public can view active locations" 
  ON public.locations 
  FOR SELECT 
  USING (true);

-- 5. Open insert/update/delete policies for CMS (can be restricted with Supabase Auth or admin service role)
DROP POLICY IF EXISTS "Allow all modifications for flavors" ON public.flavors;
CREATE POLICY "Allow all modifications for flavors" 
  ON public.flavors 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all modifications for locations" ON public.locations;
CREATE POLICY "Allow all modifications for locations" 
  ON public.locations 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- 6. Insert Default Initial Seed Data
INSERT INTO public.flavors (id, name, category, description, image, color, text_color, tag, tag_bg, tag_text, display_order, is_active)
VALUES 
  ('matcha_green_tea', 'Matcha Green Tea', 'ASIAN INSPIRED', 'Authentic Kyoto Uji matcha cream with an earthy and sweet profile.', '/images/tumu/flavour_v3_04_matcha_green_tea.png', 'bg-[#98FF98]', 'text-[#1A2E44]', 'Asian Inspired', 'bg-[#1A2E44]', 'text-white', 1, true),
  ('vanilla', 'Vanilla Bean Dream', 'CLASSIC', 'Classic Madagascar vanilla bean folded into rich Hokkaido cream.', '/images/tumu/flavour_v3_02_vanilla.png', 'bg-white', 'text-[#1A2E44]', 'Classic', 'bg-[#1A2E44]', 'text-white', 2, true),
  ('pistachio_crunch', 'Pistachio Crunch', 'SIGNATURE', 'Roasted Bronte pistachios blended for nutty perfection with a crunchy finish.', '/images/tumu/flavour_v3_08_pistachio_crunch.png', 'bg-[#93C572]', 'text-[#1A2E44]', 'Signature', 'bg-[#1A2E44]', 'text-white', 3, true),
  ('strawberry_bliss', 'Strawberry Bliss', 'FRUIT BLENDS', 'Sweet Japanese strawberries folded into light and velvety whipped cream.', '/images/tumu/flavour_v3_05_strawberry_bliss.png', 'bg-[#FF9999]', 'text-[#1A2E44]', 'Fruit Blends', 'bg-[#1A2E44]', 'text-white', 4, true),
  ('dark_chocolate', 'Double Dark Chocolate', 'CLASSIC', 'Single-origin cocoa blend with rich bittersweet velvety cream.', '/images/tumu/flavour_v3_01_dark_chocolate.png', 'bg-[#3D1C00]', 'text-white', 'Bestseller', 'bg-white', 'text-[#3D1C00]', 5, true),
  ('tiramisu_indulgence', 'Tiramisu Indulgence', 'SIGNATURE', 'Espresso-soaked savoiardi flavor with mascarpone cream and cocoa dust.', '/images/tumu/flavour_v3_07_tiramisu_indulgence.png', 'bg-[#C68E17]', 'text-white', 'Signature', 'bg-white', 'text-[#C68E17]', 6, true),
  ('mango_infusion', 'Mango Infusion', 'FRUIT BLENDS', 'Sun-ripened tropical mango puree swirled into refreshing cream.', '/images/tumu/flavour_v2_new_mango.png', 'bg-[#FFE066]', 'text-[#1A2E44]', 'Fruit Blends', 'bg-[#1A2E44]', 'text-white', 7, true),
  ('lotus_biscoff', 'Lotus Biscoff', 'SIGNATURE', 'Iconic caramelized biscuit butter topped with crushed crunchy Biscoff.', '/images/tumu/flavour_v3_03_lotus_biscoff.png', 'bg-[#D35400]', 'text-white', 'Signature', 'bg-white', 'text-[#D35400]', 8, true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.locations (id, name, city, address, country, phone, opening_hours, google_maps_url, latitude, longitude, image, status, is_active, display_order)
VALUES
  ('tumu-shibuya', 'TUMU Shibuya Flagship', 'Tokyo', '21-1 Udagawacho, Shibuya City, Tokyo 150-0042', 'Japan', '+81 3-5456-7890', 'Daily: 10:00 AM – 10:00 PM', 'https://www.google.com/maps/search/?api=1&query=Shibuya+Crossing+Tokyo', 35.6595, 139.7005, '/images/tumu/franchise_new_1.jpg', 'Open Now', true, 1),
  ('tumu-ginza', 'TUMU Ginza Six Mall', 'Tokyo', '6-10-1 Ginza, Chuo City, Tokyo 104-0061', 'Japan', '+81 3-6263-8888', 'Daily: 10:30 AM – 8:30 PM', 'https://www.google.com/maps/search/?api=1&query=Ginza+Six+Tokyo', 35.6696, 139.7644, '/images/tumu/franchise_new_2.jpg', 'Open Now', true, 2),
  ('tumu-marina-bay', 'TUMU Marina Bay Sands Kiosk', 'Singapore', '10 Bayfront Ave, #B2-K12 The Shoppes, Singapore 018956', 'Singapore', '+65 6688 8868', 'Mon – Sun: 10:00 AM – 11:00 PM', 'https://www.google.com/maps/search/?api=1&query=Marina+Bay+Sands+Singapore', 1.2847, 103.8610, '/images/tumu/franchise_kiosk_cyan.jpg', 'Open Now', true, 3),
  ('tumu-dubai-mall', 'TUMU The Dubai Mall', 'Dubai', 'Financial Centre Rd, Downtown Dubai - Level 1 Near Ice Rink', 'UAE', '+971 4 362 7500', 'Daily: 10:00 AM – Midnight', 'https://www.google.com/maps/search/?api=1&query=The+Dubai+Mall+Downtown+Dubai', 25.1972, 55.2744, '/images/tumu/franchise_new_3.jpg', 'Coming Soon', true, 4)
ON CONFLICT (id) DO NOTHING;
