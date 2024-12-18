import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,

) {
    const body = await req.json();

    const { userId } = body;
    console.log(userId);

    if (!userId || typeof userId !== "string") {
        return new NextResponse("Unauthenticated", { status: 403 });
    }

    try {
        const store = await db.store.findFirst({
            where: {
                userId: userId,
            },
        });

        if (!store) {
            return new NextResponse("Unauthenticated", { status: 404 });
        }

        return NextResponse.json(store.id);
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 });
    }
};

