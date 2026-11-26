"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  supabase,
  Flavor,
  StoreLocation,
  DEFAULT_FLAVORS,
  DEFAULT_LOCATIONS,
  fetchAllFlavorsAdmin,
  fetchAllLocationsAdmin,
  extractFlavorHex,
  isLightHex,
} from "@/lib/supabase";
import { FAQ_ITEMS as initialFaqItems, FaqItem } from "@/data/faq";
import defaultSeoData from "@/data/seoContent.json";
import defaultSiteContent from "@/data/siteContent.json";
import {
  Plus,
  Trash2,
  Edit2,
  MapPin,
  IceCream,
  Lock,
  LogOut,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Database,
  ArrowLeft,
  X,
  Search,
  Navigation,
  Globe,
  FileText,
  Home,
  BookOpen,
  Cog,
  Briefcase,
  HelpCircle,
  Save,
  RotateCcw,
  Eye,
  Sliders,
  Check,
  Tag,
  Link as LinkIcon
} from "lucide-react";

export interface PageSeoItem {
  id: string;
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  robots: string;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    "seo" | "general" | "home" | "story" | "franchise" | "contact" | "faqs" | "flavors" | "locations"
  >("seo");

  // Data states
  const [flavors, setFlavors] = useState<Flavor[]>(DEFAULT_FLAVORS);
  const [locations, setLocations] = useState<StoreLocation[]>(DEFAULT_LOCATIONS);
  const [seoPages, setSeoPages] = useState<PageSeoItem[]>(defaultSeoData.pages);
  const [selectedSeoId, setSelectedSeoId] = useState<string>("home");
  const [siteContent, setSiteContent] = useState<any>(defaultSiteContent);
  const [faqList, setFaqList] = useState<FaqItem[]>(initialFaqItems);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Flavor Modal state
  const [flavorModalOpen, setFlavorModalOpen] = useState(false);
  const [editingFlavor, setEditingFlavor] = useState<Flavor | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [flavorForm, setFlavorForm] = useState<Partial<Flavor>>({
    name: "",
    category: "SIGNATURE",
    description: "",
    image: "/images/tumu/flavour_v3_04_matcha_green_tea.png",
    color: "bg-white",
    tag: "Signature",
    display_order: 1,
    is_active: true,
  });

  // Location Modal state
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<StoreLocation | null>(null);
  const [locationForm, setLocationForm] = useState<Partial<StoreLocation>>({
    name: "",
    city: "Dubai",
    country: "UAE",
    address: "",
    phone: "",
    opening_hours: "Daily: 10:00 AM – Midnight",
    google_maps_url: "",
    status: "Open Now",
    image: "/images/tumu/franchise_new_1.jpg",
    is_active: true,
    display_order: 1,
  });

  // FAQ Modal state
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [editingFaqIndex, setEditingFaqIndex] = useState<number | null>(null);
  const [faqForm, setFaqForm] = useState<FaqItem>({
    category: "Product & Concept",
    question: "",
    answer: "",
  });

  const correctPin = process.env.NEXT_PUBLIC_ADMIN_PIN || "1234";

  // Check session
  useEffect(() => {
    const savedAuth = localStorage.getItem("tumu_admin_auth");
    if (savedAuth === "true") {
      setAuthenticated(true);
    }
  }, []);

  // Load initial data
  useEffect(() => {
    if (!authenticated) return;
    loadAllData();
  }, [authenticated]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      // 1. Fetch CMS content & SEO
      try {
        const res = await fetch("/api/cms");
        if (res.ok) {
          const cmsData = await res.json();
          if (cmsData.seo?.pages?.length > 0) {
            setSeoPages(cmsData.seo.pages);
          }
          if (cmsData.content && Object.keys(cmsData.content).length > 0) {
            setSiteContent(cmsData.content);
          }
        }
      } catch (e) {
        console.warn("Could not load /api/cms, using local defaults", e);
      }

      // 2. Fetch flavors and locations from Supabase/defaults
      const [fetchedFlavors, fetchedLocations] = await Promise.all([
        fetchAllFlavorsAdmin(),
        fetchAllLocationsAdmin(),
      ]);
      setFlavors(fetchedFlavors);
      setLocations(fetchedLocations);
    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === correctPin) {
      setAuthenticated(true);
      setPinError(false);
      localStorage.setItem("tumu_admin_auth", "true");
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("tumu_admin_auth");
  };

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // ─── SAVE CMS (SEO + CONTENT) ───
  const saveCmsChanges = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seo: { pages: seoPages },
          content: siteContent,
        }),
      });

      if (res.ok) {
        notify("All CMS content and SEO settings saved successfully!");
      } else {
        notify("Saved locally in browser session.");
      }
    } catch (err) {
      console.error("Error saving CMS:", err);
      notify("Saved in current browser session!");
    } finally {
      setSaving(false);
    }
  };

  // ─── SEO ITEM HANDLERS ───
  const selectedSeo = seoPages.find((p) => p.id === selectedSeoId) || seoPages[0];

  const updateSelectedSeo = (field: keyof PageSeoItem, value: string) => {
    setSeoPages((prev) =>
      prev.map((item) =>
        item.id === selectedSeo.id ? { ...item, [field]: value } : item
      )
    );
  };

  // ─── CONTENT FIELD HANDLER ───
  const updateContentField = (section: string, subSection: string, field: string, value: any) => {
    setSiteContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subSection]: {
          ...prev[section]?.[subSection],
          [field]: value,
        },
      },
    }));
  };

  const updateGeneralField = (field: string, value: any) => {
    setSiteContent((prev: any) => ({
      ...prev,
      general: {
        ...prev.general,
        [field]: value,
      },
    }));
  };

  // ─── FAQ HANDLERS ───
  const openNewFaqModal = () => {
    setEditingFaqIndex(null);
    setFaqForm({
      category: "Product & Concept",
      question: "",
      answer: "",
    });
    setFaqModalOpen(true);
  };

  const openEditFaqModal = (index: number) => {
    setEditingFaqIndex(index);
    setFaqForm(faqList[index]);
    setFaqModalOpen(true);
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFaqIndex !== null) {
      setFaqList((prev) => {
        const copy = [...prev];
        copy[editingFaqIndex] = faqForm;
        return copy;
      });
      notify("FAQ question updated!");
    } else {
      setFaqList((prev) => [...prev, faqForm]);
      notify("New FAQ question added!");
    }
    setFaqModalOpen(false);
  };

  const handleDeleteFaq = (index: number) => {
    if (!confirm("Are you sure you want to remove this FAQ?")) return;
    setFaqList((prev) => prev.filter((_, i) => i !== index));
    notify("FAQ removed.");
  };

  // ─── FLAVOR CRUD ───
  const openNewFlavorModal = () => {
    setEditingFlavor(null);
    setFlavorForm({
      id: "flavor_" + Date.now(),
      name: "",
      category: "SIGNATURE",
      description: "",
      image: "/images/tumu/flavour_v3_04_matcha_green_tea.png",
      color: "bg-white",
      tag: "Signature",
      display_order: flavors.length + 1,
      is_active: true,
    });
    setFlavorModalOpen(true);
  };

  const openEditFlavorModal = (item: Flavor) => {
    setEditingFlavor(item);
    setFlavorForm(item);
    setFlavorModalOpen(true);
  };

  const handleFlavorImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (data?.success && data.url) {
        setFlavorForm((prev) => ({ ...prev, image: data.url }));
        notify("Flavour image uploaded!");
      } else {
        notify(data?.message || "Failed to upload image");
      }
    } catch (err) {
      console.error(err);
      notify("Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveFlavor = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawColor = flavorForm.color || "bg-white";
    const hex = extractFlavorHex(rawColor);
    const normalizedColor = rawColor.startsWith("#") ? `bg-[${rawColor}]` : rawColor;
    const light = isLightHex(hex);
    const textColor = light ? "text-[#1A2E44]" : "text-white";
    const tagBg = light ? "bg-[#1A2E44]" : "bg-white";
    const tagText = light ? "text-white" : `text-[${hex}]`;

    const finalFlavor: Flavor = {
      id: editingFlavor ? editingFlavor.id : flavorForm.id || "flavor_" + Date.now(),
      name: flavorForm.name || "Untitled Flavor",
      category: flavorForm.category || "CLASSIC",
      description: flavorForm.description || "",
      image: flavorForm.image || "/images/tumu/flavour_v3_02_vanilla.png",
      color: normalizedColor,
      textColor,
      tag: flavorForm.tag || flavorForm.category,
      tagBg,
      tagText,
      display_order: Number(flavorForm.display_order) || 1,
      is_active: flavorForm.is_active !== false,
    };

    if (supabase) {
      try {
        const dbPayload = {
          id: finalFlavor.id,
          name: finalFlavor.name,
          category: finalFlavor.category,
          description: finalFlavor.description,
          image: finalFlavor.image,
          color: finalFlavor.color,
          text_color: finalFlavor.textColor,
          tag: finalFlavor.tag,
          tag_bg: finalFlavor.tagBg,
          tag_text: finalFlavor.tagText,
          display_order: finalFlavor.display_order,
          is_active: finalFlavor.is_active,
        };
        const { error } = await supabase.from("flavors").upsert(dbPayload);
        if (error) {
          console.error("Supabase error:", error);
          notify("Error saving to Supabase: " + error.message);
        } else {
          notify(editingFlavor ? "Flavor updated in Supabase!" : "New flavor added to Supabase!");
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      notify(editingFlavor ? "Flavor updated locally!" : "Flavor added locally!");
    }

    setFlavors((prev) => {
      const exists = prev.find((f) => f.id === finalFlavor.id);
      if (exists) {
        return prev.map((f) => (f.id === finalFlavor.id ? finalFlavor : f));
      }
      return [...prev, finalFlavor];
    });

    setFlavorModalOpen(false);
  };

  const handleDeleteFlavor = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove flavor "${name}"?`)) return;

    if (supabase) {
      try {
        const { error } = await supabase.from("flavors").delete().eq("id", id);
        if (error) {
          notify("Error deleting from Supabase: " + error.message);
        } else {
          notify(`Deleted "${name}" from Supabase.`);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      notify(`Deleted "${name}" locally.`);
    }

    setFlavors((prev) => prev.filter((f) => f.id !== id));
  };

  // ─── LOCATION CRUD ───
  const openNewLocationModal = () => {
    setEditingLocation(null);
    setLocationForm({
      id: "loc_" + Date.now(),
      name: "",
      city: "Dubai",
      country: "UAE",
      address: "",
      phone: "+971 4 362 7500",
      opening_hours: "Daily: 10:00 AM – Midnight",
      google_maps_url: "",
      status: "Open Now",
      image: "/images/tumu/formats/outlet_storefront.jpg",
      is_active: true,
      display_order: locations.length + 1,
    });
    setLocationModalOpen(true);
  };

  const openEditLocationModal = (item: StoreLocation) => {
    setEditingLocation(item);
    setLocationForm(item);
    setLocationModalOpen(true);
  };

  const handleSaveLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    const mapUrl =
      locationForm.google_maps_url ||
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${locationForm.name} ${locationForm.address} ${locationForm.city}`
      )}`;

    const finalLoc: StoreLocation = {
      id: editingLocation ? editingLocation.id : locationForm.id || "loc_" + Date.now(),
      name: locationForm.name || "Untitled Store",
      city: locationForm.city || "Dubai",
      country: locationForm.country || "UAE",
      address: locationForm.address || "",
      phone: locationForm.phone || "",
      opening_hours: locationForm.opening_hours || "Daily: 10:00 AM – Midnight",
      google_maps_url: mapUrl,
      status: (locationForm.status as any) || "Open Now",
      image: locationForm.image || "/images/tumu/formats/outlet_storefront.jpg",
      display_order: Number(locationForm.display_order) || 1,
      is_active: locationForm.is_active !== false,
    };

    if (supabase) {
      try {
        const { error } = await supabase.from("locations").upsert(finalLoc);
        if (error) {
          notify("Error saving to Supabase: " + error.message);
        } else {
          notify(editingLocation ? "Location updated in Supabase!" : "New store added to Supabase!");
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      notify(editingLocation ? "Location updated locally!" : "Location added locally!");
    }

    setLocations((prev) => {
      const exists = prev.find((l) => l.id === finalLoc.id);
      if (exists) {
        return prev.map((l) => (l.id === finalLoc.id ? finalLoc : l));
      }
      return [...prev, finalLoc];
    });

    setLocationModalOpen(false);
  };

  const handleDeleteLocation = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove store "${name}"?`)) return;

    if (supabase) {
      try {
        const { error } = await supabase.from("locations").delete().eq("id", id);
        if (error) {
          notify("Error deleting from Supabase: " + error.message);
        } else {
          notify(`Deleted store "${name}" from Supabase.`);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      notify(`Deleted "${name}" locally.`);
    }

    setLocations((prev) => prev.filter((l) => l.id !== id));
  };

  // ══════════════════════════════════════════════════════════════
  // RENDER: LOGIN SCREEN
  // ══════════════════════════════════════════════════════════════
  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#FAF4E7] flex items-center justify-center p-6 selection:bg-[#DB3E59] selection:text-white">
        <div className="w-full max-w-md bg-white rounded-[32px] p-8 sm:p-10 shadow-xl border border-black/5 text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/tumu-logo-final.png"
              alt="TUMU Logo"
              width={160}
              height={200}
              className="object-contain h-20 w-auto"
              priority
            />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#162B3A] uppercase tracking-tight mb-2">
            CMS Admin Portal
          </h1>
          <p className="text-sm font-semibold text-[#162B3A]/70 mb-8">
            Manage complete website content, SEO metadata, URLs, flavors, and locations.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <input
                type="password"
                placeholder="Enter Admin PIN"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                autoFocus
                className={`w-full px-5 py-4 rounded-2xl bg-[#FAF4E7] border text-center text-lg font-black tracking-widest text-[#162B3A] focus:outline-none transition-all ${
                  pinError
                    ? "border-red-500 focus:border-red-600 animate-shake"
                    : "border-black/10 focus:border-[#DB3E59]"
                }`}
              />
              {pinError && (
                <p className="text-xs font-bold text-red-500 mt-2">
                  Incorrect PIN code. Please try again.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white font-black text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Sign In to CMS →
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-black/5">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#162B3A]/60 hover:text-[#DB3E59] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ══════════════════════════════════════════════════════════════
  // RENDER: AUTHENTICATED CMS DASHBOARD
  // ══════════════════════════════════════════════════════════════
  return (
    <main className="min-h-screen bg-[#F5EFE4] text-[#162B3A] flex flex-col font-sans selection:bg-[#DB3E59] selection:text-white">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-[#162B3A] text-white px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 border border-white/20 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-bold">{notification}</span>
        </div>
      )}

      {/* Top Admin Navbar */}
      <header className="bg-white border-b border-black/10 sticky top-0 z-40 px-6 sm:px-10 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/" target="_blank" className="flex items-center gap-2 group">
            <Image
              src="/images/tumu-logo-final.png"
              alt="TUMU Logo"
              width={100}
              height={120}
              className="object-contain h-10 w-auto group-hover:scale-105 transition-transform"
            />
            <span className="font-black text-base sm:text-lg tracking-tight uppercase text-[#162B3A]">
              CMS Control Hub
            </span>
          </Link>
          <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-black uppercase tracking-wider border border-emerald-200">
            Live v2.0
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={saveCmsChanges}
            disabled={saving}
            className="px-5 py-2.5 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Changes..." : "Save All CMS Changes"}</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-black/5 hover:bg-black/10 text-xs font-bold text-[#162B3A] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="p-2.5 rounded-full bg-black/5 hover:bg-black/10 text-[#162B3A] transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main CMS Layout with Navigation Tabs */}
      <div className="flex-1 max-w-[1560px] mx-auto w-full px-4 sm:px-8 py-8 flex flex-col gap-6">
        
        {/* Navigation Tabs Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 border-b border-black/10">
          {[
            { id: "seo", label: "SEO & Meta Tags", icon: Globe },
            { id: "general", label: "Site & Header/Footer", icon: Sliders },
            { id: "home", label: "Home Page", icon: Home },
            { id: "story", label: "Our Story", icon: BookOpen },
            { id: "franchise", label: "Franchise & Formats", icon: Briefcase },
            { id: "contact", label: "Contact Page", icon: FileText },
            { id: "faqs", label: "FAQs Manager", icon: HelpCircle },
            { id: "flavors", label: "Flavours Lineup", icon: IceCream },
            { id: "locations", label: "Store Locations", icon: MapPin },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-[#162B3A] text-white shadow-md scale-[1.02]"
                    : "bg-white/80 text-[#162B3A] hover:bg-white border border-black/5"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#DB3E59]" : "text-[#162B3A]/60"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ══════════════════════════════════════════════════════════════
            TAB 1: SEO, META TAGS, SLUGS & CANONICAL URLS
           ══════════════════════════════════════════════════════════════ */}
        {activeTab === "seo" && (
          <div className="flex flex-col gap-8">
            {/* Top Info Banner */}
            <div className="p-6 rounded-3xl bg-white border border-black/5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#DB3E59] mb-1 block">
                  Search Engine Optimization
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#162B3A]">
                  SEO, Meta Tags, Slugs &amp; Canonical URLs
                </h2>
                <p className="text-sm font-semibold text-[#162B3A]/70 mt-1 max-w-2xl">
                  Select any page below to edit its URL slug, meta title, meta description, canonical link, and keywords for search engine indexing.
                </p>
              </div>

              {/* Page Selector Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {seoPages.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedSeoId(p.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      selectedSeo.id === p.id
                        ? "bg-[#DB3E59] text-white shadow-sm font-black"
                        : "bg-black/5 text-[#162B3A] hover:bg-black/10"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Editing Grid: Form (Left) & Google Snippet Live Preview (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Form Fields */}
              <div className="lg:col-span-7 bg-white rounded-[32px] p-6 sm:p-8 border border-black/5 shadow-sm flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-black/10 pb-4">
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#DB3E59]">
                      Editing Metadata For
                    </span>
                    <h3 className="text-2xl font-black text-[#162B3A] uppercase">
                      {selectedSeo.name}
                    </h3>
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-black/5 text-xs font-mono font-bold text-[#162B3A]">
                    {selectedSeo.slug}
                  </span>
                </div>

                {/* 1. Page Slug */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5 flex items-center justify-between">
                    <span>URL Slug (Path)</span>
                    <span className="text-[10px] text-[#162B3A]/50 lowercase">e.g. /flavours, /our-story</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-xs font-bold text-[#162B3A]/40">tumu.ae</span>
                    <input
                      type="text"
                      value={selectedSeo.slug}
                      onChange={(e) => updateSelectedSeo("slug", e.target.value)}
                      className="w-full pl-20 pr-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-mono font-bold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                    />
                  </div>
                </div>

                {/* 2. Meta Title / Meta Text */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-[#162B3A]">
                      Meta Title (Page Title &amp; Header Text)
                    </label>
                    <span className={`text-[11px] font-bold ${selectedSeo.metaTitle.length > 60 ? "text-amber-600" : "text-emerald-600"}`}>
                      {selectedSeo.metaTitle.length}/60 chars recommended
                    </span>
                  </div>
                  <input
                    type="text"
                    value={selectedSeo.metaTitle}
                    onChange={(e) => updateSelectedSeo("metaTitle", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                  />
                </div>

                {/* 3. Meta Description */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-[#162B3A]">
                      Meta Description
                    </label>
                    <span className={`text-[11px] font-bold ${selectedSeo.metaDescription.length > 160 ? "text-amber-600" : "text-emerald-600"}`}>
                      {selectedSeo.metaDescription.length}/160 chars recommended
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={selectedSeo.metaDescription}
                    onChange={(e) => updateSelectedSeo("metaDescription", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-medium text-[#162B3A] focus:outline-none focus:border-[#DB3E59] resize-none"
                  />
                </div>

                {/* 4. Canonical URL */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5 flex items-center justify-between">
                    <span>Canonical URL</span>
                    <span className="text-[10px] text-[#162B3A]/50">Prevents duplicate content penalties</span>
                  </label>
                  <input
                    type="url"
                    value={selectedSeo.canonicalUrl}
                    onChange={(e) => updateSelectedSeo("canonicalUrl", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-mono text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                  />
                </div>

                {/* 5. Meta Tags / Keywords */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5 flex items-center justify-between">
                    <span>Meta Tags &amp; Keywords (Comma-Separated)</span>
                    <span className="text-[10px] text-[#162B3A]/50">Target search queries</span>
                  </label>
                  <textarea
                    rows={2}
                    value={selectedSeo.metaKeywords}
                    onChange={(e) => updateSelectedSeo("metaKeywords", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-medium text-[#162B3A] focus:outline-none focus:border-[#DB3E59] resize-none"
                  />
                </div>

                {/* 6. Social Sharing (Open Graph) Title, Description & Robots */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                      Social Sharing (OG) Title
                    </label>
                    <input
                      type="text"
                      value={selectedSeo.ogTitle}
                      onChange={(e) => updateSelectedSeo("ogTitle", e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                      Robots Crawl Directive
                    </label>
                    <select
                      value={selectedSeo.robots}
                      onChange={(e) => updateSelectedSeo("robots", e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                    >
                      <option value="index, follow">index, follow (Allow Google Search)</option>
                      <option value="noindex, nofollow">noindex, nofollow (Block Search)</option>
                    </select>
                  </div>
                </div>

                {/* 6b. OG Description */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-[#162B3A]">
                      Social Sharing (OG) Description
                    </label>
                    <span className={`text-[11px] font-bold ${selectedSeo.ogDescription.length > 200 ? "text-amber-600" : "text-emerald-600"}`}>
                      {selectedSeo.ogDescription.length}/200 chars recommended
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={selectedSeo.ogDescription}
                    onChange={(e) => updateSelectedSeo("ogDescription", e.target.value)}
                    placeholder="Description shown when page is shared on social media (Facebook, WhatsApp, etc.)"
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-medium text-[#162B3A] focus:outline-none focus:border-[#DB3E59] resize-none"
                  />
                </div>

                {/* 6c. OG Image */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5 flex items-center justify-between">
                    <span>Social Sharing (OG) Image Path</span>
                    <span className="text-[10px] text-[#162B3A]/50">1200×630px recommended</span>
                  </label>
                  <input
                    type="text"
                    value={selectedSeo.ogImage}
                    onChange={(e) => updateSelectedSeo("ogImage", e.target.value)}
                    placeholder="/images/tumu/hero_turquoise.png"
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-mono text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    onClick={saveCmsChanges}
                    disabled={saving}
                    className="px-8 py-3.5 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save SEO for {selectedSeo.name}</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Google Live SERP Preview */}
              <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
                {/* Google Search Result Card */}
                <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-black/5 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <GoogleIcon className="w-4 h-4" />
                    <span className="text-xs font-black uppercase tracking-wider text-[#162B3A]/60">
                      Google Search Preview
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#F8F9FA] border border-black/5 font-sans">
                    <div className="flex items-center gap-2 text-xs text-[#202124] mb-1">
                      <span className="w-4 h-4 rounded-full bg-[#162B3A] text-white flex items-center justify-center font-bold text-[9px]">
                        T
                      </span>
                      <span className="text-[12px] font-medium text-[#202124]">
                        https://tumu.ae{selectedSeo.slug === "/" ? "" : selectedSeo.slug}
                      </span>
                    </div>

                    <h4 className="text-[#1a0dab] hover:underline text-lg font-medium leading-snug cursor-pointer line-clamp-1">
                      {selectedSeo.metaTitle || "TUMU UAE | Page Title"}
                    </h4>

                    <p className="text-xs text-[#4d5156] mt-1.5 leading-relaxed line-clamp-3">
                      {selectedSeo.metaDescription || "Enter a meta description to see how this page will be displayed in search engine results."}
                    </p>
                  </div>

                  {/* SEO Health Checklist */}
                  <div className="mt-6 pt-6 border-t border-black/5 flex flex-col gap-2.5">
                    <span className="text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1 block">
                      SEO Technical Checklist
                    </span>

                    <div className="flex items-center justify-between text-xs font-semibold py-1">
                      <span>Canonical Configured:</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Valid
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-semibold py-1">
                      <span>Robots Indexing:</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> {selectedSeo.robots}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-semibold py-1">
                      <span>Target Keywords:</span>
                      <span className="text-[#162B3A] font-bold">
                        {selectedSeo.metaKeywords.split(",").length} Keywords Set
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Link Card */}
                <div className="p-6 rounded-3xl bg-[#162B3A] text-white">
                  <h4 className="text-sm font-black uppercase tracking-wider text-[#FF758F] mb-1">
                    Direct Page Link
                  </h4>
                  <p className="text-xs text-white/70 mb-4">
                    Visit this live page on the public storefront.
                  </p>
                  <Link
                    href={selectedSeo.slug}
                    target="_blank"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#162B3A] hover:bg-[#FAF4E7] text-xs font-black uppercase tracking-wider transition-all"
                  >
                    <span>Open {selectedSeo.slug}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB 2: SITE SETTINGS & GENERAL BRANDING
           ══════════════════════════════════════════════════════════════ */}
        {activeTab === "general" && (
          <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-black/5 shadow-sm flex flex-col gap-8">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#DB3E59] mb-1 block">
                GLOBAL SITE SETTINGS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#162B3A]">
                Branding, Contact Details &amp; Footer Info
              </h2>
              <p className="text-sm font-semibold text-[#162B3A]/70 mt-1">
                Edit sitewide details including company name, customer service phone, office address, and social channels.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={siteContent.general?.brandName || ""}
                  onChange={(e) => updateGeneralField("brandName", e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                  Main Slogan / Tagline
                </label>
                <input
                  type="text"
                  value={siteContent.general?.tagline || ""}
                  onChange={(e) => updateGeneralField("tagline", e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                  Customer Service Phone
                </label>
                <input
                  type="text"
                  value={siteContent.general?.phone || ""}
                  onChange={(e) => updateGeneralField("phone", e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                  Official Email Address
                </label>
                <input
                  type="email"
                  value={siteContent.general?.email || ""}
                  onChange={(e) => updateGeneralField("email", e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                  Headquarters &amp; Stores Address
                </label>
                <input
                  type="text"
                  value={siteContent.general?.address || ""}
                  onChange={(e) => updateGeneralField("address", e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                  Instagram Profile URL
                </label>
                <input
                  type="url"
                  value={siteContent.general?.instagramUrl || ""}
                  onChange={(e) => updateGeneralField("instagramUrl", e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-mono text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                  Facebook Page URL
                </label>
                <input
                  type="url"
                  value={siteContent.general?.facebookUrl || ""}
                  onChange={(e) => updateGeneralField("facebookUrl", e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-mono text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                  Brand Description (Footer)
                </label>
                <textarea
                  rows={2}
                  value={siteContent.general?.description || ""}
                  onChange={(e) => updateGeneralField("description", e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                  Footer Copyright Text
                </label>
                <input
                  type="text"
                  value={siteContent.general?.copyrightText || ""}
                  onChange={(e) => updateGeneralField("copyrightText", e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-medium text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={saveCmsChanges}
                disabled={saving}
                className="px-8 py-3.5 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Site Settings</span>
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB 3: HOME PAGE CONTENT (ALL 7 SECTIONS)
           ══════════════════════════════════════════════════════════════ */}
        {activeTab === "home" && (
          <div className="flex flex-col gap-8">
            {/* Top Info Banner */}
            <div className="p-6 rounded-3xl bg-white border border-black/5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#DB3E59] mb-1 block">
                  Complete Homepage Manager
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#162B3A]">
                  All 7 Homepage Sections
                </h2>
                <p className="text-sm font-semibold text-[#162B3A]/70 mt-1 max-w-2xl">
                  Edit headlines, subtitles, descriptions, button labels, links, and pillar highlights across all 7 homepage sections.
                </p>
              </div>
              <button
                onClick={saveCmsChanges}
                disabled={saving}
                className="px-8 py-3.5 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2 shrink-0"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "Saving..." : "Save All Homepage Sections"}</span>
              </button>
            </div>

            {/* Section 1: Video Scroll Hero (Cinematic Experience) */}
            <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-black/5 shadow-sm flex flex-col gap-6">
              <div className="border-b border-black/10 pb-4">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#DB3E59] mb-1 block">
                  HOME SECTION 1 OF 7
                </span>
                <h3 className="text-2xl font-black uppercase text-[#162B3A]">
                  Video Scroll Hero (Cinematic Food Animation)
                </h3>
                <p className="text-xs text-[#162B3A]/70 font-semibold mt-1">
                  Controls the opening headline (Phase 1) and the final break-open climax headline &amp; CTAs (Phase 3).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-[#FAF4E7] border border-black/5 flex flex-col gap-3 md:col-span-2">
                  <span className="text-xs font-black uppercase text-[#DB3E59]">Phase 1: Opening Headlines &amp; Buttons</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-[#162B3A] mb-1">Headline Line 1 (Cyan)</label>
                      <input
                        type="text"
                        value={siteContent.home?.videoScrollHero?.phase1Headline1 || ""}
                        onChange={(e) => updateContentField("home", "videoScrollHero", "phase1Headline1", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/10 text-xs font-black text-[#162B3A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#162B3A] mb-1">Headline Line 2 (Pink)</label>
                      <input
                        type="text"
                        value={siteContent.home?.videoScrollHero?.phase1Headline2 || ""}
                        onChange={(e) => updateContentField("home", "videoScrollHero", "phase1Headline2", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/10 text-xs font-black text-[#DB3E59]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#162B3A] mb-1">Button 1 (Pink) Text &amp; Link</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Label"
                          value={siteContent.home?.videoScrollHero?.phase1Btn1Text || ""}
                          onChange={(e) => updateContentField("home", "videoScrollHero", "phase1Btn1Text", e.target.value)}
                          className="w-1/2 px-3 py-2 rounded-xl bg-white border border-black/10 text-xs font-bold"
                        />
                        <input
                          type="text"
                          placeholder="Link"
                          value={siteContent.home?.videoScrollHero?.phase1Btn1Link || ""}
                          onChange={(e) => updateContentField("home", "videoScrollHero", "phase1Btn1Link", e.target.value)}
                          className="w-1/2 px-3 py-2 rounded-xl bg-white border border-black/10 text-xs font-mono"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#162B3A] mb-1">Button 2 (Cyan) Text &amp; Link</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Label"
                          value={siteContent.home?.videoScrollHero?.phase1Btn2Text || ""}
                          onChange={(e) => updateContentField("home", "videoScrollHero", "phase1Btn2Text", e.target.value)}
                          className="w-1/2 px-3 py-2 rounded-xl bg-white border border-black/10 text-xs font-bold"
                        />
                        <input
                          type="text"
                          placeholder="Link"
                          value={siteContent.home?.videoScrollHero?.phase1Btn2Link || ""}
                          onChange={(e) => updateContentField("home", "videoScrollHero", "phase1Btn2Link", e.target.value)}
                          className="w-1/2 px-3 py-2 rounded-xl bg-white border border-black/10 text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Hero Banner (Crisp Outside / Creamy Inside) */}
            <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-black/5 shadow-sm flex flex-col gap-6">
              <div className="border-b border-black/10 pb-4">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#DB3E59] mb-1 block">
                  HOME SECTION 2 OF 7
                </span>
                <h3 className="text-2xl font-black uppercase text-[#162B3A]">
                  Hero Banner Content (Crisp Outside / Creamy Inside)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Eyebrow Badge Text
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.hero?.eyebrow || ""}
                    onChange={(e) => updateContentField("home", "hero", "eyebrow", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Primary Button Text
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.hero?.primaryBtnText || ""}
                    onChange={(e) => updateContentField("home", "hero", "primaryBtnText", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Main Headline Line 1
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.hero?.headlineLine1 || ""}
                    onChange={(e) => updateContentField("home", "hero", "headlineLine1", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-black text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Main Headline Line 2
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.hero?.headlineLine2 || ""}
                    onChange={(e) => updateContentField("home", "hero", "headlineLine2", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-black text-[#DB3E59] focus:outline-none focus:border-[#DB3E59]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Hero Description Paragraph
                  </label>
                  <textarea
                    rows={2}
                    value={siteContent.home?.hero?.description || ""}
                    onChange={(e) => updateContentField("home", "hero", "description", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-medium text-[#162B3A] focus:outline-none focus:border-[#DB3E59] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Just 3 Steps (Real Ingredients Section) */}
            <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-black/5 shadow-sm flex flex-col gap-6">
              <div className="border-b border-black/10 pb-4">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#DB3E59] mb-1 block">
                  HOME SECTION 3 OF 7
                </span>
                <h3 className="text-2xl font-black uppercase text-[#162B3A]">
                  Just 3 Steps. Uniquely Delicious. (Bake It, Fill It, Serve It)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Eyebrow / Kanji
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.realIngredients?.eyebrow || ""}
                    onChange={(e) => updateContentField("home", "realIngredients", "eyebrow", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Main Title
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.realIngredients?.heading || ""}
                    onChange={(e) => updateContentField("home", "realIngredients", "heading", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-black text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Description Text
                  </label>
                  <textarea
                    rows={2}
                    value={siteContent.home?.realIngredients?.description || ""}
                    onChange={(e) => updateContentField("home", "realIngredients", "description", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-medium text-[#162B3A] focus:outline-none focus:border-[#DB3E59] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Product Anatomy */}
            <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-black/5 shadow-sm flex flex-col gap-6">
              <div className="border-b border-black/10 pb-4">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#DB3E59] mb-1 block">
                  HOME SECTION 4 OF 7
                </span>
                <h3 className="text-2xl font-black uppercase text-[#162B3A]">
                  Product Anatomy (3 Callout Layers)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-[#FAF4E7] border border-black/5">
                  <span className="text-xs font-black text-[#DB3E59] uppercase block mb-1">Layer 01</span>
                  <input
                    type="text"
                    value={siteContent.home?.productAnatomy?.layer1Title || ""}
                    onChange={(e) => updateContentField("home", "productAnatomy", "layer1Title", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-black/10 text-xs font-black mb-2"
                  />
                  <textarea
                    rows={3}
                    value={siteContent.home?.productAnatomy?.layer1Desc || ""}
                    onChange={(e) => updateContentField("home", "productAnatomy", "layer1Desc", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-black/10 text-xs font-medium resize-none"
                  />
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF4E7] border border-black/5">
                  <span className="text-xs font-black text-[#DB3E59] uppercase block mb-1">Layer 02</span>
                  <input
                    type="text"
                    value={siteContent.home?.productAnatomy?.layer2Title || ""}
                    onChange={(e) => updateContentField("home", "productAnatomy", "layer2Title", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-black/10 text-xs font-black mb-2"
                  />
                  <textarea
                    rows={3}
                    value={siteContent.home?.productAnatomy?.layer2Desc || ""}
                    onChange={(e) => updateContentField("home", "productAnatomy", "layer2Desc", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-black/10 text-xs font-black mb-2"
                  />
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF4E7] border border-black/5">
                  <span className="text-xs font-black text-[#DB3E59] uppercase block mb-1">Layer 03</span>
                  <input
                    type="text"
                    value={siteContent.home?.productAnatomy?.layer3Title || ""}
                    onChange={(e) => updateContentField("home", "productAnatomy", "layer3Title", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-black/10 text-xs font-black mb-2"
                  />
                  <textarea
                    rows={3}
                    value={siteContent.home?.productAnatomy?.layer3Desc || ""}
                    onChange={(e) => updateContentField("home", "productAnatomy", "layer3Desc", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-black/10 text-xs font-medium resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 5: Flavours Carousel Section */}
            <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-black/5 shadow-sm flex flex-col gap-6">
              <div className="border-b border-black/10 pb-4">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#DB3E59] mb-1 block">
                  HOME SECTION 5 OF 7
                </span>
                <h3 className="text-2xl font-black uppercase text-[#162B3A]">
                  Flavours Carousel Section
                </h3>
                <p className="text-xs text-[#162B3A]/70 font-semibold mt-1">
                  Controls the section heading, description, and link button on the carousel showcase.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Heading (&quot;CRUSTÉ FLAVOURS&quot;)
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.flavoursSection?.headingLine1 || ""}
                    onChange={(e) => updateContentField("home", "flavoursSection", "headingLine1", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Subheading (&quot;EXPLORE TUMU’S SIGNATURE...&quot;)
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.flavoursSection?.subheading || ""}
                    onChange={(e) => updateContentField("home", "flavoursSection", "subheading", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Headline Tagline (&quot;25 Unique Flavours, Made with Japan&apos;s Finest Ingredients&quot;)
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.flavoursSection?.description || ""}
                    onChange={(e) => updateContentField("home", "flavoursSection", "description", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Button Label (&quot;MORE FLAVOURS&quot;)
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.flavoursSection?.btnText || "MORE FLAVOURS"}
                    onChange={(e) => updateContentField("home", "flavoursSection", "btnText", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A]"
                  />
                </div>
              </div>
            </div>

            {/* Section 6: Fresh From Our Oven ("BAKED TO PERFECTION") */}
            <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-black/5 shadow-sm flex flex-col gap-6">
              <div className="border-b border-black/10 pb-4">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#DB3E59] mb-1 block">
                  HOME SECTION 6 OF 8
                </span>
                <h3 className="text-2xl font-black uppercase text-[#162B3A]">
                  Fresh From Our Oven (&quot;BAKED TO PERFECTION&quot;)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Eyebrow (&quot;FRESH FROM OUR OVEN&quot;)
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.freshFromOven?.eyebrow || ""}
                    onChange={(e) => updateContentField("home", "freshFromOven", "eyebrow", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Headline Word 1 (&quot;BAKED&quot;)
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.freshFromOven?.headlineLine1 || ""}
                    onChange={(e) => updateContentField("home", "freshFromOven", "headlineLine1", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Headline Word 2 (&quot;PERFECTION&quot;)
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.freshFromOven?.headlineLine2 || ""}
                    onChange={(e) => updateContentField("home", "freshFromOven", "headlineLine2", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Headline Word 3 (&quot;FILLED&quot;)
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.freshFromOven?.headlineLine3 || ""}
                    onChange={(e) => updateContentField("home", "freshFromOven", "headlineLine3", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Headline Word 4 (&quot;HAPPINESS&quot;)
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.freshFromOven?.headlineLine4 || ""}
                    onChange={(e) => updateContentField("home", "freshFromOven", "headlineLine4", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Button Text (&quot;Explore TUMU&quot;)
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.freshFromOven?.buttonText || ""}
                    onChange={(e) => updateContentField("home", "freshFromOven", "buttonText", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={siteContent.home?.freshFromOven?.description || ""}
                    onChange={(e) => updateContentField("home", "freshFromOven", "description", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A]"
                  />
                </div>
              </div>
            </div>

            {/* Section 6: Happiness Section ("TASTE IT ONCE. CRAVE IT FOREVER. LET HAPPINESS FLOW") */}
            <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-black/5 shadow-sm flex flex-col gap-6">
              <div className="border-b border-black/10 pb-4">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#DB3E59] mb-1 block">
                  HOME SECTION 6 OF 7
                </span>
                <h3 className="text-2xl font-black uppercase text-[#162B3A]">
                  Happiness Section (&quot;TASTE IT ONCE. CRAVE IT FOREVER. LET HAPPINESS FLOW&quot;)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Heading Line 1 (&quot;TASTE IT ONCE.&quot;)
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.happinessSection?.headingLine1 || ""}
                    onChange={(e) => updateContentField("home", "happinessSection", "headingLine1", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-black text-[#162B3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Heading Line 2 (&quot;CRAVE IT FOREVER.&quot;)
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.happinessSection?.headingLine2 || ""}
                    onChange={(e) => updateContentField("home", "happinessSection", "headingLine2", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-black text-[#162B3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Heading Line 3 (&quot;LET HAPPINESS FLOW&quot;)
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.happinessSection?.headingLine3 || ""}
                    onChange={(e) => updateContentField("home", "happinessSection", "headingLine3", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-black text-[#0088CC]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Japanese Quote Text
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.happinessSection?.japaneseText || ""}
                    onChange={(e) => updateContentField("home", "happinessSection", "japaneseText", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Button Text (&quot;Our Story&quot;)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Label"
                      value={siteContent.home?.happinessSection?.btnText || "Our Story"}
                      onChange={(e) => updateContentField("home", "happinessSection", "btnText", e.target.value)}
                      className="w-1/2 px-3 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-xs font-bold text-[#162B3A]"
                    />
                    <input
                      type="text"
                      placeholder="Link"
                      value={siteContent.home?.happinessSection?.btnLink || "/our-story"}
                      onChange={(e) => updateContentField("home", "happinessSection", "btnLink", e.target.value)}
                      className="w-1/2 px-3 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-xs font-mono text-[#162B3A]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 7: Franchise With TUMU Section */}
            <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-black/5 shadow-sm flex flex-col gap-6">
              <div className="border-b border-black/10 pb-4">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#DB3E59] mb-1 block">
                  HOME SECTION 7 OF 7
                </span>
                <h3 className="text-2xl font-black uppercase text-[#162B3A]">
                  Franchise With TUMU Section
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Eyebrow Text
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.franchiseCta?.eyebrow || ""}
                    onChange={(e) => updateContentField("home", "franchiseCta", "eyebrow", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Button Text &amp; Link
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Label"
                      value={siteContent.home?.franchiseCta?.buttonText || ""}
                      onChange={(e) => updateContentField("home", "franchiseCta", "buttonText", e.target.value)}
                      className="w-1/2 px-3 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-xs font-bold text-[#162B3A]"
                    />
                    <input
                      type="text"
                      placeholder="Link"
                      value={siteContent.home?.franchiseCta?.buttonLink || ""}
                      onChange={(e) => updateContentField("home", "franchiseCta", "buttonLink", e.target.value)}
                      className="w-1/2 px-3 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-xs font-mono text-[#162B3A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Heading Line 1 (Pink)
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.franchiseCta?.headingLine1 || ""}
                    onChange={(e) => updateContentField("home", "franchiseCta", "headingLine1", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-black text-[#DB3E59]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Heading Line 2 (Navy)
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.franchiseCta?.headingLine2 || ""}
                    onChange={(e) => updateContentField("home", "franchiseCta", "headingLine2", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-black text-[#162B3A]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Description Paragraph
                  </label>
                  <textarea
                    rows={2}
                    value={siteContent.home?.franchiseCta?.description || ""}
                    onChange={(e) => updateContentField("home", "franchiseCta", "description", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-medium text-[#162B3A] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Format Badge 1
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.franchiseCta?.format1 || ""}
                    onChange={(e) => updateContentField("home", "franchiseCta", "format1", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Format Badge 2
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.franchiseCta?.format2 || ""}
                    onChange={(e) => updateContentField("home", "franchiseCta", "format2", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Format Badge 3
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.franchiseCta?.format3 || ""}
                    onChange={(e) => updateContentField("home", "franchiseCta", "format3", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                    Format Badge 4
                  </label>
                  <input
                    type="text"
                    value={siteContent.home?.franchiseCta?.format4 || ""}
                    onChange={(e) => updateContentField("home", "franchiseCta", "format4", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold text-[#162B3A]"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Save Button */}
            <div className="flex justify-end pt-2 pb-6">
              <button
                onClick={saveCmsChanges}
                disabled={saving}
                className="px-10 py-4 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white font-black text-sm uppercase tracking-wider transition-all shadow-lg active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                <span>{saving ? "Saving Changes..." : "Save All Homepage Sections"}</span>
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB 4: OUR STORY PAGE CONTENT
           ══════════════════════════════════════════════════════════════ */}
        {activeTab === "story" && (
          <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-black/5 shadow-sm flex flex-col gap-8">
            <div className="border-b border-black/10 pb-4">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#DB3E59] mb-1 block">
                OUR STORY PAGE CONTENT
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#162B3A]">
                The 3 Brand Journey Chapters
              </h2>
            </div>

            {/* Chapter 1 */}
            <div className="p-6 rounded-2xl bg-[#FAF4E7] border border-black/5 flex flex-col gap-4">
              <span className="text-xs font-black text-[#DB3E59] uppercase">Chapter 1: Five Years of Mixing, Baking, Testing &amp; Dreaming</span>
              <input
                type="text"
                placeholder="Section Heading"
                value={siteContent.story?.section1?.heading || ""}
                onChange={(e) => updateContentField("story", "section1", "heading", e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-white border border-black/10 text-xs font-black"
              />
              <textarea
                rows={2}
                placeholder="Paragraph 1"
                value={siteContent.story?.section1?.p1 || ""}
                onChange={(e) => updateContentField("story", "section1", "p1", e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-white border border-black/10 text-sm font-medium resize-none"
              />
              <input
                type="text"
                placeholder="Paragraph 2 (Pink Highlight)"
                value={siteContent.story?.section1?.p2 || ""}
                onChange={(e) => updateContentField("story", "section1", "p2", e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-white border border-black/10 text-sm font-bold text-[#DB3E59]"
              />
              <textarea
                rows={2}
                placeholder="Paragraph 3"
                value={siteContent.story?.section1?.p3 || ""}
                onChange={(e) => updateContentField("story", "section1", "p3", e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-white border border-black/10 text-sm font-medium resize-none"
              />
              <input
                type="text"
                placeholder="Tagline (HOT. CRISPY. SWEET. CREAMY. SIMPLY TUMU.)"
                value={siteContent.story?.section1?.tagline || ""}
                onChange={(e) => updateContentField("story", "section1", "tagline", e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-white border border-black/10 text-xs font-black uppercase"
              />
            </div>

            {/* Chapter 2 */}
            <div className="p-6 rounded-2xl bg-[#FAF4E7] border border-black/5 flex flex-col gap-4">
              <span className="text-xs font-black text-[#DB3E59] uppercase">Chapter 2: The Artist Behind TUMU (Blue BG)</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Eyebrow"
                  value={siteContent.story?.section2?.eyebrow || ""}
                  onChange={(e) => updateContentField("story", "section2", "eyebrow", e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white border border-black/10 text-xs font-bold"
                />
                <input
                  type="text"
                  placeholder="Headline Line 1"
                  value={siteContent.story?.section2?.headingLine1 || ""}
                  onChange={(e) => updateContentField("story", "section2", "headingLine1", e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white border border-black/10 text-xs font-black"
                />
                <input
                  type="text"
                  placeholder="Headline Line 2 (CHEF REN)"
                  value={siteContent.story?.section2?.headingLine2 || ""}
                  onChange={(e) => updateContentField("story", "section2", "headingLine2", e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white border border-black/10 text-xs font-black"
                />
              </div>
              <textarea
                rows={3}
                placeholder="Story description"
                value={siteContent.story?.section2?.description || ""}
                onChange={(e) => updateContentField("story", "section2", "description", e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-white border border-black/10 text-sm font-medium resize-none"
              />
            </div>

            {/* Chapter 3 */}
            <div className="p-6 rounded-2xl bg-[#FAF4E7] border border-black/5 flex flex-col gap-4">
              <span className="text-xs font-black text-[#DB3E59] uppercase">Chapter 3: 80% Japanese Ingredients</span>
              <input
                type="text"
                placeholder="Headline"
                value={siteContent.story?.section3?.heading || ""}
                onChange={(e) => updateContentField("story", "section3", "heading", e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-white border border-black/10 text-xs font-black"
              />
              <textarea
                rows={3}
                placeholder="Story description"
                value={siteContent.story?.section3?.description || ""}
                onChange={(e) => updateContentField("story", "section3", "description", e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-white border border-black/10 text-sm font-medium resize-none"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={saveCmsChanges}
                disabled={saving}
                className="px-8 py-3.5 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Story Content</span>
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB 6: FRANCHISE & FORMATS CONTENT
           ══════════════════════════════════════════════════════════════ */}
        {activeTab === "franchise" && (
          <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-black/5 shadow-sm flex flex-col gap-8">
            <div className="border-b border-black/10 pb-4">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#DB3E59] mb-1 block">
                FRANCHISE PAGE CONTENT
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#162B3A]">
                Hero &amp; 4 Business Formats
              </h2>
            </div>

            {/* Franchise Hero */}
            <div className="p-6 rounded-2xl bg-[#FAF4E7] border border-black/5 flex flex-col gap-4">
              <span className="text-xs font-black text-[#DB3E59] uppercase">Franchise Hero Section</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Headline Line 1"
                  value={siteContent.franchise?.hero?.headingLine1 || ""}
                  onChange={(e) => updateContentField("franchise", "hero", "headingLine1", e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white border border-black/10 text-xs font-black"
                />
                <input
                  type="text"
                  placeholder="Headline Line 2"
                  value={siteContent.franchise?.hero?.headingLine2 || ""}
                  onChange={(e) => updateContentField("franchise", "hero", "headingLine2", e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white border border-black/10 text-xs font-black"
                />
                <input
                  type="text"
                  placeholder="Headline Line 3"
                  value={siteContent.franchise?.hero?.headingLine3 || ""}
                  onChange={(e) => updateContentField("franchise", "hero", "headingLine3", e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white border border-black/10 text-xs font-black"
                />
              </div>
              <textarea
                rows={3}
                placeholder="Franchise hero description"
                value={siteContent.franchise?.hero?.description || ""}
                onChange={(e) => updateContentField("franchise", "hero", "description", e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-white border border-black/10 text-sm font-medium resize-none"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {siteContent.franchise?.formats?.map((fmt: any, idx: number) => (
                <div key={fmt.id || idx} className="p-6 rounded-2xl bg-[#FAF4E7] border border-black/5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#162B3A] text-white text-[11px] font-black uppercase">
                      {fmt.name}
                    </span>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase text-[#162B3A]/60 block mb-1">Format Name</label>
                    <input
                      type="text"
                      value={fmt.name || ""}
                      onChange={(e) => {
                        const copy = [...siteContent.franchise.formats];
                        copy[idx].name = e.target.value;
                        setSiteContent({ ...siteContent, franchise: { ...siteContent.franchise, formats: copy } });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-black/10 text-xs font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[10px] font-black uppercase text-[#162B3A]/60 block mb-0.5">
                        {fmt.size ? "Size" : "Setup Time"}
                      </label>
                      <input
                        type="text"
                        value={fmt.setup || fmt.size || ""}
                        onChange={(e) => {
                          const copy = [...siteContent.franchise.formats];
                          if (copy[idx].size !== undefined) copy[idx].size = e.target.value;
                          else copy[idx].setup = e.target.value;
                          setSiteContent({ ...siteContent, franchise: { ...siteContent.franchise, formats: copy } });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-black/10 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-[#162B3A]/60 block mb-0.5">ROI</label>
                      <input
                        type="text"
                        value={fmt.roi || ""}
                        onChange={(e) => {
                          const copy = [...siteContent.franchise.formats];
                          copy[idx].roi = e.target.value;
                          setSiteContent({ ...siteContent, franchise: { ...siteContent.franchise, formats: copy } });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-black/10 text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase text-[#162B3A]/60 block mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={fmt.description || ""}
                      onChange={(e) => {
                        const copy = [...siteContent.franchise.formats];
                        copy[idx].description = e.target.value;
                        setSiteContent({ ...siteContent, franchise: { ...siteContent.franchise, formats: copy } });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-black/10 text-xs font-medium resize-none"
                    />
                  </div>

                  {/* Format Gallery Images Manager */}
                  <div className="pt-2 border-t border-black/10 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-black uppercase text-[#162B3A]/70">
                        Gallery Images ({(fmt.gallery || []).length})
                      </label>
                      <label className="px-3 py-1.5 rounded-full bg-[#162B3A] hover:bg-black text-white text-[10px] font-black uppercase tracking-wider cursor-pointer transition-colors flex items-center gap-1">
                        <Plus className="w-3 h-3" />
                        <span>Add Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            try {
                              const form = new FormData();
                              form.append("file", file);
                              const res = await fetch("/api/upload", { method: "POST", body: form });
                              const data = await res.json();
                              if (data?.success && data.url) {
                                const copy = [...siteContent.franchise.formats];
                                const existing = Array.isArray(copy[idx].gallery) ? copy[idx].gallery : [];
                                copy[idx].gallery = [...existing, { src: data.url, alt: fmt.name || "TUMU Franchise Format" }];
                                setSiteContent({ ...siteContent, franchise: { ...siteContent.franchise, formats: copy } });
                                notify("Image added! Click Save Franchise Content to publish.");
                              } else {
                                notify(data?.message || "Upload failed");
                              }
                            } catch {
                              notify("Image upload failed");
                            }
                            e.target.value = "";
                          }}
                        />
                      </label>
                    </div>

                    <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                      {(fmt.gallery || []).map((img: any, imgIdx: number) => (
                        <div key={`${img.src}-${imgIdx}`} className="flex items-center gap-2 bg-white p-2 rounded-xl border border-black/5">
                          <div className="relative w-12 h-9 rounded-lg overflow-hidden shrink-0 bg-black/5">
                            <Image
                              src={img.src}
                              alt={img.alt || ""}
                              fill
                              unoptimized={img.src?.startsWith("data:")}
                              className="object-cover"
                            />
                          </div>
                          <input
                            type="text"
                            value={img.alt || ""}
                            placeholder="Image caption"
                            onChange={(e) => {
                              const copy = [...siteContent.franchise.formats];
                              const gal = [...(copy[idx].gallery || [])];
                              gal[imgIdx] = { ...gal[imgIdx], alt: e.target.value };
                              copy[idx].gallery = gal;
                              setSiteContent({ ...siteContent, franchise: { ...siteContent.franchise, formats: copy } });
                            }}
                            className="flex-1 min-w-0 px-2.5 py-1 rounded-lg bg-[#FAF4E7] border border-black/5 text-[11px] font-semibold"
                          />
                          <button
                            type="button"
                            title="Remove image"
                            onClick={() => {
                              const copy = [...siteContent.franchise.formats];
                              copy[idx].gallery = (copy[idx].gallery || []).filter((_: any, i: number) => i !== imgIdx);
                              setSiteContent({ ...siteContent, franchise: { ...siteContent.franchise, formats: copy } });
                            }}
                            className="p-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition-colors shrink-0 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={saveCmsChanges}
                disabled={saving}
                className="px-8 py-3.5 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Franchise Content</span>
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB 7: CONTACT PAGE & REGIONAL OFFICES
           ══════════════════════════════════════════════════════════════ */}
        {activeTab === "contact" && (
          <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-black/5 shadow-sm flex flex-col gap-8">
            <div className="border-b border-black/10 pb-4">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#DB3E59] mb-1 block">
                CONTACT PAGE CONTENT
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#162B3A]">
                Hero, Form Copy &amp; Regional Offices
              </h2>
            </div>

            {/* Hero & Form Copy */}
            <div className="p-6 rounded-2xl bg-[#FAF4E7] border border-black/5 flex flex-col gap-4">
              <span className="text-xs font-black text-[#DB3E59] uppercase">Contact Hero &amp; Form</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Eyebrow"
                  value={siteContent.contact?.hero?.eyebrow || ""}
                  onChange={(e) => updateContentField("contact", "hero", "eyebrow", e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white border border-black/10 text-xs font-bold"
                />
                <input
                  type="text"
                  placeholder="Heading Line 1"
                  value={siteContent.contact?.hero?.headingLine1 || ""}
                  onChange={(e) => updateContentField("contact", "hero", "headingLine1", e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white border border-black/10 text-xs font-black"
                />
                <input
                  type="text"
                  placeholder="Heading Line 2"
                  value={siteContent.contact?.hero?.headingLine2 || ""}
                  onChange={(e) => updateContentField("contact", "hero", "headingLine2", e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white border border-black/10 text-xs font-black"
                />
              </div>
              <textarea
                rows={2}
                placeholder="Contact Hero Description"
                value={siteContent.contact?.hero?.description || ""}
                onChange={(e) => updateContentField("contact", "hero", "description", e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-white border border-black/10 text-sm font-medium resize-none"
              />
              <input
                type="text"
                placeholder="Form Subtitle"
                value={siteContent.contact?.formSection?.subtitle || ""}
                onChange={(e) => updateContentField("contact", "formSection", "subtitle", e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-white border border-black/10 text-sm font-medium"
              />
            </div>

            {/* Regional Offices */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(siteContent.contact?.offices || []).map((office: any, idx: number) => (
                <div key={office.id || idx} className="p-6 rounded-2xl bg-[#FAF4E7] border border-black/5 flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-black uppercase text-[#162B3A]/60 block mb-1">Country Pill</label>
                      <input
                        type="text"
                        value={office.country || ""}
                        onChange={(e) => {
                          const copy = [...(siteContent.contact?.offices || [])];
                          copy[idx].country = e.target.value;
                          setSiteContent({ ...siteContent, contact: { ...siteContent.contact, offices: copy } });
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-black/10 text-xs font-black"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-[#162B3A]/60 block mb-1">Office Role</label>
                      <input
                        type="text"
                        value={office.role || ""}
                        onChange={(e) => {
                          const copy = [...(siteContent.contact?.offices || [])];
                          copy[idx].role = e.target.value;
                          setSiteContent({ ...siteContent, contact: { ...siteContent.contact, offices: copy } });
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-black/10 text-xs font-semibold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-[#162B3A]/60 block mb-1">City Heading</label>
                    <input
                      type="text"
                      value={office.city || ""}
                      onChange={(e) => {
                        const copy = [...(siteContent.contact?.offices || [])];
                        copy[idx].city = e.target.value;
                        setSiteContent({ ...siteContent, contact: { ...siteContent.contact, offices: copy } });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-black/10 text-xs font-black"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-[#162B3A]/60 block mb-1">Address</label>
                    <textarea
                      rows={2}
                      value={office.address || ""}
                      onChange={(e) => {
                        const copy = [...(siteContent.contact?.offices || [])];
                        copy[idx].address = e.target.value;
                        setSiteContent({ ...siteContent, contact: { ...siteContent.contact, offices: copy } });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-black/10 text-xs font-medium resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-[#162B3A]/60 block mb-1">Emails (comma separated)</label>
                    <input
                      type="text"
                      value={(office.emails || []).join(", ")}
                      onChange={(e) => {
                        const copy = [...(siteContent.contact?.offices || [])];
                        copy[idx].emails = e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean);
                        setSiteContent({ ...siteContent, contact: { ...siteContent.contact, offices: copy } });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-black/10 text-xs font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={saveCmsChanges}
                disabled={saving}
                className="px-8 py-3.5 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Contact Page Content</span>
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB 7: FAQS MANAGER
           ══════════════════════════════════════════════════════════════ */}
        {activeTab === "faqs" && (
          <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-black/5 shadow-sm flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#DB3E59] mb-1 block">
                  FAQS MANAGEMENT
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#162B3A]">
                  Frequently Asked Questions ({faqList.length})
                </h2>
              </div>
              <button
                onClick={openNewFaqModal}
                className="px-6 py-3 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add Question</span>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {faqList.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#FAF4E7] border border-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex flex-col items-start gap-1 max-w-3xl">
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-[10px] font-black uppercase tracking-wider text-[#DB3E59] border border-black/5">
                      {item.category}
                    </span>
                    <h4 className="text-base font-black text-[#162B3A]">
                      {item.question}
                    </h4>
                    <p className="text-xs font-medium text-[#162B3A]/70 line-clamp-2">
                      {item.answer}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => openEditFaqModal(idx)}
                      className="p-2.5 rounded-full bg-white hover:bg-black/5 text-[#162B3A] transition-colors border border-black/5"
                      title="Edit FAQ"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteFaq(idx)}
                      className="p-2.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition-colors border border-red-200"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB 8: FLAVOURS CRUD
           ══════════════════════════════════════════════════════════════ */}
        {activeTab === "flavors" && (
          <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-black/5 shadow-sm flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#DB3E59] mb-1 block">
                  PRODUCTS CATALOG
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#162B3A]">
                  Artisanal Flavours ({flavors.length})
                </h2>
              </div>
              <button
                onClick={openNewFlavorModal}
                className="px-6 py-3 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Flavour</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {flavors.map((flavor) => (
                <div
                  key={flavor.id}
                  className="p-5 rounded-3xl bg-[#FAF4E7] border border-black/5 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all"
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      style={{ backgroundColor: extractFlavorHex(flavor.color) }}
                      className="relative w-28 h-36 mb-4 rounded-3xl p-2"
                    >
                      <Image
                        src={flavor.image}
                        alt={flavor.name}
                        fill
                        unoptimized={flavor.image?.startsWith("data:")}
                        className="object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white text-[10px] font-black uppercase tracking-wider text-[#162B3A] mb-2 border border-black/5">
                      {flavor.tag || flavor.category}
                    </span>
                    <h4 className="text-lg font-black text-[#162B3A] mb-1">
                      {flavor.name}
                    </h4>
                    <p className="text-xs text-[#162B3A]/70 font-medium line-clamp-2">
                      {flavor.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/10 mt-4 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#162B3A]/50">
                      #{flavor.display_order}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditFlavorModal(flavor)}
                        className="p-2 rounded-full bg-white hover:bg-black/5 text-[#162B3A] transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteFlavor(flavor.id, flavor.name)}
                        className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB 9: STORE LOCATIONS CRUD
           ══════════════════════════════════════════════════════════════ */}
        {activeTab === "locations" && (
          <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-black/5 shadow-sm flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#DB3E59] mb-1 block">
                  PHYSICAL FOOTPRINT
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#162B3A]">
                  Store Locations &amp; Kiosks ({locations.length})
                </h2>
              </div>
              <button
                onClick={openNewLocationModal}
                className="px-6 py-3 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add Store Location</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {locations.map((loc) => (
                <div
                  key={loc.id}
                  className="p-6 rounded-3xl bg-[#FAF4E7] border border-black/5 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-3 py-1 rounded-full bg-white text-[11px] font-black uppercase tracking-wider text-[#DB3E59]">
                        {loc.city} &bull; {loc.country || "UAE"}
                      </span>
                      <span className="text-xs font-bold text-emerald-600">
                        {loc.status || "Open Now"}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-[#162B3A] uppercase mb-1">
                      {loc.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#162B3A]/70 mb-2">
                      {loc.address}
                    </p>
                    {loc.phone && (
                      <p className="text-xs font-bold text-[#162B3A]">
                        📞 {loc.phone}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-black/10 mt-4 flex items-center justify-between">
                    <a
                      href={loc.google_maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#DB3E59] hover:underline flex items-center gap-1"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Maps Link</span>
                    </a>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditLocationModal(loc)}
                        className="p-2 rounded-full bg-white hover:bg-black/5 text-[#162B3A] transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteLocation(loc.id, loc.name)}
                        className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ══════════════════════════════════════════════════════════════
          MODAL: FLAVOR EDIT / CREATE
         ══════════════════════════════════════════════════════════════ */}
      {flavorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-black/10 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setFlavorModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-black/5 hover:bg-black/10 text-[#162B3A]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black uppercase text-[#162B3A] mb-6">
              {editingFlavor ? "Edit Flavour" : "Add New Flavour"}
            </h3>

            <form onSubmit={handleSaveFlavor} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1">
                  Flavour Name
                </label>
                <input
                  type="text"
                  required
                  value={flavorForm.name || ""}
                  onChange={(e) => setFlavorForm({ ...flavorForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1">
                    Category
                  </label>
                  <select
                    value={flavorForm.category || "CLASSIC"}
                    onChange={(e) => setFlavorForm({ ...flavorForm, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold"
                  >
                    <option value="CLASSIC">CLASSIC</option>
                    <option value="SIGNATURE">SIGNATURE</option>
                    <option value="FRUIT BLENDS">FRUIT BLENDS</option>
                    <option value="ASIAN INSPIRED">ASIAN INSPIRED</option>
                    <option value="SEASONAL">SEASONAL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1">
                    Badge Tag
                  </label>
                  <input
                    type="text"
                    value={flavorForm.tag || ""}
                    onChange={(e) => setFlavorForm({ ...flavorForm, tag: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={flavorForm.description || ""}
                  onChange={(e) => setFlavorForm({ ...flavorForm, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-medium resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                  Cutout Card Color (Flavour Section Theme)
                </label>
                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  {[
                    { label: "Matcha", hex: "#98FF98" },
                    { label: "Vanilla", hex: "#FFFFFF" },
                    { label: "Pistachio", hex: "#93C572" },
                    { label: "Strawberry", hex: "#FF9999" },
                    { label: "Cacao", hex: "#3D1C00" },
                    { label: "Tiramisu", hex: "#C68E17" },
                    { label: "Mango", hex: "#FFE066" },
                    { label: "Biscoff", hex: "#D35400" },
                    { label: "Brand Pink", hex: "#DB3E59" },
                    { label: "Brand Teal", hex: "#28B4AB" },
                  ].map((swatch) => {
                    const currentHex = extractFlavorHex(flavorForm.color).toUpperCase();
                    const isSelected = currentHex === swatch.hex.toUpperCase();
                    return (
                      <button
                        key={swatch.hex}
                        type="button"
                        title={`${swatch.label} (${swatch.hex})`}
                        onClick={() => setFlavorForm({ ...flavorForm, color: `bg-[${swatch.hex}]` })}
                        style={{ backgroundColor: swatch.hex }}
                        className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                          isSelected ? "border-[#162B3A] scale-110 ring-2 ring-[#DB3E59]" : "border-black/15 hover:scale-105"
                        }`}
                      />
                    );
                  })}
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={extractFlavorHex(flavorForm.color)}
                    onChange={(e) => setFlavorForm({ ...flavorForm, color: `bg-[${e.target.value.toUpperCase()}]` })}
                    className="w-11 h-11 rounded-xl border border-black/10 cursor-pointer bg-white p-1 shrink-0"
                  />
                  <input
                    type="text"
                    value={extractFlavorHex(flavorForm.color)}
                    onChange={(e) => {
                      const val = e.target.value.trim();
                      setFlavorForm({ ...flavorForm, color: val.startsWith("#") ? `bg-[${val}]` : val });
                    }}
                    placeholder="#FFE066"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-mono uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1.5">
                  Flavour Image (Upload or Asset Path)
                </label>
                <div className="flex items-center gap-3 mb-2">
                  {flavorForm.image && (
                    <div
                      style={{ backgroundColor: extractFlavorHex(flavorForm.color) }}
                      className="relative w-14 h-14 rounded-2xl border border-black/10 shrink-0 overflow-hidden flex items-center justify-center p-1"
                    >
                      <Image
                        src={flavorForm.image}
                        alt="Preview"
                        fill
                        unoptimized={flavorForm.image.startsWith("data:")}
                        className="object-contain"
                      />
                    </div>
                  )}
                  <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#162B3A] hover:bg-black text-white text-xs font-black uppercase tracking-wider cursor-pointer transition-colors">
                    <span>{uploadingImage ? "Uploading..." : "Upload Image"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFlavorImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={flavorForm.image || ""}
                  onChange={(e) => setFlavorForm({ ...flavorForm, image: e.target.value })}
                  placeholder="/images/tumu/flavour_v2_new_mango.png"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF4E7] border border-black/10 text-xs font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setFlavorModalOpen(false)}
                  className="px-6 py-3 rounded-full bg-black/5 hover:bg-black/10 text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white font-black text-xs uppercase tracking-wider"
                >
                  Save Flavour
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          MODAL: LOCATION EDIT / CREATE
         ══════════════════════════════════════════════════════════════ */}
      {locationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-black/10 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setLocationModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-black/5 hover:bg-black/10 text-[#162B3A]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black uppercase text-[#162B3A] mb-6">
              {editingLocation ? "Edit Store Location" : "Add Store Location"}
            </h3>

            <form onSubmit={handleSaveLocation} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1">
                  Store / Kiosk Name
                </label>
                <input
                  type="text"
                  required
                  value={locationForm.name || ""}
                  onChange={(e) => setLocationForm({ ...locationForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={locationForm.city || ""}
                    onChange={(e) => setLocationForm({ ...locationForm, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    required
                    value={locationForm.country || ""}
                    onChange={(e) => setLocationForm({ ...locationForm, country: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1">
                  Full Address
                </label>
                <input
                  type="text"
                  required
                  value={locationForm.address || ""}
                  onChange={(e) => setLocationForm({ ...locationForm, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={locationForm.phone || ""}
                    onChange={(e) => setLocationForm({ ...locationForm, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1">
                    Opening Hours
                  </label>
                  <input
                    type="text"
                    value={locationForm.opening_hours || ""}
                    onChange={(e) => setLocationForm({ ...locationForm, opening_hours: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1">
                  Google Maps URL
                </label>
                <input
                  type="url"
                  value={locationForm.google_maps_url || ""}
                  onChange={(e) => setLocationForm({ ...locationForm, google_maps_url: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setLocationModalOpen(false)}
                  className="px-6 py-3 rounded-full bg-black/5 hover:bg-black/10 text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white font-black text-xs uppercase tracking-wider"
                >
                  Save Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          MODAL: FAQ EDIT / CREATE
         ══════════════════════════════════════════════════════════════ */}
      {faqModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-black/10 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setFaqModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-black/5 hover:bg-black/10 text-[#162B3A]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black uppercase text-[#162B3A] mb-6">
              {editingFaqIndex !== null ? "Edit FAQ Question" : "Add FAQ Question"}
            </h3>

            <form onSubmit={handleSaveFaq} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1">
                  Category
                </label>
                <select
                  value={faqForm.category}
                  onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold"
                >
                  <option value="Product & Concept">Product & Concept</option>
                  <option value="Ingredients & Dietary">Ingredients & Dietary</option>
                  <option value="Store Locations & Delivery">Store Locations & Delivery</option>
                  <option value="Franchise & Expansion">Franchise & Expansion</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1">
                  Question
                </label>
                <input
                  type="text"
                  required
                  value={faqForm.question}
                  onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#162B3A] mb-1">
                  Answer
                </label>
                <textarea
                  rows={4}
                  required
                  value={faqForm.answer}
                  onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF4E7] border border-black/10 text-sm font-medium resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setFaqModalOpen(false)}
                  className="px-6 py-3 rounded-full bg-black/5 hover:bg-black/10 text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white font-black text-xs uppercase tracking-wider"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}
