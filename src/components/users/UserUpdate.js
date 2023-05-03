import { async } from "@firebase/util";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../firebase/firebase-config";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import ImageUpload from "../../posts/ImageUpload";
import Button from "../button/Button";
import Radio from "../checkbox/Radio";
import Field from "../field/Field";
import FileldLayout from "../field/FileldLayout";
import Input from "../input/Input";
import Lable from "../lable/Lable";
import DashboardHeading from "../module/dashboard/DashboardHeading";
import HeaderDashboard from "../module/dashboard/HeaderDashboard";
import SideBar from "../module/dashboard/SideBar";
import { roleStatus, usserStatus } from "../untils/Constant";
import FieldCheckboxes from "../field/FieldCheckboxes";

const UserUpdate = () => {
  const [prams] = useSearchParams();
  const navigate = useNavigate();
  const {
    control,
    watch,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { isLoading, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });
  const userId = prams.get("id");
  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const { image, setImage, handleDeleteIamge, UploadFile, progress } =
    useFirebaseImage(getValues, setValue, DeleteAvatar, imageName);
  useEffect(() => {
    async function fetchDataUser() {
      const colRef = doc(db, "users", userId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
    }
    fetchDataUser();
  }, [userId, reset]);
  async function DeleteAvatar() {
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, {
      avatar: "",
    });
  }
  useEffect(() => {
    setImage(imageUrl);
  }, [setImage, imageUrl]);
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const handleUpdateUser = async (values) => {
    try {
      const colRef = doc(db, "users", userId);
      await updateDoc(colRef, {
        ...values,
        avatar: image,
      });
      toast.success("update user successfully");
      navigate("/manage/user");
    } catch (erros) {
      console.log(erros.messeage);
    }
  };
  return (
    <div>
      <HeaderDashboard></HeaderDashboard>
      <div className="flex gap-10">
        <SideBar></SideBar>
        <div className="w-full mr-10">
          <DashboardHeading
            title="Update User"
            desc="update yourself"
          ></DashboardHeading>
          <form onSubmit={handleSubmit(handleUpdateUser)}>
            <Field>
              <Lable> Avatar</Lable>
              <div className="h-[400px] w-[400px] mx-auto">
                <ImageUpload
                  handleDeleteIamge={handleDeleteIamge}
                  onChange={UploadFile}
                  className="h-full w-full !rounded-full "
                  progress={progress}
                  image={image}
                ></ImageUpload>
              </div>
            </Field>
            <FileldLayout>
              <Field>
                <Lable htmlFor="fullName">Full name</Lable>
                <Input
                  name="fullName"
                  control={control}
                  placeholder="enter yourn fullName"
                ></Input>
              </Field>
              <Field>
                <Lable htmlFor="userName">user Name</Lable>
                <Input
                  name="userName"
                  control={control}
                  placeholder="enter yourn userName"
                ></Input>
              </Field>
            </FileldLayout>
            <FileldLayout>
              <Field>
                <Lable htmlFor="email">Email Address</Lable>
                <Input
                  name="email"
                  control={control}
                  placeholder="enter yourn email"
                ></Input>
              </Field>
              <Field>
                <Lable htmlFor="password">Password</Lable>
                <Input
                  name="password"
                  control={control}
                  placeholder="enter yourn Password"
                ></Input>
              </Field>
            </FileldLayout>
            <FileldLayout>
              <Field>
                <Lable>Status</Lable>
                <div className="flex gap-x-10">
                  <FieldCheckboxes>
                    <Radio
                      name="status"
                      control={control}
                      checked={Number(watchStatus) === usserStatus.ACTIVE}
                      values={usserStatus.ACTIVE}
                    >
                      Active
                    </Radio>
                    <Radio
                      name="status"
                      control={control}
                      checked={Number(watchStatus) === usserStatus.PENDING}
                      values={usserStatus.PENDING}
                    >
                      Pending
                    </Radio>
                    <Radio
                      name="status"
                      control={control}
                      checked={Number(watchStatus) === usserStatus.BAN}
                      values={usserStatus.BAN}
                    >
                      Baned
                    </Radio>
                  </FieldCheckboxes>
                </div>
              </Field>
              <Field>
                <Lable>Role</Lable>
                <div className="flex gap-x-10">
                  <Radio
                    name="role"
                    control={control}
                    checked={Number(watchRole) === roleStatus.ADMIN}
                    values={roleStatus.ADMIN}
                  >
                    Admin
                  </Radio>
                  <Radio
                    name="role"
                    control={control}
                    checked={Number(watchRole) === roleStatus.MOD}
                    values={roleStatus.MOD}
                  >
                    Moderator
                  </Radio>
                  <Radio
                    name="role"
                    control={control}
                    checked={Number(watchRole) === roleStatus.USER}
                    values={roleStatus.USER}
                  >
                    User
                  </Radio>
                </div>
              </Field>
            </FileldLayout>
            <Button
              className="w-[200px] px-5 py-4 block mx-auto bg-primary font-semibold rounded-md mb-10"
              type="submit"
            >
              Update User{" "}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserUpdate;
