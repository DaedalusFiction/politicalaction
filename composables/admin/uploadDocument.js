import { db, storage } from "~/firebase.config";
import useSnackbar from "../showSnackbar";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { ref as firebaseRef } from "firebase/storage";

export default async function useUploadDocument(
  collectionName,
  formData,
  documentFile
) {
  const uploadDoc = async () => {
    if (documentFile) {
      const documentFileRef = firebaseRef(
        storage,
        `${collectionName}/${Date.now() + documentFile.name}`
      );
      const uploadImageTask = uploadBytesResumable(
        documentFileRef,
        documentFile
      );
      //TODO: Fix this so that it awaits the image upload before uploading md file
      uploadImageTask.on(
        "state_changed",
        () => {},
        () => {},
        async () => {
          await getDownloadURL(uploadImageTask.snapshot.ref).then(
            async (imageDownloadURL) => {
              try {
                await addDoc(collection(db, collectionName), {
                  ...formData,
                  image: { src: imageDownloadURL, alt: "" },
                  dateUploaded: Date.now(),
                });
                useSnackbar("Article created");
              } catch (error) {
                console.log(error.message);
                useSnackbar("Error creating article");
              }
            }
          );
        }
      );
    } else {
      try {
        await addDoc(collection(db, collectionName), {
          ...formData,
          dateUploaded: Date.now(),
        });
        useSnackbar("Article created!!!");
      } catch (error) {
        console.log(error.message);
        useSnackbar("Error creating article!");
      }
    }
  };
  await uploadDoc();
}
