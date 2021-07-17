import React, { useRef, useEffect, useCallback } from "react";
import "react-responsive-modal/styles.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@material-ui/core";


const SugarModal = ({showSugarModal,setShowSugarModal}) => {
    const modalRef = useRef();
    
    const closeSugarModal = (e) => {
        if (modalRef.current === e.target) {
          setShowSugarModal(false);
        }
      };
    
      const keyPress = useCallback(
        (e) => {
          if (e.key === "Escape" && showSugarModal) {
            closeSugarModal()
          }
        },
        [setShowSugarModal, showSugarModal]
      );

      useEffect(() => {
        document.addEventListener("keydown", keyPress);
        return () => document.removeEventListener("keydown", keyPress);
      }, [keyPress]);

     
        return (
            <>
              {showSugarModal ? (

              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                showSugarModal={showSugarModal}
                onHide={closeSugarModal}
                ref={modalRef}
                >
                    <Modal.Header>
                    <Modal.Title><h4>Hello Sugar Level</h4></Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                        <h2>Graph</h2>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary"  onClick={() => setShowSugarModal((prev) => !prev)}>
                                        Close
                            </Button>
                        </Modal.Footer>
               </Modal>
               ) : null}
            </>
      )

}

export default SugarModal;