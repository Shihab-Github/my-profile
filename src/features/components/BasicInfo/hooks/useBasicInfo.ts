import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../../services/firebase/config";
import { BasicInfoShape } from "../../../../data/Shapes";
import { basicInfoSchema } from "../../../../data/UserBasicInfo";
import { BASIC_INFO, PHOTO_FOLDER } from "../../../../constants/collections";

const useBasicInfo = (
  shouldCallApi: boolean,
  setToast?: (msg: string, severity: string) => void,
  toggleProfileEditMode?: () => void,
  reloadData?: () => void
) => {
  const [editMode, setEditMode] = useState(false);
  const [callCount, setCallCount] = useState(0);
  const [basicInfo, setBasicInfo] = useState<BasicInfoShape>({
    id: "",
    name: "",
    age: 0,
  });
  const [fileName, setFileName] = useState("");
  const [nameErrorText, setNameErrorText] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let dataFromFireStore: BasicInfoShape = {
        id: "",
        name: "",
        age: 0,
      };

      const q = query(collection(db, BASIC_INFO));

      onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const data = { ...change.doc.data() };
            dataFromFireStore = {
              id: change.doc.id,
              name: data.name,
              age: data.age,
            };
          }
          const source = snapshot.metadata.fromCache ? "local cache" : "server";
          console.log("Data came from " + source);
        });

        setBasicInfo(dataFromFireStore);
      });
    };
    if (shouldCallApi) fetchData();
    if (!shouldCallApi && callCount > 0) fetchData();
  }, [shouldCallApi, callCount]);

  useEffect(() => {
    const fetchPhoto = () => {
      const imageFolderRef = ref(storage, `${PHOTO_FOLDER}/`);
      listAll(imageFolderRef).then((response) => {
        console.log("response: ", response);
        if (response.items.length > 0) {
          let lastItem = response.items[response.items.length - 1];
          getDownloadURL(lastItem).then((url) => {
            setProfilePhoto(url);
          });
        }
      });
    };

    if (shouldCallApi) fetchPhoto();
    if (!shouldCallApi && callCount > 0) fetchPhoto();
  }, [shouldCallApi, callCount]);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const fetchAgain = () => {
    setCallCount((prev) => prev + 1);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const file = e.currentTarget.files[0];
      console.log("file: ", file);
      setFileName(file.name);
    }
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (nameErrorText) setNameErrorText("");
  };

  const saveBasicInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let photoRef = null;
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const docId = formData.get("basicInfoDocId") as string;
    const name = formData.get("name") as string;
    const age = formData.get("age");
    const photo = formData.get("profile-photo") as File;

    if (photo.name !== "") {
      photoRef = ref(storage, `${PHOTO_FOLDER}/user.jpg`);
    }

    try {
      const basicInfoOb = basicInfoSchema.validateSync({
        name: name.trim(),
        age,
      });
      const docRef = doc(db, BASIC_INFO, docId);
      if (photoRef) {
        let [photoResult, docResult] = await Promise.all([
          uploadBytes(photoRef, photo),
          updateDoc(docRef, basicInfoOb),
        ]);
        console.log("photoResult: ", photoResult);
        console.log("docResult: ", docResult);
      } else await updateDoc(docRef, basicInfoOb);
      setToast && setToast("Profile updated", "success");
      toggleProfileEditMode && toggleProfileEditMode();
      reloadData && reloadData();
    } catch (exc) {
      console.log(exc);
    }
  };

  return {
    basicInfo,
    toggleEditMode,
    editMode,
    saveBasicInfo,
    onNameChange,
    nameErrorText,
    fetchAgain,
    fileName,
    handleFileSelect,
    profilePhoto,
  };
};

export default useBasicInfo;
