import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Modal, Tabs, message } from "antd";

import type { EduDegrees } from "../types";
import type { AppDispatch } from "../redux/store";

import { selectDefaultLang } from "../redux/features/Languages/languagesSlice";
import { addEducation, editEducation } from "../redux/features/Degrees/request";

import EduForm from "./EduForm";

type CreateEditModalProps = {
  isModalOpen: boolean;
  record: EduDegrees | null;
  onCancel: VoidFunction;
};

const LANGS = [
  { slug: "ru", label: "Russian" },
  { slug: "us", label: "English" },
  { slug: "am", label: "Armenian" },
];

const CreateEditModal = ({ isModalOpen, record, onCancel }: CreateEditModalProps) => {
  const defaultLang = useSelector(selectDefaultLang);
  const dispatch:any = useDispatch<AppDispatch>();

  const [translations, setTranslations] = useState<Record<string, { name: string; abbreviation: string, startDate?:string, endDate?:string}>>({});

  useEffect(() => {
    if (isModalOpen && record) {
      const matched = record.translations.find(t => t.slug === defaultLang);
      setTranslations(matched ? {
        [defaultLang]: {
          name: matched.name,
          abbreviation: matched.abbreviation
        }
      } : {});
    } else if (!record && isModalOpen) {
      setTranslations({});
    }
  }, [isModalOpen, record, defaultLang]);

  const handleChange = (slug: string, values: { name: string; abbreviation: string }) => {
    setTranslations(prev => ({
      ...prev,
      [slug]: values,
    }));
  };

  const handleSave = async () => {
    const filled = Object.entries(translations)
      .filter(([_, val]) => val.name?.trim() || val.abbreviation?.trim())
      .map(([slug, val]) => ({
        slug,
        name: val.name?.trim() || "",
        abbreviation: val.abbreviation?.trim() || "",
        start_date: val.startDate || null,
        end_date: val.endDate || null,
      }));

    if (filled.length === 0) {
      message.error("Please fill at least one translation.");
      return;
    }

    const basePayload = {
      start_date: record?.start_date ?? new Date().toISOString(),
      end_date: record?.end_date ?? null,
      translations: filled,
    };

    try {
      let resultAction;

      if (record?.id) {
        // Edit logic
        resultAction = await dispatch(editEducation({ id: record.id, ...basePayload }));

        if (editEducation.fulfilled.match(resultAction)) {
          message.success("Education updated successfully.");
          onCancel();
        } else {
          message.error(resultAction.payload || "Update failed.");
        }
      } else {
        // Add logic
        resultAction = await dispatch(addEducation(basePayload));

        if (addEducation.fulfilled.match(resultAction)) {
          message.success("Education added successfully.");
          onCancel();
        } else {
          message.error(resultAction.payload || "Add failed.");
        }
      }
    } catch (error) {
      message.error("Unexpected error occurred.");
    }
  };

  const tabItems = LANGS.map(({ slug, label }) => ({
    key: slug,
    label,
    icon: (
      <img
        src={`${import.meta.env.VITE_API_URL}/flags/${slug}.svg`}
        alt="flag"
        style={{ width: 15, height: 15, borderRadius: "50%" }}
      />
    ),
    children: (
      <EduForm
        slug={slug}
        values={translations[slug] || { name: "", abbreviation: "" }}
        onChange={handleChange}
        mode={record?'edit':'add'}
      />
    ),
  }));

  return (
    <Modal
      title="Edit Education"
      open={isModalOpen}
      onCancel={onCancel}
      onOk={handleSave}
      okText='Save'
      cancelText='Cancel'
    >
      <Tabs defaultActiveKey={defaultLang} items={tabItems} />
    </Modal>
  );
};

export default CreateEditModal;
