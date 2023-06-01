import { Portal } from '../Portal';
import { CloseButton } from './CloseButton';
import { ModalTitle } from './ModalTitle';

export const Modal = ({ closeModal, showModal, children, title, styles = {} }) => {
  const classes = ["modal-window",showModal? "active" : ""];

  return showModal ? (
    <Portal>
      <div className="overlay">
        <div className="modal-window-dialog">
          <div className={classes.join(" ")}>
            {closeModal && <CloseButton onClose={closeModal} />}
            {title && <ModalTitle title={title}/>}
            {children}
          </div>
        </div>
      </div>
    </Portal>
  ) : null;
}
