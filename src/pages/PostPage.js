import React from "react";
import ActionDelete from "../components/action/ActionDelete";
import ActionEdit from "../components/action/ActionEdit";
import ActionView from "../components/action/ActionView";
import Button from "../components/button/Button";
import HeaderDashboard from "../components/module/dashboard/HeaderDashboard";
import SideBar from "../components/module/dashboard/SideBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { collection, deleteDoc, doc, getDocs, limit, onSnapshot, query, startAfter, where } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { debounce } from "lodash";
import Swal from "sweetalert2";

const PostPage = () => {
  const [fillter, setFillter] = useState("");
  const [post, setpostList] = useState();
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
const POST_PER_PAGE = 3;

  useEffect(() => {
   async function FetchUsser() {
      const colRef = collection(db, "posts");
      const newRef = fillter
        ? query(
            colRef,
            where("title", ">=", fillter),
            where("title", "<=", fillter + "utf8")
          )
        : query(colRef, limit(POST_PER_PAGE));
        const documentSnapshots = await getDocs(newRef);
        const lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];
        onSnapshot(colRef, (snapshot) => {
          setTotal(snapshot.size);
        });
      onSnapshot(newRef, (snapshot) => {
        const result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
          setpostList(result);
        });
      setLastDoc(lastVisible);

      });
    }
    FetchUsser();
  }, [fillter]);
  const handleInputFilter = debounce((e) => {
    setFillter(e.target.value);
  }, 500);
  function handleDeletePost(docId) {
    const colRef = doc(db, "posts", docId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }
  const handleLoadMorePost = async () => {
    const nextRef = query(
      collection(db, "posts"),
      startAfter(lastDoc || 0),
      limit(POST_PER_PAGE)
    );

    onSnapshot(nextRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setpostList([...post, ...results]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  return (
    <div>
      <HeaderDashboard></HeaderDashboard>
      <div className="flex gap-20">
        <SideBar></SideBar>
        <div className="w-full">
          <h2 className="text-4xl font-bold mt-10 text-primary">Manage Post</h2>
          <input
            type="text"
            placeholder="Search Post"
            className="inline-block outline-none px-10 py-3 border border-gray-300 float-right mr-20 rounded-lg mt-7"
            onChange={handleInputFilter}
          />
          <table className="mt-40 w-full ">
            <thead className="bg-[#f7f7f8] rounded-lg">
              <tr>
                <th className="px-6 py-5">ID</th>
                <th className="px-6 py-5 text-left pl-10">Post</th>
                <th className="px-6 py-5 ">category</th>
                <th className="px-6 py-5 ">Author</th>
                <th className="px-6 py-5 ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {post?.length > 0 &&
                post.map((post) => {
                  const date = post?.createdAt?.seconds
                    ? new Date(post?.createdAt?.seconds * 1000)
                    : new Date();
                  const formatDate = new Date(date).toLocaleDateString("vi-VI");
                  return (
                    <tr key={post.id} className="mb-20" >
                      <td className="text-center pt-5" title={post.id}>
                        {post.id.slice(0, 3) + "...."}
                      </td>
                      <td className="text-center pt-5 pl-10">
                        <div className="flex items-center gap-2 mt-3">
                          <div className="w-[50px] h-[50px]">
                            <img
                              src={post?.image}
                              alt=""
                              className="w-full h-full object-cover rounded-lg "
                            />
                          </div>
                          <div className="flex flex-col j">
                            <h3 className="font-semibold text-xl max-w-[300px] ">{post.title}</h3>
                            <span className="text-base font-normal text-gray-400">Date: {formatDate}</span>
                          </div>
                        </div>
                      </td>
                      <td className="text-center pt-5 text-primary ">
                        {post?.category?.name}
                      </td>
                      <td className="text-center pt-5 ">
                        {post?.user?.fullName}
                      </td>
                      <td className="text-center pt-5 float-right pr-16">
                        <div className="flex items-center gap-x-3 rounded-md mt-5">
                          <ActionView onClick={()=> navigate(`${post.slug}`)}></ActionView>
                          <ActionEdit onClick={()=>navigate(`/manage/update-post?id=${post.id}`)}></ActionEdit>
                          <ActionDelete  onClick={() => handleDeletePost(post.id)}></ActionDelete>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {total > post?.length && (
        <div className="mt-10 text-center">
          <Button className="mx-auto w-[200px] px-7 py-3 bg-primary rounded-lg" onClick={handleLoadMorePost}>
            Load more
          </Button>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
