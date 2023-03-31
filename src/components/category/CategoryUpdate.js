import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { collapseToast, toast } from "react-toastify";
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

const CategoryUpdate = () => {
  const { control, watch, reset,handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {},
  });
    const navigate =useNavigate()
  const watchStatus = watch("status");
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  useEffect(
    () => {
      async function fetchData() {
        const colRef = doc(db, "categories", categoryId);
          const singDoc = await getDoc(colRef);
          reset(singDoc.data())
          }
          fetchData()
    },
    [categoryId,reset]
    );
    const handleUpdatecategory = async(values) => {
        const colRef = doc(db, "categories",categoryId);
        await updateDoc(colRef, {
            name: values.name,
            slug: slugify(values.slug || values.name, { lower: true, }),
            status : Number(values.status)
        })
        toast.success("update categories successfully");
        navigate('/manage/category')
    }
  if (!categoryId) return null;
  return (
    <div>
      <HeaderDashboard></HeaderDashboard>
      <div className=" flex gap-10 ">
        <SideBar></SideBar>
        <div className="w-full mr-10">
          <DashboardHeading
            title="Update Categories"
            desc={`Update your category id : ${categoryId}`}
          ></DashboardHeading>
          <form onSubmit={handleSubmit(handleUpdatecategory)}> 
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
              className="px-5 py-3 bg-primary font-semibold rounded-lg mx-auto block"
              type="submit"
            >
              Update category
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
