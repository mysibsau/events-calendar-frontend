import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import useMount from "./useMount";
import { IconCloseX } from "../Icons";
import Portal from "../Portal";
import { modalAnimation, overlayAnimation, ANIMATION_TIME } from "./consts";
import "./Modal.scss";
import "./ModalAnimation.scss";

interface IProps {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const ModalContent: React.FC<IProps> = ({
  children,
  isShow,
  setIsShow,
  title,
  subtitle,
}) => {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  const [animationIn, setAnimationIn] = useState(false);

  useEffect(() => {
    setAnimationIn(isShow);
  }, [isShow]);

  return (
    <div className={"modal-container"}>
      <CSSTransition
        in={animationIn}
        nodeRef={overlayRef}
        timeout={ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames={overlayAnimation}
      >
        <div
          ref={overlayRef}
          className={"modal-overlay"}
          onClick={() => setIsShow(false)}
        ></div>
      </CSSTransition>

      <CSSTransition
        in={animationIn}
        nodeRef={modalRef}
        timeout={ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames={modalAnimation}
      >
        <div ref={modalRef} className={"modal-content"}>
          <div className={"modal-control"}>
            {title ? (
              <div className={"modal-title"}>
                <div className="title">{title}</div>
                {subtitle ? <div className={"subtitle"}>{subtitle}</div> : null}
              </div>
            ) : null}
            <div className={"close"} onClick={() => setIsShow(false)}>
              <IconCloseX size={25} />
            </div>
          </div>

          <div className={"modal-body"}>{children}</div>
        </div>
      </CSSTransition>
    </div>
  );
};

const Modal: React.FC<IProps> = (props) => {
  const { mounted } = useMount(props.isShow, ANIMATION_TIME);

  if (!mounted) {
    return null;
  }

  return (
    <Portal>
      <ModalContent {...props}>{props.children}</ModalContent>
    </Portal>
  );
};

export default Modal;
