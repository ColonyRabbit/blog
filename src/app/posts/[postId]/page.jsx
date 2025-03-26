import { getAuthor } from "@/app/lib/authors/read_server";
import { getCategory } from "@/app/lib/category/read_server";
import { getPost } from "@/app/lib/posts/read_server";
export default async function post({ params }) {
  const postId = decodeURIComponent(params.postId);
  const post = await getPost(postId);
  if (!post?.content) {
    return <p>หน้านี้ไม่ได้มีการใส่ content</p>; // ตรวจสอบว่ามีค่า content หรือไม่
  }
  return (
    <main className="flex justify-center p-2">
      <section className="flex flex-col gap-5 px-16 p6-10 max-w-[800px]">
        <CategoryCard categoryId={post?.categoryId} />
        <h1 className="font-bold text-5xl text-yellow-300">{post?.title}</h1>
        <h5>
          เมื่อ{" "}
          {post?.timestamp
            ? post.timestamp.toDate().toLocaleDateString()
            : "ไม่ทราบวันที่"}
        </h5>
        <img src={post?.imageURL} alt={post?.title} />
        <AuthorCard authorId={post?.authorId} />
        <div dangerouslySetInnerHTML={{ __html: post?.content }}></div>
      </section>
    </main>
  );
}
async function AuthorCard({ authorId }) {
  const author = await getAuthor(authorId);
  return (
    <div className="flex gap-2 items-center mt-3">
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
    <div className="flex">
      <img
        className="h-7 w-7 rounded-full object-cover"
        src={category?.iconURL}
        alt={category?.name}
      />
      <h4 className="ml-2 text-sm text-gray-400 font-bold text-xl">
        {category?.name}
      </h4>
    </div>
  );
}
export async function generateMetadata({ params }) {
  // read route params
  const postId = decodeURIComponent(params.postId); //กรณีที่ params มีการเว้นวรรค จะทำการลบ %20
  const post = await getPost(postId);
  return {
    title: post?.title,
    openGraph: {
      images: [post?.imageURL],
    },
  };
}
