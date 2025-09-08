"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import {
  Pencil,
  X,
  Save,
  Plus,
  Trash2,
  Phone,
  Mail,
  Globe,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { FaMapMarkerAlt as FaMapMarkerAltIcon } from "react-icons/fa";
import {
  getSchoolByUserId,
  updateSchoolById,
  uploadProfileImage,
  uploadGalleryImages,
  getStates,
  getCities,
  getCategoriesBoardMedium, // <-- ensure this exists in services/schoolServices
} from "../../../../services/schoolServices";

/* ================= Map API Payload ================= */
const mapToPayload = (data: any) => {
  return {
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    profile_image: data.profileImage || data.profile_image || null,
    latitude: data.location?.latitude || null,
    longitude: data.location?.longitude || null,
    full_address: data.address?.fullAddress || "",
    city: data.address?.city || "",
    state: data.address?.state || "",
    mobile: data.mobile || "",
    email: data.email || "",
    website: data.website || "",
    ownership: data.ownership || "",
    medium: data.medium || "",
    board: data.board || "",
    category: data.category || "",
    welcome_note: data.overview?.welcomeNote || "",
    key_highlights: data.overview?.keyHighlights || [],
    admission_criteria_eligibility:
      data.overview?.admissionCriteriaEligibility || [],
    school_hours: data.overview?.schoolHours || [],
    annual_fee_structure: data.fees?.annualFeeStructure || [],
    additional_fees: data.fees?.additionalFees || [],
    academic_facilities: data.facilities?.academic || [],
    sports_recreation_facilities: data.facilities?.sportsRecreation || [],
    infrastructure_facilities: data.facilities?.infrastructure || [],
    gallery: Array.isArray(data.gallery)
      ? data.gallery
      : typeof data.gallery === "string"
      ? JSON.parse(data.gallery || "[]")
      : [],
    tags: Array.isArray(data.tags)
      ? data.tags
      : typeof data.tags === "string"
      ? JSON.parse(data.tags || "[]")
      : [],
  };
};

/* ================= Inline Edit ================= */
const InlineEdit = ({
  value,
  onSave,
  type = "text",
  placeholder = "",
  multiline = false,
  className = "",
}: {
  value: string | null;
  onSave: (value: string) => void;
  type?: string;
  placeholder?: string;
  multiline?: boolean;
  className?: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value || "");

  useEffect(() => {
    setEditValue(value || "");
  }, [value]);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 w-full">
        {multiline ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={`flex-1 px-3 py-2 border border-gray-300 rounded-lg 
            text-gray-900 placeholder-gray-400
            focus:ring-2 focus:ring-[#257B5A] focus:border-[#257B5A] ${className}`}
            placeholder={placeholder}
            rows={3}
          />
        ) : (
          <input
            type={type}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={`flex-1 px-3 py-2 border border-gray-300 rounded-lg 
            text-gray-900 placeholder-gray-400
            focus:ring-2 focus:ring-[#257B5A] focus:border-[#257B5A] ${className}`}
            placeholder={placeholder}
          />
        )}
        <button
          onClick={handleSave}
          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <Save size={16} />
        </button>
        <button
          onClick={() => {
            setEditValue(value || "");
            setIsEditing(false);
          }}
          className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="group flex items-center gap-2 w-full">
      <span className={`flex-1 text-gray-700 ${className}`}>
        {value || placeholder}
      </span>
      <button
        onClick={() => setIsEditing(true)}
        className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-blue-600 transition-all"
      >
        <Pencil size={14} />
      </button>
    </div>
  );
};

/* ================= Editable List ================= */
const EditableList = ({
  items,
  onChange,
  placeholder,
}: {
  items: any;
  onChange: (items: string[]) => void;
  placeholder: string;
}) => {
  const safeItems: string[] = Array.isArray(items)
    ? items
    : typeof items === "string" && items.startsWith("[")
    ? JSON.parse(items)
    : [];

  const handleEdit = (index: number, newVal: string) => {
    const updated = [...safeItems];
    updated[index] = newVal;
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {safeItems.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <InlineEdit
            value={item}
            onSave={(val) => handleEdit(idx, val)}
            placeholder={placeholder}
            className="flex-1"
          />
          <button
            onClick={() => onChange(safeItems.filter((_, i) => i !== idx))}
            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange([...safeItems, ""])}
        className="mt-2 flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        <Plus size={14} /> Add
      </button>
    </div>
  );
};

/* ================= Address Section ================= */

interface State {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
  stateId?: number;
}

interface AddressSectionProps {
  school: any;
  onSave: (updatedAddress: {
    state: string;
    city: string;
    fullAddress: string;
    latitude: string;
    longitude: string;
  }) => void;
}

const AddressSection: React.FC<AddressSectionProps> = ({ school, onSave }) => {
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedStateId, setSelectedStateId] = useState<string>("");
  const [selectedCityId, setSelectedCityId] = useState<string>("");
  const [address, setAddress] = useState<string>(
    school?.address?.fullAddress || ""
  );
  const [latitude, setLatitude] = useState<string>(
    school?.location?.latitude || ""
  );
  const [longitude, setLongitude] = useState<string>(
    school?.location?.longitude || ""
  );
  const [fetchingLocation, setFetchingLocation] = useState(false);

  // COLLAPSIBLE
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // Load states
  useEffect(() => {
    getStates().then((res) => {
      const allStates: State[] = res?.data || res || [];
      setStates(allStates);
      if (school?.address?.state) {
        const match = allStates.find((s) => s.name === school.address.state);
        if (match) setSelectedStateId(match.id.toString());
      }
    });
  }, [school]);

  // Load cities
  useEffect(() => {
    if (selectedStateId) {
      getCities(selectedStateId).then((res) => {
        const allCities: City[] = res?.data || res || [];
        setCities(allCities);
        if (school?.address?.city) {
          const match = allCities.find((c) => c.name === school.address.city);
          if (match) setSelectedCityId(match.id.toString());
        }
      });
    } else {
      setCities([]);
    }
  }, [selectedStateId, school]);

  // Fetch current location
  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser");
      return;
    }
    setFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toString());
        setLongitude(position.coords.longitude.toString());
        setFetchingLocation(false);
      },
      (error) => {
        console.error(error);
        alert("Unable to fetch location");
        setFetchingLocation(false);
      }
    );
  };

  const handleSave = () => {
    if (!selectedStateId || !selectedCityId || !address.trim()) {
      alert("Please select state, city and enter address");
      return;
    }

    const stateName =
      states.find((s) => String(s.id) === selectedStateId)?.name || "";
    const cityName =
      cities.find((c) => String(c.id) === selectedCityId)?.name || "";

    const updatedAddress = {
      state: stateName,
      city: cityName,
      fullAddress: address,
      latitude,
      longitude,
    };

    onSave(updatedAddress);
  };

  return (
    <div className="space-y-4 p-0 border rounded-xl shadow-sm bg-white mb-6 overflow-hidden">
      {/* Header with toggle */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsOpen((s) => !s)}
      >
        <div className="flex items-center gap-3">
          <FaMapMarkerAltIcon className="text-[#257B5A]" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">School Address</h3>
            <p className="text-xs text-gray-500">
              {school?.address?.city ? `${school.address.city}, ${school.address.state}` : "No address set"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen((s) => !s);
            }}
            className="flex items-center gap-2 px-3 py-1 bg-[#257B5A] text-white rounded-lg hover:bg-[#1e6249]"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <>
                <span className="hidden sm:inline">Collapse</span>
                <ChevronUp size={16} />
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Expand</span>
                <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Collapsible content */}
      {isOpen && (
        <div className="p-6 border-t">
          {/* State */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              State
            </label>
            <select
              value={selectedStateId}
              onChange={(e) => {
                setSelectedStateId(e.target.value);
                setSelectedCityId(""); // reset city
              }}
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-[#257B5A] focus:border-[#257B5A]"
            >
              <option value="">Select State</option>
              {states.map((s: State) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              City
            </label>
            <select
              value={selectedCityId}
              onChange={(e) => setSelectedCityId(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-[#257B5A] focus:border-[#257B5A]"
              disabled={!selectedStateId}
            >
              <option value="">Select City</option>
              {cities.map((c: City) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Full Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Full Address
            </label>
            <textarea
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-[#257B5A] focus:border-[#257B5A]"
            />
          </div>

          {/* Latitude & Longitude with Button */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Latitude
              </label>
              <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-[#257B5A] focus:border-[#257B5A]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Longitude
              </label>
              <input
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-[#257B5A] focus:border-[#257B5A]"
              />
            </div>
            <div className="flex">
              <button
                onClick={fetchCurrentLocation}
                disabled={fetchingLocation}
                className="w-full bg-[#257B5A] text-white px-4 py-2 rounded-lg hover:bg-[#1e6249]"
              >
                {fetchingLocation ? "Fetching..." : "Use Current Location"}
              </button>
            </div>
          </div>

          {/* Save */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Save size={18} /> Save Address
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================= Tabs ================= */
const OverviewTab = ({
  data,
  onUpdate,
}: {
  data: any;
  onUpdate: (field: string, value: any) => void;
}) => (
  <div className="space-y-6">
    {[
      {
        label: "Welcome Note",
        field: "overview.welcomeNote",
        multiline: true,
        placeholder:
          "Write a welcome message (e.g., 'Welcome to ABC School!')",
      },
      {
        label: "Key Highlights",
        field: "overview.keyHighlights",
        list: true,
        placeholder: "e.g., Modern Library, Olympiad Winners",
      },
      {
        label: "Admission Criteria",
        field: "overview.admissionCriteriaEligibility",
        list: true,
        placeholder: "e.g., Age 5-18, Entrance Test Required",
      },
      {
        label: "School Hours",
        field: "overview.schoolHours",
        list: true,
        placeholder: "e.g., Mon-Fri: 8:00 AM - 3:00 PM",
      },
    ].map((section, idx) => (
      <div key={idx} className="bg-white rounded-lg border p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {section.label}
        </h3>
        {section.list ? (
          <EditableList
            items={data.overview?.[section.field.split(".")[1]] || []}
            onChange={(list) => onUpdate(section.field, list)}
            placeholder={section.placeholder}
          />
        ) : (
          <InlineEdit
            value={data.overview?.[section.field.split(".")[1]]}
            onSave={(val) => onUpdate(section.field, val)}
            multiline={section.multiline}
            placeholder={section.placeholder}
            className="w-full"
          />
        )}
      </div>
    ))}
  </div>
);

const FacilitiesTab = ({
  data,
  onUpdate,
}: {
  data: any;
  onUpdate: (field: string, value: any) => void;
}) => (
  <div className="space-y-6">
    {[
      {
        label: "Academic Facilities",
        field: "facilities.academic",
        placeholder: "e.g., Science Lab, Smart Classrooms",
      },
      {
        label: "Sports & Recreation",
        field: "facilities.sportsRecreation",
        placeholder: "e.g., Football Ground, Swimming Pool",
      },
      {
        label: "Infrastructure",
        field: "facilities.infrastructure",
        placeholder: "e.g., Medical Room, Cafeteria",
      },
    ].map((section, idx) => (
      <div key={idx} className="bg-white rounded-lg border p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {section.label}
        </h3>
        <EditableList
          items={data.facilities?.[section.field.split(".")[1]] || []}
          onChange={(list) => onUpdate(section.field, list)}
          placeholder={section.placeholder}
        />
      </div>
    ))}
  </div>
);

const FeesTab = ({
  data,
  onUpdate,
}: {
  data: any;
  onUpdate: (field: string, value: any) => void;
}) => (
  <div className="space-y-6">
    {[
      {
        label: "Annual Fee Structure",
        field: "fees.annualFeeStructure",
        placeholder: "e.g., Tuition Fee: $5000",
      },
      {
        label: "Additional Fees",
        field: "fees.additionalFees",
        placeholder: "e.g., Transport Fee: $200",
      },
    ].map((section, idx) => (
      <div key={idx} className="bg-white rounded-lg border p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {section.label}
        </h3>
        <EditableList
          items={data.fees?.[section.field.split(".")[1]] || []}
          onChange={(list) => onUpdate(section.field, list)}
          placeholder={section.placeholder}
        />
      </div>
    ))}
  </div>
);

const GalleryTab = ({
  data,
  onUpdate,
}: {
  data: any;
  onUpdate: (field: string, value: any) => void;
}) => {
  const parseGallery = () => {
    if (Array.isArray(data.gallery)) return data.gallery;
    try {
      return JSON.parse(data.gallery || "[]");
    } catch {
      return [];
    }
  };

  const galleryItems: string[] = parseGallery();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    try {
      const res: any = await uploadGalleryImages(data.id, files);
      const updatedGallery =
        res?.data?.gallery ?? res?.gallery ?? galleryItems;
      onUpdate("gallery", updatedGallery);
    } catch (err) {
      console.error("Error uploading gallery images:", err);
    } finally {
      e.target.value = "";
    }
  };

  const handleRemove = (index: number) => {
    const updated = galleryItems.filter((_, i) => i !== index);
    onUpdate("gallery", updated);
  };

  return (
    <div className="bg-white rounded-lg border p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Gallery</h3>

      {/* Upload Button */}
      <div className="mb-4">
        <label className="inline-flex items-center gap-2 px-3 py-2 bg-[#257B5A] text-white rounded-lg cursor-pointer hover:bg-[#1e6249]">
          <Plus size={16} />
          Upload Images
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </label>
        <p className="text-xs text-gray-500 mt-1">
          Upload school images. Uploaded images will appear below.
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryItems.map((img, idx) => (
          <div
            key={idx}
            className="relative group rounded-lg overflow-hidden border bg-gray-50"
          >
            <img
              src={img}
              alt={`Gallery ${idx + 1}`}
              className="w-full h-40 object-cover"
            />
            <button
              onClick={() => handleRemove(idx)}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReviewsTab = () => (
  <div className="bg-white rounded-lg border p-6 shadow-sm text-gray-600">
    No reviews yet
  </div>
);
const FAQsTab = () => (
  <div className="bg-white rounded-lg border p-6 shadow-sm text-gray-600">
    No FAQs yet
  </div>
);

/* ================= Main Component ================= */
const TABS = ["Overview", "Facilities", "Fees", "Gallery", "Reviews", "FAQs"];

export default function MySchool() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [schoolData, setSchoolData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // metadata lists
  const [categories, setCategories] = useState<any[]>([]);
  const [boards, setBoards] = useState<any[]>([]);
  const [mediums, setMediums] = useState<any[]>([]);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedBoardId, setSelectedBoardId] = useState<string>("");
  const [selectedMediumId, setSelectedMediumId] = useState<string>("");

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const uid = localStorage.getItem("userId");
        if (!uid) return;
        const res = await getSchoolByUserId(uid);
        setSchoolData(res.data);
      } catch (error) {
        console.error("Failed to fetch school data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchoolData();
  }, []);

  // fetch categories/boards/mediums
  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const res: any = await getCategoriesBoardMedium();
        const data = res?.data || res || {};
        setCategories(data.categories || []);
        setBoards(data.boards || []);
        setMediums(data.mediums || []);
      } catch (err) {
        console.error("Failed to fetch categories/boards/mediums:", err);
      }
    };
    fetchMeta();
  }, []);

  // when schoolData or meta lists change, try to sync selected ids
  useEffect(() => {
    if (!schoolData) return;

    const info = schoolData.overview?.schoolInformation || {};

    const findId = (list: any[], val: any) => {
      if (val == null) return "";
      if (typeof val === "number" || /^\d+$/.test(String(val))) {
        const match = list.find((l) => String(l.id) === String(val));
        if (match) return String(match.id);
      }
      const matchByName = list.find(
        (l) => String(l.name).toLowerCase() === String(val).toLowerCase()
      );
      if (matchByName) return String(matchByName.id);
      return "";
    };

    const catVal =
      info.category ?? schoolData.category ?? schoolData?.overview?.category;
    const boardVal =
      info.board ?? schoolData.board ?? schoolData?.overview?.board;
    const mediumVal =
      info.medium ?? schoolData.medium ?? schoolData?.overview?.medium;

    const cId = findId(categories, catVal);
    const bId = findId(boards, boardVal);
    const mId = findId(mediums, mediumVal);

    if (cId) setSelectedCategoryId(cId);
    if (bId) setSelectedBoardId(bId);
    if (mId) setSelectedMediumId(mId);
  }, [schoolData, categories, boards, mediums]);

  const handleDataUpdate = async (field: string, value: any) => {
    if (!schoolData) return;
    const keys = field.split(".");
    const updatedData = { ...schoolData };
    let current: any = updatedData;
    for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]];
    current[keys[keys.length - 1]] = value;
    setSchoolData(updatedData);

    try {
      const payload = mapToPayload(updatedData);
      await updateSchoolById(updatedData.id, payload);
    } catch (error) {
      console.error("Error updating school:", error);
    }
  };

  // New handler for category/board/medium selects:
  const handleSelectChange = async (
    type: "category" | "board" | "medium",
    selectedId: string
  ) => {
    if (!schoolData) return;

    const listMap: any = {
      category: categories,
      board: boards,
      medium: mediums,
    };
    const list = listMap[type] || [];
    const selectedObj = list.find((l: any) => String(l.id) === String(selectedId));
    const selectedName = selectedObj ? selectedObj.name : "";

    const updatedData = {
      ...schoolData,
      overview: {
        ...(schoolData.overview || {}),
        schoolInformation: {
          ...(schoolData.overview?.schoolInformation || {}),
          [type]: selectedName,
        },
      },
      [type]: selectedName,
    };

    setSchoolData(updatedData);

    if (type === "category") setSelectedCategoryId(selectedId);
    if (type === "board") setSelectedBoardId(selectedId);
    if (type === "medium") setSelectedMediumId(selectedId);

    try {
      const payload = mapToPayload(updatedData);
      await updateSchoolById(updatedData.id, payload);
    } catch (err) {
      console.error(`Failed to update ${type}:`, err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading school data...</p>
      </div>
    );
  }

  if (!schoolData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No school data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F1EE]">
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-14 py-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">My School</h2>
          <p className="mt-1 text-gray-600">
            Manage and showcase your school's identity, facilities, fee
            structure, and achievements — all in one place.
          </p>
        </div>

        {/* School Header */}
        <div className="bg-white rounded-lg border p-6 mb-6 shadow-sm">
          <div className="flex items-start gap-6">
            {/* Logo Upload */}
            <div className="w-32 h-32 bg-gray-100 rounded-2xl p-2 flex-shrink-0 relative overflow-hidden">
              <label className="cursor-pointer block w-full h-full">
                <img
                  src={
                    schoolData.profileImage ||
                    schoolData.profile_image ||
                    "/Listing/Logo.png"
                  }
                  alt="School Logo"
                  className="w-full h-full object-contain"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      const res: any = await uploadProfileImage(
                        schoolData.id,
                        file
                      );

                      const newUrl =
                        res?.data?.profile_image ?? res?.profile_image;

                      if (newUrl) {
                        setSchoolData((prev: any) => ({
                          ...prev,
                          profileImage: newUrl,
                          profile_image: newUrl,
                        }));
                      }
                    } catch (err) {
                      console.error("Error uploading profile image:", err);
                    } finally {
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </label>
              <div className="absolute bottom-1 right-1 bg-black/50 text-white px-2 py-1 text-xs rounded">
                Change
              </div>
            </div>

            {/* School Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-medium text-black mb-2">
                <InlineEdit
                  value={schoolData.firstName}
                  onSave={(val) => handleDataUpdate("firstName", val)}
                  className="text-2xl font-medium"
                  placeholder="Enter School Name"
                />
              </h1>
              <h1 className="text-2xl font-medium text-black mb-2">
                <InlineEdit
                  value={schoolData.lastName}
                  onSave={(val) => handleDataUpdate("lastName", val)}
                  className="text-2xl font-medium"
                  placeholder="Enter School Name"
                />
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAltIcon className="text-[#257B5A]" />
                  <InlineEdit
                    value={schoolData.address?.fullAddress}
                    onSave={(val) =>
                      handleDataUpdate("address.fullAddress", val)
                    }
                    className="text-gray-700"
                    placeholder="Full Address (e.g., 123 Main Street, NY)"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="text-[#257B5A]" />
                  <InlineEdit
                    value={schoolData.mobile}
                    onSave={(val) => handleDataUpdate("mobile", val)}
                    className="text-gray-700"
                    placeholder="Contact Number"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="text-[#257B5A]" />
                  <InlineEdit
                    value={schoolData.email}
                    onSave={(val) => handleDataUpdate("email", val)}
                    className="text-gray-700"
                    placeholder="Email Address"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="text-[#257B5A]" />
                  <InlineEdit
                    value={schoolData.website}
                    onSave={(val) => handleDataUpdate("website", val)}
                    className="text-gray-700"
                    placeholder="Website (https://...)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* School Details - Category / Board / Medium */}
        <div className="bg-white rounded-lg border p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            School Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Category
              </label>
              <select
                value={selectedCategoryId}
                onChange={(e) => handleSelectChange("category", e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-[#257B5A] focus:border-[#257B5A]"
              >
                <option value="">Select Category</option>
                {categories.map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {categories.length === 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  No categories loaded.
                </p>
              )}
            </div>

            {/* Board */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Board
              </label>
              <select
                value={selectedBoardId}
                onChange={(e) => handleSelectChange("board", e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-[#257B5A] focus:border-[#257B5A]"
              >
                <option value="">Select Board</option>
                {boards.map((b: any) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
              {boards.length === 0 && (
                <p className="text-xs text-gray-500 mt-1">No boards loaded.</p>
              )}
            </div>

            {/* Medium */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Medium
              </label>
              <select
                value={selectedMediumId}
                onChange={(e) => handleSelectChange("medium", e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg text-gray-700 focus:ring-2 focus:ring-[#257B5A] focus:border-[#257B5A]"
              >
                <option value="">Select Medium</option>
                {mediums.map((m: any) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
              {mediums.length === 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  No mediums loaded.
                </p>
              )}
            </div>
          </div>
        </div>

        <AddressSection
          school={schoolData}
          onSave={async (updatedAddress) => {
            const updatedData = {
              ...schoolData,
              address: {
                ...schoolData.address,
                ...updatedAddress,
              },
              location: {
                latitude: updatedAddress.latitude,
                longitude: updatedAddress.longitude,
              },
            };
            setSchoolData(updatedData);
            try {
              const payload = mapToPayload(updatedData);
              await updateSchoolById(updatedData.id, payload);
            } catch (error) {
              console.error("Error updating address:", error);
            }
          }}
        />

        {/* Tabs */}
        <div className="bg-white border rounded-lg mb-6 overflow-x-auto shadow-sm">
          <div className="flex border-b">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  "px-6 py-3 text-[16px] font-medium transition-colors duration-300 border-b-2 whitespace-nowrap",
                  activeTab === tab
                    ? "border-[#257B5A] text-[#257B5A] bg-green-50"
                    : "border-transparent text-gray-600 hover:text-[#257B5A] hover:bg-gray-50"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {(() => {
            switch (activeTab) {
              case "Overview":
                return (
                  <OverviewTab data={schoolData} onUpdate={handleDataUpdate} />
                );
              case "Facilities":
                return (
                  <FacilitiesTab data={schoolData} onUpdate={handleDataUpdate} />
                );
              case "Fees":
                return <FeesTab data={schoolData} onUpdate={handleDataUpdate} />;
              case "Gallery":
                return (
                  <GalleryTab data={schoolData} onUpdate={handleDataUpdate} />
                );
              case "Reviews":
                return <ReviewsTab />;
              case "FAQs":
                return <FAQsTab />;
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </div>
  );
}
