"use server";

import { NextResponse } from "next/server";
import { serverClient } from "@/services/server";
import { ImachineRoutes } from "@/constants/enum/configImachineRoutes";
import { CommonServerResponse } from "@/types/common.type";

export async function POST(req: Request) {
    const payload = await req.json();

    try {
        const jsonResponse = await serverClient.post<CommonServerResponse>(ImachineRoutes.GET_MENU_GROUP_PROD_LIST, payload);
        return NextResponse.json(jsonResponse.body);
    } catch (error: any) {
        // serverClient에서 statusCode를 담아서 throw 했다면 그대로 사용
        return NextResponse.json(
            {
                msg: error.message || "요청 실패",
                data: error.data || null,
            },
            { status: error.statusCode || 500 }
        );
    }
}