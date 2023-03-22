import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import Button from "../components/button/Button";
import Radio from "../components/checkbox/Radio";
import Field from "../components/field/Field";
import FieldCheckboxes from "../components/field/FieldCheckboxes";
import Input from "../components/input/Input";
import HeaderDashboard from "../components/module/dashboard/HeaderDashboard";
import SideBar from "../components/module/dashboard/SideBar";
import { postStatus } from "../components/untils/Constant";
import ImageUpload from "./ImageUpload";
import useFirebaseImage from "../hooks/useFirebaseImage";
import Toggle from "../components/toggle/Toggle";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { Dropdown } from "../components/dropdown";
import { useAuth } from "../contexts/Auth-context";
import { toast } from "react-toastify";

const AddPost = () => {
  const { userInfo } = useAuth();
  const { control, watch, handleSubmit, setValue, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      hot: false,
      image: "",
      categoryId: "",
      user: {},
    },
  });
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const addPosthandler = async (values) => {
    console.log(values);
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.title, "_");
    cloneValues.status = Number(values.status);
    console.log(cloneValues);
    const colRef = collection(db, "posts");
    await addDoc(colRef, {
      ...cloneValues,
      image,
      userId: userInfo.uid,
      createdAt: serverTimestamp(),
    });
    toast.success("create new post successfully");
    reset({
      title: "",
      slug: "",
      status: 2,
      hot: false,
      image: "",
      categoryId: {},
      user: {},
    });
    setImage("");
  };
  useEffect(() => {
    document.title = "chicken blogging-add new post";
  });
  const { image, setImage, handleDeleteIamge, UploadFile, progress } =
    useFirebaseImage(getValues, setValue);
  const [categories, setCategories] = useState();
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const results = [];
        results.push({
          id: doc.id,
          ...doc.data(),
        });
        setCategories(results);
      });
    }
    getData();
  }, []);
  return (
    <div>
      <HeaderDashboard></HeaderDashboard>
      <div className="flex gap-x-20">
        <SideBar></SideBar>
        <div className="mt-10 mr-10">
          <h2 className="text-4xl text-primary font-bold "> Add New Post</h2>
          <form onSubmit={handleSubmit(addPosthandler)}>
            <div className="grid grid-cols-2 gap-x-10 mt-5">
              <Field>
                <label className="text-2xl font-medium">Title</label>
                <Input
                  type="text"
                  placeholder="Enter your title"
                  control={control}
                  name="title"
                  className="w-full px-3 rounded-lg outline-none py-3 bg-slate-300"
                />
              </Field>
              <Field>
                <label className="text-2xl font-medium">Slug</label>
                <Input
                  type="text"
                  placeholder="Enter your slug"
                  control={control}
                  name="slug"
                  className="w-full px-3 rounded-lg outline-none py-3 bg-slate-300"
                />
              </Field>
              <div className="form-layout grid grid-cols-2">
                <div className="mr-5">
                  <Field>
                    <label className="text-2xl font-medium">Status</label>
                    <FieldCheckboxes>
                      <Radio
                        name="status"
                        control={control}
                        checked={Number(watchStatus) === postStatus.APPROVED}
                        value={postStatus.APPROVED}
                      >
                        Approved
                      </Radio>
                      <Radio
                        name="status"
                        control={control}
                        checked={Number(watchStatus) === postStatus.PENDING}
                        value={postStatus.PENDING}
                      >
                        Pending
                      </Radio>
                      <Radio
                        name="status"
                        control={control}
                        checked={Number(watchStatus) === postStatus.REJECTED}
                        value={postStatus.REJECTED}
                      >
                        Reject
                      </Radio>
                    </FieldCheckboxes>
                  </Field>
                </div>
                <div className="ml-28">
                  <Field>
                    <label htmlFor="" className="text-2xl font-medium">
                      Feature
                    </label>
                    <Toggle
                      on={watchHot === true}
                      onClick={() => {
                        setValue("hot", !watchHot);
                      }}
                    ></Toggle>
                  </Field>
                </div>
              </div>
              <Field>
                <label className="text-2xl font-medium">Author</label>
                <Input
                  type="text"
                  placeholder="Enter your Author"
                  control={control}
                  name="author"
                  className="w-full px-3 rounded-lg outline-none py-3 bg-slate-300"
                />
              </Field>
              <Field>
                <label htmlFor="" className="text-2xl font-medium">
                  Image
                </label>
                <ImageUpload
                  handleDeleteIamge={handleDeleteIamge}
                  onChange={UploadFile}
                  className="h-[400px]"
                  progress={progress}
                  image={image}
                ></ImageUpload>
              </Field>
              <Field>
                <label htmlFor="" className="text-2xl font-medium">
                  Category
                </label>
                <Dropdown>
                  <Dropdown.Select placeholder="Select the category"></Dropdown.Select>
                  <Dropdown.List>
                    {categories?.length > 0 &&
                      categories.map((item) => (
                        <Dropdown.Option
                          key={item.id}
                          onClick={() => setValue("categoryId", item.id)}
                        >
                          {item.name}
                        </Dropdown.Option>
                      ))}
                  </Dropdown.List>
                </Dropdown>
              </Field>
            </div>
            <Button
              type="submit"
              className="mx-auto block rounded-lg mt-10 bg-primary px-8 py-3 mb-10"
            >
              Add new post
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddPost;
