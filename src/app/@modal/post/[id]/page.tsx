"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { Modal } from "./modal";

export default function Page() {
	const { id } = useParams();
	const router = useRouter();

	return (
		<motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0 }}
            onClick={() => router.back()}
        >
            <motion.div
                className="w-full max-w-lg p-6 bg-white rounded-lg"
                onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 방지
                layoutId={`card-image-${id}`} // 이 부분 중요!
            >
                <motion.img
                    src={`/images/picture/img-dummy-thumbnail-0${id}.png`}
                    alt={`modal-card-${id}`}
                    className="object-cover w-full h-auto rounded-lg"
                    layoutId={`card-image-${id}`}
                />
                <p className="mt-4 text-gray-800">
                    모달 내용 {id}
                </p>
            </motion.div>
        </motion.div>
	);
}