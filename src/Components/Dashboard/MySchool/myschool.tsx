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
} from "lucide-react";
import { FaMapMarkerAlt as FaMapMarkerAltIcon } from "react-icons/fa";
import {
  getSchoolByUserId,
  updateSchoolById,
} from "../../../../services/schoolServices";

/* ================= Map API Payload ================= */
const mapToPayload = (data: any) => {
  return {
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    profile_image: data.profileImage || null,
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
  editMode = false,
}: {
  value: string | null;
  onSave: (value: string) => void;
  type?: string;
  placeholder?: string;
  multiline?: boolean;
  className?: string;
  editMode?: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value || "");

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const renderInput = () =>
    multiline ? (
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
    );

  if (editMode) return <>{renderInput()}</>;

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 w-full">
        {renderInput()}
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
  editMode = false,
}: {
  items: any;
  onChange: (items: string[]) => void;
  placeholder: string;
  editMode?: boolean;
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
  const handleDelete = (index: number) => {
    const updated = safeItems.filter((_, i) => i !== index);
    onChange(updated);
  };
  const handleAdd = () => {
    onChange([...safeItems, ""]);
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
            editMode={editMode}
          />
          {!editMode && (
            <button
              onClick={() => handleDelete(idx)}
              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      ))}
      {editMode && (
        <button
          onClick={handleAdd}
          className="mt-2 flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <Plus size={14} /> Add
        </button>
      )}
    </div>
  );
};

/* ================= Tabs ================= */
const OverviewTab = ({
  data,
  onUpdate,
  editMode,
}: {
  data: any;
  onUpdate: (field: string, value: any) => void;
  editMode: boolean;
}) => (
  <div className="space-y-6">
    {[
      {
        label: "Welcome Note",
        field: "overview.welcomeNote",
        multiline: true,
        placeholder:
          "Write a short message welcoming students & parents (e.g., 'Welcome to ABC School!')",
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
            editMode={editMode}
          />
        ) : (
          <InlineEdit
            value={data.overview?.[section.field.split(".")[1]]}
            onSave={(val) => onUpdate(section.field, val)}
            multiline={section.multiline}
            placeholder={section.placeholder}
            className="w-full"
            editMode={editMode}
          />
        )}
      </div>
    ))}
  </div>
);

const FacilitiesTab = ({
  data,
  onUpdate,
  editMode,
}: {
  data: any;
  onUpdate: (field: string, value: any) => void;
  editMode: boolean;
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
          editMode={editMode}
        />
      </div>
    ))}
  </div>
);

const FeesTab = ({
  data,
  onUpdate,
  editMode,
}: {
  data: any;
  onUpdate: (field: string, value: any) => void;
  editMode: boolean;
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
          editMode={editMode}
        />
      </div>
    ))}
  </div>
);

const GalleryTab = ({
  data,
  onUpdate,
  editMode,
}: {
  data: any;
  onUpdate: (field: string, value: any) => void;
  editMode: boolean;
}) => (
  <div className="bg-white rounded-lg border p-6 shadow-sm">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Gallery</h3>
    <EditableList
      items={
        Array.isArray(data.gallery)
          ? data.gallery
          : JSON.parse(data.gallery || "[]")
      }
      onChange={(list) => onUpdate("gallery", list)}
      placeholder="Paste image URL here"
      editMode={editMode}
    />
  </div>
);

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
  const [editMode, setEditMode] = useState(false);

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

  const handleDataUpdate = async (field: string, value: any) => {
    if (!schoolData) return;
    const keys = field.split(".");
    const updatedData = { ...schoolData };
    let current: any = updatedData;
    for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]];
    current[keys[keys.length - 1]] = value;
    setSchoolData(updatedData);
  };

  const handleSaveAll = async () => {
    if (!schoolData) return;
    try {
      const payload = mapToPayload(schoolData);
      await updateSchoolById(schoolData.id, payload);
      setEditMode(false);
    } catch (error) {
      console.error("Error saving school:", error);
    }
  };

  const renderTabContent = () => {
    if (!schoolData) return null;
    switch (activeTab) {
      case "Overview":
        return (
          <OverviewTab
            data={schoolData}
            onUpdate={handleDataUpdate}
            editMode={editMode}
          />
        );
      case "Facilities":
        return (
          <FacilitiesTab
            data={schoolData}
            onUpdate={handleDataUpdate}
            editMode={editMode}
          />
        );
      case "Fees":
        return (
          <FeesTab
            data={schoolData}
            onUpdate={handleDataUpdate}
            editMode={editMode}
          />
        );
      case "Gallery":
        return (
          <GalleryTab
            data={schoolData}
            onUpdate={handleDataUpdate}
            editMode={editMode}
          />
        );
      case "Reviews":
        return <ReviewsTab />;
      case "FAQs":
        return <FAQsTab />;
      default:
        return null;
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
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">My School</h2>
            <p className="mt-1 text-gray-600">
              Manage and showcase your school's identity, facilities, fee
              structure, and achievements — all in one place.
            </p>
          </div>
          <button
            onClick={editMode ? handleSaveAll : () => setEditMode(true)}
            className="px-4 py-2 bg-[#257B5A] text-white rounded-lg hover:bg-[#1e6249]"
          >
            {editMode ? "Save All" : "Edit All"}
          </button>
        </div>

        {/* School Header */}
        <div className="bg-white rounded-lg border p-6 mb-6 shadow-sm">
          <div className="flex items-start gap-6">
            {/* Logo Upload */}
            <div className="w-32 h-32 bg-gray-100 rounded-2xl p-2 flex-shrink-0 relative overflow-hidden">
              <label className="cursor-pointer block w-full h-full">
                <img
                  src={schoolData.profileImage || "/Listing/Logo.png"}
                  alt="School Logo"
                  className="w-full h-full object-contain"
                />
                {editMode && (
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        const reader = new FileReader();
                        reader.onloadend = async () => {
                          const base64Image = reader.result;
                          const payload = mapToPayload({
                            ...schoolData,
                            profileImage: base64Image,
                          });
                          const res = await updateSchoolById(
                            schoolData.id,
                            payload
                          );
                          setSchoolData(res.data);
                        };
                        reader.readAsDataURL(file);
                      } catch (err) {
                        console.error("Error uploading logo:", err);
                      }
                    }}
                  />
                )}
              </label>
              {editMode && (
                <div className="absolute bottom-1 right-1 bg-black/50 text-white px-2 py-1 text-xs rounded">
                  Change
                </div>
              )}
            </div>

            {/* School Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-medium text-black mb-2">
                <InlineEdit
                  value={schoolData.firstName}
    
                  onSave={(val) => handleDataUpdate("firstName", val)}
                  className="text-2xl font-medium"
                  placeholder="Enter School Name"
                  editMode={editMode}
                />
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAltIcon className="text-[#257B5A]" />
                  <InlineEdit
                    value={schoolData.address?.fullAddress}
                    onSave={(val) => handleDataUpdate("address.fullAddress", val)}
                    className="text-gray-700"
                    placeholder="Full Address (e.g., 123 Main Street, NY)"
                    editMode={editMode}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="text-[#257B5A]" />
                  <InlineEdit
                    value={schoolData.mobile}
                    onSave={(val) => handleDataUpdate("mobile", val)}
                    className="text-gray-700"
                    placeholder="Contact Number"
                    editMode={editMode}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="text-[#257B5A]" />
                  <InlineEdit
                    value={schoolData.email}
                    onSave={(val) => handleDataUpdate("email", val)}
                    className="text-gray-700"
                    placeholder="Email Address"
                    editMode={editMode}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="text-[#257B5A]" />
                  <InlineEdit
                    value={schoolData.website}
                    onSave={(val) => handleDataUpdate("website", val)}
                    className="text-gray-700"
                    placeholder="Website (https://...)"
                    editMode={editMode}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

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
        <div className="min-h-[600px]">{renderTabContent()}</div>
      </div>
    </div>
  );
}
