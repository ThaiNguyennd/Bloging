import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

export default function useFirebaseImage(getValues, setValue,imageName =null ,cb) {
  const [progress, setprogress] = useState(0);
  const [image, setImage] = useState();
  const handleUploadImage = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPecent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setprogress(progressPecent);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("nothing");
        }
      },
      (error) => {
        console.log("eros");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };
  const UploadFile = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;
    setValue("image_name", file.name);
    handleUploadImage(file);
  };
  const handleDeleteIamge = () => {
    const storage = getStorage();
    const desertRef = ref(storage, "images/" +imageName|| getValues("image_name"));
    deleteObject(desertRef)
      .then(() => {
        setImage("");
        setprogress(0);
        cb && cb();
      })
      .catch((error) => {
        console.log("erros");
      });
  };
  return { image,setImage, handleDeleteIamge, UploadFile, progress,setImage };
}
