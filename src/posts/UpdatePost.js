import React, { useState } from "react";
import HeaderDashboard from "../components/module/dashboard/HeaderDashboard";
import SideBar from "../components/module/dashboard/SideBar";
import { useForm } from "react-hook-form";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import FieldCheckboxes from "../components/field/FieldCheckboxes";
import Radio from "../components/checkbox/Radio";
import { postStatus } from "../components/untils/Constant";
import Toggle from "../components/toggle/Toggle";
import { Dropdown } from "../components/dropdown";
import ImageUpload from "./ImageUpload";
import Button from "../components/button/Button";
import useFirebaseImage from "../hooks/useFirebaseImage";
import { useSearchParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const UpdatePost = () => {
  const { control, setValue, getValues, handleSubmit, watch } = useForm({
    mode: "onChange",
  });
  const [params] = useSearchParams();
  const postId = params.get("id");
  const [content, setContent] = useState("");
  const imageUrl = getValues("image");
  const imageName = getValues("image_name");
  const { image, setImage, progress, UploadFile, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName, deletePostImage);
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const [categories, setCategories] = useState();
  const [SelectCategory, setSelectCategory] = useState();
  async function addPosthandler() { }
 async function deletePostImage() {
  const colRef = doc(db, "users", postId);
  await updateDoc(colRef, {
    avatar: "",
  });
  }
  const handleClickOption = async (item) => {
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(item);
  };
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
                          onClick={() => handleClickOption(item)}
                        >
                          {item.name}
                        </Dropdown.Option>
                      ))}
                  </Dropdown.List>
                  {SelectCategory?.name && (
                    <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50 mt-3">
                      {SelectCategory?.name}
                    </span>
                  )}
                </Dropdown>
              </Field>
              <Field>
                <label htmlFor="" className="text-2xl font-medium">
                  Image
                </label>
                <ImageUpload
                  handleDeleteIamge={handleDeleteImage}
                  onChange={UploadFile}
                  className="h-[400px]"
                  progress={progress}
                  image={image}
                ></ImageUpload>
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

export default UpdatePost;
