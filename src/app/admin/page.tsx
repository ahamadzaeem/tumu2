"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  supabase,
  isSupabaseConfigured,
  Flavor,
  StoreLocation,
  DEFAULT_FLAVORS,
  DEFAULT_LOCATIONS,
  fetchAllFlavorsAdmin,
  fetchAllLocationsAdmin,
} from "@/lib/supabase";
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
  Navigation
} from "lucide-react";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<"flavors" | "locations">("flavors");
  const [flavors, setFlavors] = useState<Flavor[]>(DEFAULT_FLAVORS);
  const [locations, setLocations] = useState<StoreLocation[]>(DEFAULT_LOCATIONS);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Flavor Modal state
  const [flavorModalOpen, setFlavorModalOpen] = useState(false);
  const [editingFlavor, setEditingFlavor] = useState<Flavor | null>(null);
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
    city: "Tokyo",
    country: "Japan",
    address: "",
    phone: "",
    opening_hours: "Daily: 10:00 AM – 10:00 PM",
    google_maps_url: "",
    status: "Open Now",
    image: "/images/tumu/franchise_new_1.jpg",
    is_active: true,
    display_order: 1,
  });

  const correctPin = process.env.NEXT_PUBLIC_ADMIN_PIN || "1234";

  // Check existing session
  useEffect(() => {
    const savedAuth = localStorage.getItem("tumu_admin_auth");
    if (savedAuth === "true") {
      setAuthenticated(true);
    }
  }, []);

  // Load initial data
  useEffect(() => {
    if (!authenticated) return;
    loadData();
  }, [authenticated]);

  const loadData = async () => {
    setLoading(true);
    try {
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
    setTimeout(() => setNotification(null), 3500);
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

  const handleSaveFlavor = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalFlavor: Flavor = {
      id: editingFlavor ? editingFlavor.id : flavorForm.id || "flavor_" + Date.now(),
      name: flavorForm.name || "Untitled Flavor",
      category: flavorForm.category || "CLASSIC",
      description: flavorForm.description || "",
      image: flavorForm.image || "/images/tumu/flavour_v3_02_vanilla.png",
      color: flavorForm.color || "bg-white",
      tag: flavorForm.tag || flavorForm.category,
      display_order: Number(flavorForm.display_order) || 1,
      is_active: flavorForm.is_active !== false,
    };

    if (supabase) {
      try {
        const { error } = await supabase.from("flavors").upsert(finalFlavor);
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
      city: "Tokyo",
      country: "Japan",
      address: "",
      phone: "",
      opening_hours: "Daily: 10:00 AM – 10:00 PM",
      google_maps_url: "",
      status: "Open Now",
      image: "/images/tumu/franchise_new_1.jpg",
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
      city: locationForm.city || "Tokyo",
      country: locationForm.country || "Japan",
      address: locationForm.address || "",
      phone: locationForm.phone || "",
      opening_hours: locationForm.opening_hours || "Daily: 10:00 AM – 10:00 PM",
      google_maps_url: mapUrl,
      status: (locationForm.status as any) || "Open Now",
      image: locationForm.image || "/images/tumu/franchise_new_1.jpg",
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
      notify(`Deleted store "${name}" locally.`);
    }

    setLocations((prev) => prev.filter((l) => l.id !== id));
  };

  // ─── LOGIN SCREEN ───
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#F8F4EC] flex flex-col items-center justify-center p-6 selection:bg-[#DB3E59] selection:text-white">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-black/5 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#DB3E59]/10 text-[#DB3E59] flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 stroke-[2.2]" />
          </div>

          <span className="text-[#DB3E59] text-xs font-black uppercase tracking-widest block mb-2">
            TUMU Content Management
          </span>
          <h1 className="text-3xl font-black text-[#162B3A] uppercase tracking-tight mb-2">
            Admin Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#162B3A]/70 font-medium mb-8">
            Manage Flavors and Store Locations across your website.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <input
                type="password"
                placeholder="Enter Admin PIN (Default: 1234)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className={`w-full px-5 py-4 rounded-full bg-[#F8F4EC] border text-center text-base font-bold text-[#162B3A] placeholder-[#162B3A]/40 focus:outline-none transition-all ${
                  pinError ? "border-red-500 ring-2 ring-red-200" : "border-black/10 focus:border-[#DB3E59]"
                }`}
                autoFocus
              />
              {pinError && (
                <p className="text-red-500 text-xs font-bold mt-2">
                  Incorrect PIN. Please try again.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white font-black text-sm uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              Sign In to CMS
            </button>

            <Link
              href="/"
              className="text-xs font-bold text-[#162B3A]/60 hover:text-[#DB3E59] transition-colors mt-2"
            >
              ← Back to TUMU Website
            </Link>
          </form>
        </div>
      </div>
    );
  }

  // ─── AUTHENTICATED ADMIN DASHBOARD ───
  return (
    <div className="min-h-screen bg-[#F8F4EC] flex flex-col selection:bg-[#DB3E59] selection:text-white pb-24">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#162B3A]/10 px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-black text-[#162B3A] flex items-center gap-2 hover:text-[#DB3E59]">
            <ArrowLeft className="w-4 h-4" />
            <span>View Site</span>
          </Link>
          <span className="text-[#162B3A]/20">|</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#DB3E59] text-white">
              CMS
            </span>
            <span className="text-lg font-black text-[#162B3A]">TUMU Admin</span>
          </div>
        </div>

        {/* Supabase Status & Logout */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-[#F8F4EC] border border-black/5">
            <Database className="w-3.5 h-3.5 text-[#50B8B1]" />
            <span>
              {isSupabaseConfigured ? (
                <span className="text-emerald-600 flex items-center gap-1">
                  ● Supabase Connected
                </span>
              ) : (
                <span className="text-amber-600 flex items-center gap-1">
                  ○ Local Fallback Mode
                </span>
              )}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 sm:px-4 sm:py-2 rounded-full bg-[#162B3A]/5 hover:bg-[#DB3E59] hover:text-white text-[#162B3A] text-xs font-bold transition-all flex items-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#162B3A] text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 animate-in fade-in duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-bold">{notification}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-12 pt-8">
        {/* Banner if Supabase is not configured */}
        {!isSupabaseConfigured && (
          <div className="mb-8 p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-black uppercase tracking-wide">
                  Supabase Credentials Not Yet Active in .env.local
                </h4>
                <p className="text-xs font-medium text-amber-800 mt-0.5">
                  The CMS is running smoothly in preview mode. To persist updates to your live database, add{" "}
                  <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[11px]">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
                  <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[11px]">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>. Schema file{" "}
                  <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[11px]">supabase_schema.sql</code> is ready at root.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Switcher & Action Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#162B3A]/10">
          <div className="flex items-center gap-3 bg-white p-1.5 rounded-full border border-black/10 shadow-sm">
            <button
              onClick={() => setActiveTab("flavors")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === "flavors"
                  ? "bg-[#DB3E59] text-white shadow-sm"
                  : "text-[#162B3A]/70 hover:text-[#162B3A]"
              }`}
            >
              <IceCream className="w-4 h-4" />
              <span>Flavors ({flavors.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("locations")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === "locations"
                  ? "bg-[#DB3E59] text-white shadow-sm"
                  : "text-[#162B3A]/70 hover:text-[#162B3A]"
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Store Locations ({locations.length})</span>
            </button>
          </div>

          <div>
            {activeTab === "flavors" ? (
              <button
                onClick={openNewFlavorModal}
                className="px-6 py-3 rounded-full bg-[#162B3A] hover:bg-[#DB3E59] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Flavor</span>
              </button>
            ) : (
              <button
                onClick={openNewLocationModal}
                className="px-6 py-3 rounded-full bg-[#162B3A] hover:bg-[#DB3E59] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Location</span>
              </button>
            )}
          </div>
        </div>

        {/* ─── TAB 1: FLAVORS TABLE / CARDS ─── */}
        {activeTab === "flavors" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {flavors.map((flavor) => (
              <div
                key={flavor.id}
                className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl border border-black/5 flex flex-col justify-between transition-all duration-300 group"
              >
                <div>
                  {/* Image Display */}
                  <div className="relative w-full h-48 rounded-2xl bg-[#F8F4EC] flex items-center justify-center overflow-hidden mb-4 border border-black/5">
                    <Image
                      src={flavor.image}
                      alt={flavor.name}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-white shadow-sm text-[#162B3A]">
                      {flavor.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-[#162B3A] tracking-tight mb-1">
                    {flavor.name}
                  </h3>
                  <p className="text-xs text-[#162B3A]/70 line-clamp-2 font-medium mb-4">
                    {flavor.description || "No description provided."}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-black/5">
                  <span className="text-[11px] font-bold text-[#162B3A]/50">
                    Order: #{flavor.display_order || 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditFlavorModal(flavor)}
                      className="p-2 rounded-full bg-[#F8F4EC] hover:bg-[#50B8B1] hover:text-white text-[#162B3A] transition-colors"
                      title="Edit Flavor"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteFlavor(flavor.id, flavor.name)}
                      className="p-2 rounded-full bg-[#F8F4EC] hover:bg-red-500 hover:text-white text-red-500 transition-colors"
                      title="Delete Flavor"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── TAB 2: LOCATIONS TABLE / CARDS ─── */}
        {activeTab === "locations" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-black/5 flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[11px] font-black uppercase tracking-wider text-[#DB3E59] block">
                        {loc.city}, {loc.country || "Japan"}
                      </span>
                      <h3 className="text-xl font-black text-[#162B3A] tracking-tight">
                        {loc.name}
                      </h3>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide shrink-0 ${
                        loc.status === "Open Now"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : "bg-amber-50 text-amber-600 border border-amber-200"
                      }`}
                    >
                      {loc.status || "Open Now"}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#162B3A]/80 font-medium mb-3">
                    {loc.address}
                  </p>

                  <div className="space-y-1 text-xs text-[#162B3A]/70 mb-4">
                    {loc.opening_hours && <p>🕒 {loc.opening_hours}</p>}
                    {loc.phone && <p>📞 {loc.phone}</p>}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-black/5">
                  <a
                    href={loc.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#50B8B1] hover:underline flex items-center gap-1"
                  >
                    <span>View Map</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditLocationModal(loc)}
                      className="p-2 rounded-full bg-[#F8F4EC] hover:bg-[#50B8B1] hover:text-white text-[#162B3A] transition-colors"
                      title="Edit Location"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteLocation(loc.id, loc.name)}
                      className="p-2 rounded-full bg-[#F8F4EC] hover:bg-red-500 hover:text-white text-red-500 transition-colors"
                      title="Delete Location"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─── FLAVOR MODAL ─── */}
      {flavorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-black/10 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setFlavorModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-black/5 hover:bg-black/10 text-[#162B3A]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black text-[#162B3A] uppercase tracking-tight mb-6">
              {editingFlavor ? "Edit Flavor" : "Add New Flavor"}
            </h3>

            <form onSubmit={handleSaveFlavor} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-[#162B3A] mb-1">
                  Flavor Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Yuzu Honey Blossom"
                  value={flavorForm.name || ""}
                  onChange={(e) => setFlavorForm({ ...flavorForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F4EC] border border-black/10 text-sm font-semibold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-[#162B3A] mb-1">
                    Category *
                  </label>
                  <select
                    value={flavorForm.category || "CLASSIC"}
                    onChange={(e) => setFlavorForm({ ...flavorForm, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F4EC] border border-black/10 text-sm font-semibold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                  >
                    <option value="CLASSIC">CLASSIC</option>
                    <option value="SIGNATURE">SIGNATURE</option>
                    <option value="ASIAN INSPIRED">ASIAN INSPIRED</option>
                    <option value="FRUIT BLENDS">FRUIT BLENDS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-[#162B3A] mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={flavorForm.display_order || 1}
                    onChange={(e) =>
                      setFlavorForm({ ...flavorForm, display_order: Number(e.target.value) })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F4EC] border border-black/10 text-sm font-semibold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#162B3A] mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Artisanal description of taste notes and ingredients..."
                  value={flavorForm.description || ""}
                  onChange={(e) => setFlavorForm({ ...flavorForm, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F4EC] border border-black/10 text-sm font-semibold text-[#162B3A] focus:outline-none focus:border-[#DB3E59] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#162B3A] mb-1">
                  Image Path / URL *
                </label>
                <input
                  type="text"
                  required
                  placeholder="/images/tumu/flavour_v3_04_matcha_green_tea.png"
                  value={flavorForm.image || ""}
                  onChange={(e) => setFlavorForm({ ...flavorForm, image: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F4EC] border border-black/10 text-sm font-semibold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                />
                <p className="text-[11px] text-[#162B3A]/60 mt-1">
                  Use existing paths like <code className="font-mono">/images/tumu/flavour_v3_*.png</code> or external image URLs.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setFlavorModalOpen(false)}
                  className="px-5 py-3 rounded-full bg-black/5 hover:bg-black/10 text-xs font-bold text-[#162B3A]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white text-xs font-black uppercase tracking-wider shadow-md"
                >
                  Save Flavor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── LOCATION MODAL ─── */}
      {locationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-black/10 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setLocationModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-black/5 hover:bg-black/10 text-[#162B3A]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black text-[#162B3A] uppercase tracking-tight mb-6">
              {editingLocation ? "Edit Store Location" : "Add Store Location"}
            </h3>

            <form onSubmit={handleSaveLocation} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-[#162B3A] mb-1">
                  Store / Outlet Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TUMU Omotesando Boutique"
                  value={locationForm.name || ""}
                  onChange={(e) => setLocationForm({ ...locationForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F4EC] border border-black/10 text-sm font-semibold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-[#162B3A] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Tokyo"
                    value={locationForm.city || ""}
                    onChange={(e) => setLocationForm({ ...locationForm, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F4EC] border border-black/10 text-sm font-semibold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-[#162B3A] mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    placeholder="Japan"
                    value={locationForm.country || ""}
                    onChange={(e) => setLocationForm({ ...locationForm, country: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F4EC] border border-black/10 text-sm font-semibold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#162B3A] mb-1">
                  Full Street Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="4-12-10 Jingumae, Shibuya City, Tokyo"
                  value={locationForm.address || ""}
                  onChange={(e) => setLocationForm({ ...locationForm, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F4EC] border border-black/10 text-sm font-semibold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-[#162B3A] mb-1">
                    Opening Hours
                  </label>
                  <input
                    type="text"
                    placeholder="Daily: 10:00 AM – 9:00 PM"
                    value={locationForm.opening_hours || ""}
                    onChange={(e) => setLocationForm({ ...locationForm, opening_hours: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F4EC] border border-black/10 text-sm font-semibold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-[#162B3A] mb-1">
                    Status
                  </label>
                  <select
                    value={locationForm.status || "Open Now"}
                    onChange={(e) => setLocationForm({ ...locationForm, status: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F4EC] border border-black/10 text-sm font-semibold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                  >
                    <option value="Open Now">Open Now</option>
                    <option value="Coming Soon">Coming Soon</option>
                    <option value="Renovating">Renovating</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#162B3A] mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+81 3-1234-5678"
                  value={locationForm.phone || ""}
                  onChange={(e) => setLocationForm({ ...locationForm, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F4EC] border border-black/10 text-sm font-semibold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#162B3A] mb-1">
                  Google Maps URL (Optional - Auto generated if left blank)
                </label>
                <input
                  type="url"
                  placeholder="https://maps.google.com/..."
                  value={locationForm.google_maps_url || ""}
                  onChange={(e) => setLocationForm({ ...locationForm, google_maps_url: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F4EC] border border-black/10 text-sm font-semibold text-[#162B3A] focus:outline-none focus:border-[#DB3E59]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setLocationModalOpen(false)}
                  className="px-5 py-3 rounded-full bg-black/5 hover:bg-black/10 text-xs font-bold text-[#162B3A]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-[#DB3E59] hover:bg-[#D81F51] text-white text-xs font-black uppercase tracking-wider shadow-md"
                >
                  Save Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
