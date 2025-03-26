"use client";
import Link from "next/link";
import { getAuthor } from "../lib/authors/read_server";
import { getCategory } from "../lib/category/read_server";
import { getAllPosts } from "../lib/posts/read_server";
export default async function PostListView() {
  const posts = await getAllPosts();
  if (!posts) {
    return (
      <div>
        <h3>Post not found</h3>
      </div>
    );
  } else
    return (
      <section className="p-10">
        <div className="grid grid-cols-3 w-full">
          {posts?.map((post, index) => {
            return (
              <div key={index} className="hover:bg-slate-100 rounded-xl">
                <PostCard post={post} key={index} />
              </div>
            );
          })}
        </div>
      </section>
    );
}
export function PostCard({ post }) {
  return (
    <Link href={`/posts/${post?.id}`}>
      {" "}
      <div className="p-5 rounded-xl bg-blue-50 m-5 ">
        <div className="relative">
          <div className="flex w-full absolute font-bold  justify-end">
            <CategoryCard categoryId={post?.categoryId} />
          </div>
          <img
            className="h-[200px] w-full object-fill"
            src={post?.imageURL}
            alt={post?.imageURL}
          />
        </div>
        <h1 className="font-bold text-center">{post?.title}</h1>
        <div className="flex justify-between flex-wrap">
          <AuthorCard authorId={post?.authorId} />
          <h5>
            เมื่อ{" "}
            {post?.timestamp
              ? post.timestamp.toDate().toLocaleDateString()
              : "ไม่ทราบวันที่"}
          </h5>
        </div>
      </div>
    </Link>
  );
}
async function AuthorCard({ authorId }) {
  const author = await getAuthor(authorId);
  return (
    <div className="flex gap-2 items-center">
      <img
        className="h-6 w-6 rounded-full object-cover"
        src={author?.photoAuthorURL}
        alt={author?.name}
      />
      <h4 className="text-sm text-gray-400">{author?.name}</h4>
    </div>
  );
}
async function CategoryCard({ categoryId }) {
  const category = await getCategory(categoryId);
  return (
    <div className="flex gap-2 items-center p-1 m-2 bg-yellow-50 rounded-xl">
      <img
        className="h-6 w-6 rounded-full object-cover"
        src={category?.iconURL}
        alt={category?.name}
      />
      <h4 className="text-sm text-gray-400">{category?.name}</h4>
    </div>
  );
}
