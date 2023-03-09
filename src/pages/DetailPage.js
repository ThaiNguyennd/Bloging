import React from "react";
import Header from "../components/layout/Header";
import PostCategory from "../posts/PostCategory";
import PostHeading from "../posts/PostHeading";
import PostImage from "../posts/PostImage";
import PostItem from "../posts/PostItem";
import PostMeta from "../posts/PostMeta";
import PostTitle from "../posts/PostTitle";

const DetailPage = () => {
  return (
    <div className="max-w-[1240px] mx-auto">
      <Header></Header>
      <div className="flex items-center gap-7">
        <div className="w-full max-w-[650px] h-[500px] mt-10 mx-7">
          <PostImage url="https://images.unsplash.com/photo-1626968361222-291e74711449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"></PostImage>
        </div>
        <div className="flex flex-col gap-4">
          <PostCategory>Kiến thức</PostCategory>
          <PostTitle className="text-primary text-4xl mt-3">
            Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
          </PostTitle>
          <PostMeta></PostMeta>
        </div>
      </div>
      <div>
        <span className="font-semibold text-3xl ">Chương 1</span>
        <p className=" mx-10 mt-8 font-medium leading-8">
          Gastronomy atmosphere set aside. Slice butternut cooking home.
          Delicious romantic undisturbed raw platter will meld. Thick Skewers
          skillet natural, smoker soy sauce wait roux. slices rosette bone-in
          simmer precision alongside baby leeks. Crafting renders aromatic
          enjoyment, then slices taco. Minutes undisturbed cuisine lunch
          magnificent mustard curry. Juicy share baking sheet pork. Meals ramen
          rarities selection, raw pastries richness magnificent atmosphere.
          Sweet soften dinners, cover mustard infused skillet, Skewers on
          culinary experience. Juicy meatballs brisket slammin' baked shoulder.
          Juicy smoker soy sauce burgers brisket. polenta mustard hunk greens.
          Wine technique snack skewers chuck excess. Oil heat slowly. slices
          natural delicious, set aside magic tbsp skillet, bay leaves brown
          centerpiece. fruit soften edges frond slices onion snack pork steem on
          wines excess technique cup; Cover smoker soy sauce fruit snack. Sweet
          one-dozen scrape delicious, non sheet raw crunch mustard. Minutes
          clever slotted tongs scrape, brown steem undisturbed rice. Food
          qualities braise chicken cuts bowl through slices butternut snack.
          Tender meat juicy dinners. One-pot low heat plenty of time adobo fat
          raw soften fruit. sweet renders bone-in marrow richness kitchen,
          fricassee basted pork shoulder. Delicious butternut squash hunk.
          Flavor centerpiece plate, delicious ribs bone-in meat, excess chef
          end. sweet effortlessly pork, low heat smoker soy sauce flavor meat,
          rice fruit fruit. Romantic fall-off-the-bone butternut chuck rice
          burgers.
        </p>
        <div className="mx-auto w-full max-w-[820px] h-[500px] my-4">
          <img
            className="w-full h-full object-cover rounded-xl"
            src="https://images.unsplash.com/photo-1626968361222-291e74711449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
          <p className="font-normal text-[#6b6b6b] mx-ato my-3 text-base ">
            Gastronomy atmosphere set aside. Slice butternut cooking home.
          </p>
        </div>
        <span className="font-semibold text-3xl ">Chương 2</span>
        <p className=" mx-10 mt-8 font-medium leading-8 mb-10">
          Gastronomy atmosphere set aside. Slice butternut cooking home.
          Delicious romantic undisturbed raw platter will meld. Thick Skewers
          skillet natural, smoker soy sauce wait roux. slices rosette bone-in
          simmer precision alongside baby leeks. Crafting renders aromatic
          enjoyment, then slices taco. Minutes undisturbed cuisine lunch
          magnificent mustard curry. Juicy share baking sheet pork. Meals ramen
          rarities selection, raw pastries richness magnificent atmosphere.
          Sweet soften dinners, cover mustard infused skillet, Skewers on
          culinary experience.
        </p>
      </div>
      <PostHeading>Similar</PostHeading>
      <div className="grid grid-cols-4">
        <PostItem></PostItem>
      </div>
    </div>
  );
};

export default DetailPage;
