import React, { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/store";

import {Table, Button} from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";

import dayjs from "dayjs";

import type { EduDegrees } from "../types";

import { fetchEducationsData } from "../redux/features/Degrees/request";
import { selectDefaultLang } from "../redux/features/Languages/languagesSlice";

import CreateEditModal from "./CreateEditModal";
import ActionsDropdown from "./ActionsDropdown";

const EducationTable = () => {
  const { data, loading } = useSelector((state: RootState) => state.education);
  const dispatch:any = useAppDispatch();
  const [editingRecord, setEditingRecord] = useState<EduDegrees | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const defaultLang = useSelector(selectDefaultLang);

  useEffect(() => {
    dispatch(fetchEducationsData());
  }, [dispatch]);

  const openAddModal = () => {
    setEditingRecord(null);
    setIsModalOpen(true);
  };

  const handleEditableRecord = (record: EduDegrees) => {
    setEditingRecord(record);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRecord(null);
  };

  const columns: ColumnsType<EduDegrees> = [
    {
      title: "Educational Degrees",
      key: "name",
      fixed: "left",
      render: (_, record) => record.translations.find((edu) => edu.slug === defaultLang)?.name,
    },
    {
      title: "Abbreviations",
      key: "abbreviations",
      fixed: "left",
      render: (_, record) => record.translations.find((edu) => edu.slug === defaultLang)?.abbreviation,
    },
    {
      title: "Start Date",
      key: "start_date",
      fixed: "left",
      render: (_, record) => dayjs(record.start_date).format("DD/MM/YYYY"),
    },
    {
      title: "End Date",
      key: "end_date",
      fixed: "left",
      render: (_, record) => record.end_date && dayjs(record.end_date).format("DD/MM/YYYY"),
    },
    {
      title: "",
      key: "actions",
      fixed: "left",
      render: (_, record) => (
        <ActionsDropdown record={record} editableRecord={handleEditableRecord} />
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined/> as ReactNode}
        style={{ marginBottom: 16 }}
        onClick={openAddModal}
      >
        Add New
      </Button>

      <Table<EduDegrees>
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={(record) => record.id}
      />

      <CreateEditModal
        isModalOpen={isModalOpen}
        record={editingRecord}
        onCancel={handleCloseModal}
      />
    </>
  );
};

export default EducationTable;
