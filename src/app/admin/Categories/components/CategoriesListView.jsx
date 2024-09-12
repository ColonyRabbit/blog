"use client";
import React from "react";
import Link from "next/link";
import useCategories from "@/app/lib/category/read";
const CategoriesListView = () => {
  const { data, error, isLoading } = useCategories();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  if (!data) {
    return <h1>Data not found</h1>;
  } else
    return (
      <section className="text-xl">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-200">
              <th className="border px-4 py-2">Sr.</th>
              <th className="border px-4 py-2">icon</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">slug</th>
              <th className="border px-4 py-2">option</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((item, key) => {
              return (
                <tr key={key} className="text-center font-bold">
                  <td className="border px-4 py-2 bg-blue-100">{key + 1}</td>
                  <td className="border px-4 py-2 bg-blue-100">
                    <img
                      className="h-20"
                      src={item?.iconURL}
                      alt={item?.naame}
                    />
                  </td>
                  <td className="border px-4 py-2 bg-blue-100">{item?.name}</td>
                  <td className="border px-4 py-2 bg-blue-100">{item?.slug}</td>
                  <td className="border px-4 py-2 bg-blue-100">
                    <Link href={`/admin/categories/form?id=${item?.id}`}>
                      <button className="text-white w-full bg-blue-800 font-bold p-2 rounded-full">
                        Action
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    );
};

export default CategoriesListView;
