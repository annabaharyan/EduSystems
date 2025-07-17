import { useState } from "react";

import { Button, Dropdown, message } from "antd";
import { DashOutlined } from "@ant-design/icons";

import type { EduDegrees } from "../types";
import type { ReactNode } from "react";

import { useAppDispatch } from "../redux/store";
import { deleteEducationById } from "../redux/features/Degrees/request";

import DeleteModal from "./DeleteModal";

type ActionDropdownProps={
  record: EduDegrees |null,
  editableRecord: (record:EduDegrees)=>void
}
const ActionDropdown = ({ record, editableRecord }: ActionDropdownProps) => {
  const dispatch:any=useAppDispatch()

  const [deleteableRecordId, setDeletableRecordId]=useState<null|number>(null)
  const handleDelete = async (id: number | null) => {
    if (id === null) return;
    try {
      await dispatch(deleteEducationById(id));
      message.success(`Education with ID ${id} deleted`);
      setDeletableRecordId(null);
    } catch (err) {
      message.error('Failed to delete education');
    }
  };

  const items = [
    {
      key: 'edit',
      label: <span onClick={() => record && editableRecord(record)}>Edit</span>,
    },
    {
      key: 'delete',
      label: <span onClick={() => record && setDeletableRecordId(record.id)}>Delete</span>,
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={['click']}>
        <Button icon={<DashOutlined /> as ReactNode} />
      </Dropdown>
      <DeleteModal
        isModalOpen={deleteableRecordId !== null}
        onDelete={() => handleDelete(deleteableRecordId)}
        onCancel={() => setDeletableRecordId(null)}
      />

    </>
  );
};


export default ActionDropdown