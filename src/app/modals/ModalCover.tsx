import { ReactNode } from "react";
import { Modal, ModalProps } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { closeModal } from "./modalSlice";

type Props = {
    children:ReactNode
    header?: string
} & ModalProps


function ModalCover({ children, header, ...props }: Props) {
    const {open} = useAppSelector(state=> state.modals);
    const dispatch = useAppDispatch();

  return (
    <Modal open={open} onClose={() => dispatch(closeModal())} size={props.size}>
        {header && <Modal.Header>{header}</Modal.Header>}
        <Modal.Content>
            {children}
        </Modal.Content>

    </Modal>
  )
}
export default ModalCover;