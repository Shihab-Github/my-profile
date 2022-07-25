import React, { useState, useEffect } from "react";
import { ValidationError } from "yup";
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../services/firebase/config";
import { experience, experienceSchema } from "../../../../data/Experiences";
import { EXPERIENCES } from "../../../../constants/collections";

const useExperienceHook = (
  shouldCallApi: boolean,
  presentJob?: boolean,
  reRenderUI?: () => void,
  reload?: () => void,
  showToast?: (msg: string, severity: string) => void
) => {
  const [showEndDates, setShowEndDates] = useState(presentJob);
  const [editMode, setEditMode] = useState(false);
  const [experiences, setExperiences] = useState<experience[]>([]);
  const [callCount, setCallCount] = useState(0);
  const [loading, setLoading] = useState(false)

  const [titleError, setTitleError] = useState("");
  const [companyError, setCompanyError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const dataFromFireStore: experience[] = [];

      const q = query(collection(db, EXPERIENCES));

      onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const data = { ...change.doc.data() };
            dataFromFireStore.push({
              id: change.doc.id,
              jobTitle: data.jobTitle,
              company: data.company,
              current: data.current,
              jd: data.jd,
              fromDate: {
                month: data.fromMonth,
                year: data.fromYear,
              },
              toDate: data.toMonth
                ? {
                    month: data.toMonth,
                    year: data.toYear,
                  }
                : null,
            });
          }

          const source = snapshot.metadata.fromCache ? "local cache" : "server";
          console.log("Data came from " + source);
        });

        setExperiences(dataFromFireStore);
      });
    };
    if (shouldCallApi) fetchData();
    if (!shouldCallApi && callCount > 0) fetchData();
  }, [shouldCallApi, callCount]);

  const toggleEndDate = () => {
    setShowEndDates((prev) => !prev);
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const fetchAgain = () => {
    setCallCount((prev) => prev + 1);
  };

  const onTitleChange = () => titleError && setTitleError("");

  const onCompanyChange = () => companyError && setCompanyError("");

  const saveExperience = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const title = formData.get("jobTitle") as string;
    const company = formData.get("company") as string;
    let current = false;
    let isCurrent = formData.get("isCurrent") as string;
    let fromMonth = formData.get("fromMonth") as string;
    let fromYear = Number(formData.get("fromYear") as string);
    if (isCurrent === "on") current = true;
    else current = false;
    let toMonth = formData.get("toMonth") as string;
    let toYear = formData.get("toYear") as string;
    let jd = formData.get("jd") as string;
    let docId = formData.get("docId") as string;

    try {
      const exp = experienceSchema.validateSync({
        jobTitle: title.trim(),
        company: company.trim(),
        current,
        fromMonth,
        fromYear,
        toMonth,
        toYear,
        jd,
      });

      setLoading(true)
      if (docId) {
        const docRef = doc(db, EXPERIENCES, docId);
        await updateDoc(docRef, exp);
        showToast && showToast("Experience Updated", "success");
      } else {
        const docRef = await addDoc(collection(db, EXPERIENCES), exp);
        if (docRef.id) {
          showToast && showToast("Experience Added", "success");
        }
      }
      setLoading(false)

      reRenderUI && reRenderUI();
      reload && reload();
    } catch (exception) {
      console.log("exception: ", exception);
      if ((exception as ValidationError).path === "jobTitle") {
        setTitleError((exception as ValidationError).message);
      }
      if ((exception as ValidationError).path === "company") {
        setCompanyError((exception as ValidationError).message);
      }
    }
  };

  const deleteEntry = async (callBack: () => void, data: string) => {
    console.log("delete data", data);
    await deleteDoc(doc(db, EXPERIENCES, data));
    callBack();
    showToast && showToast("Experience deleted", "success");
    reload && reload();
  };

  return {
    showEndDates,
    editMode,
    toggleEndDate,
    toggleEditMode,
    experiences,
    saveExperience,
    companyError,
    titleError,
    onTitleChange,
    onCompanyChange,
    fetchAgain,
    deleteEntry,
    loading
  };
};

export default useExperienceHook;
