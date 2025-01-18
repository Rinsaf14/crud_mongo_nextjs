"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }) {
  const router = useRouter();

  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      try {
        const res = await fetch(`/api/topics?id=${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          // Refresh halaman setelah berhasil menghapus
          router.refresh();
        } else {
          // Tampilkan pesan kesalahan jika penghapusan gagal
          alert("Failed to delete topic");
        }
      } catch (error) {
        console.log("Error deleting topic:", error);
        alert("An error occurred while deleting the topic");
      }
    }
  };

  return (
    <button onClick={removeTopic} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
}
