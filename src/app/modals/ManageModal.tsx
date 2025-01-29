import LoginForm from "../features/auth/LoginForm";
import { useAppSelector, useAppDispatch } from "../store/store";
import { closeModal } from './modalSlice';
import ModalCover from './ModalCover'; 

function ManageModal() {
    const modalLookup = {
        LoginForm
    }
    const {type, data, open} = useAppSelector(state => state.modals)
    const dispatch = useAppDispatch();
    let renderedModal = null;

    if (open && type) {
        const ModalComponent = modalLookup[type as keyof typeof modalLookup];
      renderedModal = <ModalComponent data={data}/>
    }
   return (
    <ModalCover open={open} onClose={() => dispatch(closeModal())}>
      {renderedModal}
    </ModalCover>
  )
}


export default ManageModal;
