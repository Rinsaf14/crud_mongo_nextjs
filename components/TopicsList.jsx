"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  try {
    const res = await fetch("/api/topics", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default function TopicsList() {
  const [topics, setTopics] = useState([]);

  // Mengambil data topik setelah komponen di-render
  useEffect(() => {
    const fetchTopics = async () => {
      const data = await getTopics();
      if (data) {
        setTopics(data.topics);
      }
    };

    fetchTopics();
  }, []); // Hanya menjalankan sekali saat komponen pertama kali di-render

  return (
    <>
      {topics.length === 0 ? (
        <div>No topics found.</div>
      ) : (
        topics.map((t) => (
          <div
            key={t._id}
            className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
          >
            <div>
              <h2 className="font-bold text-2xl">{t.title}</h2>
              <div>{t.description}</div>
            </div>

            <div className="flex gap-2">
              <RemoveBtn id={t._id} />
              <Link href={`/editTopic/${t._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        ))
      )}
    </>
  );
}
