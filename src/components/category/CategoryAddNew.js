import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { db } from "../../firebase/firebase-config";
import Button from "../button/Button";
import Radio from "../checkbox/Radio";
import Field from "../field/Field";
import Input from "../input/Input";
import Lable from "../lable/Lable";
import DashboardHeading from "../module/dashboard/DashboardHeading";
import HeaderDashboard from "../module/dashboard/HeaderDashboard";
import SideBar from "../module/dashboard/SideBar";
import { categorystatus } from "../untils/Constant";

const CategoryAddNew = () => {
  const {
    control,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      creatAt: new Date(),
    },
  });
  const handleAddNew = async (values) => {
    const newValues = { ...values };
    newValues.slug = slugify(newValues.name || newValues.slug, { lower: true });
    newValues.status = Number(newValues.status);
    const colRef = collection(db, "categories");
    try {
      await addDoc(colRef, {
        ...newValues,
        creatAt: serverTimestamp(),
      });
      toast.success("create new category susscessfully");
    } catch (errors) {
      console.log(errors.message);
    } finally {
      reset({
        name: "",
        slug: "",
        status: 1,
        creatAt: new Date(),
      });
    }
  };
  const watchStatus = watch("status");
  return (
    <div>
      <HeaderDashboard></HeaderDashboard>
      <div className="flex gap-20">
        <SideBar></SideBar>
        <div className=" w-full mr-10">
          <DashboardHeading
            title="New category"
            desc="Add new category"
          ></DashboardHeading>
          <form onSubmit={handleSubmit(handleAddNew)}>
            <div className="form-layout">
              <Field>
                <Lable htmlFor="name">Name</Lable>
                <Input
                  control={control}
                  name="name"
                  placeholder="Enter your category name"
                ></Input>
              </Field>
              <Field>
                <Lable htmlFor="slug">Slug</Lable>
                <Input
                  control={control}
                  name="slug"
                  placeholder="Enter your slug"
                ></Input>
              </Field>
            </div>
            <div className="form-layout">
              <Field>
                <Lable>Status</Lable>
                <div className="flex flex-wrap gap-x-5">
                  <Radio
                    name="status"
                    control={control}
                    checked={Number(watchStatus) === categorystatus.APPROVED}
                    values={categorystatus.APPROVED}
                  >
                    Approved
                  </Radio>

                  <Radio
                    name="status"
                    control={control}
                    checked={Number(watchStatus) === categorystatus.UNAPPROVED}
                    values={categorystatus.UNAPPROVED}
                  >
                    Unapproved
                  </Radio>
                </div>
              </Field>
            </div>
            <Button
              className="px-5 py-3 bg-primary rounded-lg mx-auto block"
              type="submit"
            >
              Add new category
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryAddNew;
