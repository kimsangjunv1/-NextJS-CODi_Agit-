"use client";

import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { useToastStore } from "@/stores/useToastStore";
import { Fragment, useCallback, useEffect } from "react";

import ui from "@/scss/components/_ui.module.scss"
import IconComponent from "@/components/common/IconComponent";

type DropZoneComponentProps = {
    id?: string;
    className?: string;
    value: File[];
    maxCount?: number;
    limitSize?: number; // MB
    onChange: (files: File[]) => void;
    onDelete: (files: File[]) => void;
};

const DropZoneComponent = ({
    id = "",
    className = "",
    value=[],
    maxCount = 2,
    limitSize = 2,
    onChange,
    onDelete,
}: DropZoneComponentProps) => {
    const { setToast } = useToastStore();

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const total = value.length + acceptedFiles.length;

            if (total > maxCount) {
                setToast({
                    msg: `최대 ${maxCount}개까지 업로드 가능해요`,
                    icon: "warning",
                    time: 2,
                });
                return;
            }

            onChange([...value, ...acceptedFiles]);
        },
        [value, maxCount, onChange]
    );

    const handleDelete = (index: number) => {
        const nextFiles = value.filter((_, i) => i !== index);
        console.log("nextFiles", nextFiles)
        onDelete(nextFiles);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: true,
        maxSize: limitSize * 1024 * 1024,
        maxFiles: maxCount,
        disabled: value.length >= maxCount,
        onDropRejected: () => {
            setToast({
                msg: `최대 ${maxCount}개까지 업로드 가능해요`,
                icon: "warning",
                time: 2,
            });
        },
    });

    return (
        <section className={ ui.drop_zone }>
            {/* <section {...getRootProps()} className={ ui.target }>
                <input id={id} className={className} {...getInputProps()} />
                {isDragActive ? (
                    <p>놓아주세요</p>
                ) : (
                    <p>이미지를 드래그하거나 클릭하여 추가</p>
                )}
            </section> */}

            {/* 미리보기 + 삭제 */}
            <section {...getRootProps()} className={`${ ui.file_preview } ${ isDragActive ? ui.active : "" }`}>
                { value.length ? (
                    <Fragment>
                        <input id={id} className={className} {...getInputProps()} />
                        { value?.map(( file, idx ) => {
                            const previewUrl = file instanceof File ? URL.createObjectURL(file) : file;
                            
                            return (
                                <div
                                    key={ idx }
                                    className={ ui.item }
                                    style={{
                                        // "--x": `${Math.random() * 40 - 20}%`,
                                        // "--y": `${Math.random() * 40 - 20}%`,
                                        // "--r": `${Math.random() * 60 - 30}deg`,
                                    } as React.CSSProperties}
                                >
                                    <img
                                        src={previewUrl}
                                        alt={file.name}
                                        className="w-full h-auto rounded shadow"
                                        // style={{ width: "120px" }}
                                    />
                                    <p>image</p>
                                    
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            handleDelete(idx)
                                            e.stopPropagation();
                                        }}
                                        className="absolute top-1 right-1 bg-black bg-opacity-60 text-white px-2 py-1 text-xs rounded hidden group-hover:block"
                                    >
                                        <IconComponent type="outlined-minus" alt="삭제" />
                                    </button>
                                </div>
                            );
                        })}

                        {/* { Array( maxCount - value.length).fill(0).map((e, i) =>
                            <div key={i} className={ ui.empty }>
                                +
                            </div>
                        )} */}
                    </Fragment>
                ): (
                    <Fragment>
                        { Array( maxCount - value.length).fill(0).map((e, i) =>
                            <div key={i} className={ ui.empty }>
                                +
                            </div>
                        )}
                    </Fragment>
                )}
            </section>
        </section>
    );
};

export default DropZoneComponent;