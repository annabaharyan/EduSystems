import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Tabs } from "antd";

import type { EduDegrees } from "../types";
import type { AppDispatch } from "../redux/store";

import { selectDefaultLang } from "../redux/features/Languages/languagesSlice";
import { addEducation, editEducation } from "../redux/features/Degrees/request";

import EduForm from "./EduForm";
import {notify} from "../helpers/notifHelper.ts";

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
  const dispatch: any = useDispatch<AppDispatch>();

  const [translations, setTranslations] = useState<
    Record<string, { name: string; abbreviation: string }>
  >({});
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  useEffect(() => {
    if (isModalOpen && record) {
      const initialTranslations: typeof translations = {};
      record.translations.forEach((t) => {
        initialTranslations[t.slug] = {
          name: t.name,
          abbreviation: t.abbreviation,
        };
      });

      setTranslations(initialTranslations);
      setStartDate(record.start_date ?? null);
      setEndDate(record.end_date ?? null);
    } else if (!record && isModalOpen) {
      const emptyTranslations = LANGS.reduce((acc, { slug }) => {
        acc[slug] = { name: "", abbreviation: "" };
        return acc;
      }, {} as typeof translations);

      setTranslations(emptyTranslations);
      setStartDate(null);
      setEndDate(null);
    }
  }, [isModalOpen, record, defaultLang]);

  const handleChange = (slug: string, values: { name: string; abbreviation: string }) => {
    setTranslations((prev) => ({
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
      }));

    if (filled.length === 0) {
      notify({ type: "error", message: "Please fill at least one translation." });
      return;
    }

    const basePayload = {
      start_date: startDate ?? new Date().toISOString(),
      end_date: endDate,
      translations: filled,
    };

    try {
      let resultAction;

      if (record?.id) {
        resultAction = await dispatch(editEducation({ id: record.id, ...basePayload }));
        if (editEducation.fulfilled.match(resultAction)) {
          notify({ type: "success", message: "Education updated successfully." });
          handleCancel();
          return;
        }
        notify({ type: "error", message: resultAction.payload || "Update failed." });
      } else {
        resultAction = await dispatch(addEducation(basePayload));
        if (addEducation.fulfilled.match(resultAction)) {
          notify({ type: "success", message: "Education added successfully." });
          handleCancel();
          return;
        }
        notify({ type: "error", message: resultAction.payload || "Add failed." });
      }
    } catch (error) {
      notify({ type: "error", message: "Unexpected error occurred." });
    }
  };


  const handleCancel = () => {
    setTranslations({});
    setStartDate(null);
    setEndDate(null);
    onCancel();
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
        mode={record ? "edit" : "add"}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
    ),
  }));

  return (
    <Modal
      title={record ? "Edit Education" : "Add Education"}
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={handleSave}
      okText="Save"
      cancelText="Cancel"
    >
      <Tabs defaultActiveKey={defaultLang} items={tabItems} />
    </Modal>
  );
};

export default CreateEditModal;
