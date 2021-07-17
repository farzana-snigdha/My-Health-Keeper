import React, { useState, useRef, useEffect, useCallback } from "react";
import "../../../static/Styling/spHealthInfo.css";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { MdClose } from "react-icons/md";
import axios from "axios";
import { Button, IconButton, Link } from "@material-ui/core";
//import Modal from 'react-modal';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const Background = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 30%;
  height: 40%;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  position: relative;
  border-radius: 10px;
  padding: 20px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;
const initialState = {
  description: "",
  noteDate: "",
};
const SpHealthModal = ({ showModal, setShowModal, value }) => {
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  // const [disable, setDisable] = React.useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [folderdata, setFolderdata] = useState("");
  const [editData, setEditData] = useState(initialState);
  const { description, noteDate } = editData;
  const modalRef = useRef();

  console.log("dfghjk ", value);

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const getFolderContentForModal = async (folderId) => {
    console.log("folderId  ", folderId);
    const ans = await axios.get(
      "http://localhost:5000/api/getFolderDataForModal/" + folderId,
      {
        headers: { Authorization: token },
      }
    );
    console.log("getFolderContentForModal", ans.data);

    setFolderdata(ans.data);
  };
  console.log("dfghjfycgvhb fcgvh fghj", folderdata);

  const editFolder = async (folderId) => {
    await axios
      .post("http://localhost:5000/api/getFolderDataForModal/" + folderId, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log("editfolder", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <ModalWrapper showModal={showModal}>
            {console.log(getFolderContentForModal())}

            <Modal.Header>
              <Modal.Title>📝 Edit </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className="center">
                <div>
                  <label for="date">Note Date : </label>
                  <input
                    type="date"
                    value={"m"}
                    // onChange={handleChangeInput}
                    name="noteDate"
                  />
                </div>
                <div>
                  <label for="description">Description : </label>
                  <input
                    value={description}
                    // onChange={handleChangeInput}
                    name="description"
                  />
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  );
};

export default SpHealthModal;
