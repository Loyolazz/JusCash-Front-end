"use client";

import { useEffect, useRef, useState } from "react";
import LeadModal from "./LeadModal";
import Api from "@/services/api";
import { Status } from "@/utils/statusEnum";

interface IDraggable {
    index: number;
    id: number;
    name: string;
    data: any;
}

export default function DraggableRow({ index, id, name, data }: IDraggable) {
    const api = new Api();

    const [modalOpen, setModalOpen] = useState(false);
    const [cardPosition, setCardPosition] = useState(Status.indexOf(data.status));
    const [previewCardPosition, setPreviewCardPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [firstColumnEnd, setFirstColumnEnd] = useState(-1);
    const [secondColumnEnd, setSecondColumnEnd] = useState(-1);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const box: any = gridRef.current?.getBoundingClientRect();
        setFirstColumnEnd(box.x + box.width / 3);
        setSecondColumnEnd(box.x + (box.width / 3) * 2);
    }, [gridRef]);

    const onDragStart = () => {
        setPreviewCardPosition(cardPosition);
        setIsDragging(true);
    };

    const onDragOver = (event: any) => {
        if (cardPosition === 0) {
            if (event.clientX < firstColumnEnd) setPreviewCardPosition(0);
            if (event.clientX > firstColumnEnd * 0.9) setPreviewCardPosition(1);
        } else {
            if (event.clientX < secondColumnEnd) setPreviewCardPosition(1);
            if (event.clientX > secondColumnEnd * 0.9) setPreviewCardPosition(2);
        }
    };

    const onDragEnd = (event: any) => {
        if (cardPosition === 0) {
            if (event.clientX > firstColumnEnd * 0.9) {
                setCardPosition(1);
                updateLead(1);
            }
        } else {
            if (event.clientX > secondColumnEnd * 0.9) {
                setCardPosition(2);
                updateLead(2);
            }
        }

        setIsDragging(false);
    };

    const updateLead = async (status: number) => {
        await api.updateLead({ id: data.id, status: Status[status] });
    };

    return (
        <div ref={gridRef} className={`${index % 2 == 0 ? "bg-gray-200" : "bg-white"} grid grid-cols-3 w-full`}>
            <div
                draggable
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
                className={`flex flex-col py-4 text-center text-sm cursor-move items-center justify-center`}
                style={{
                    gridColumn: isDragging ? previewCardPosition + 1 : cardPosition + 1,
                }}
            >
                <p onClick={() => setModalOpen(true)} className="cursor-pointer">
                    {name}
                </p>
            </div>

            <LeadModal mode="show" modalOpen={modalOpen} setModalOpen={setModalOpen} initiaData={data} />
        </div>
    );
}
