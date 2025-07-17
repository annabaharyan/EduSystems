import {Modal} from "antd";

type CreateEditModalProps={
  isModalOpen: boolean;
  onDelete:() => Promise<void>;
  onCancel: VoidFunction
}
const DeleteModal=({isModalOpen, onDelete, onCancel}:CreateEditModalProps)=>{

  return <Modal
    title=""
    open={isModalOpen}
    onOk={onDelete}
    onCancel={onCancel}
    okText={'Delete'}
    cancelText={'Cancel'}
  >
    Are you sure you want to delete this item? Deleted data is safely stored in the trash. You can restore it anytime.
  </Modal>
}

export default DeleteModal