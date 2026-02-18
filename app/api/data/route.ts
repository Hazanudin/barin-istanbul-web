import { put, list, del } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

const DATA_FILENAME = "admin-data.json";

// GET: Fetch admin data from Vercel Blob
export async function GET() {
    try {
        // List blobs to find our data file
        const { blobs } = await list({ prefix: DATA_FILENAME });

        if (blobs.length === 0) {
            // No data yet, return null so the frontend uses defaults
            return NextResponse.json({ data: null });
        }

        // Fetch the latest blob
        const latestBlob = blobs[blobs.length - 1];
        const response = await fetch(latestBlob.url);
        const data = await response.json();

        return NextResponse.json({ data });
    } catch (error) {
        console.error("Error fetching admin data:", error);
        return NextResponse.json({ data: null }, { status: 500 });
    }
}

// POST: Save admin data to Vercel Blob
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Delete old data blobs first
        const { blobs } = await list({ prefix: DATA_FILENAME });
        for (const blob of blobs) {
            await del(blob.url);
        }

        // Save new data
        const blob = await put(DATA_FILENAME, JSON.stringify(body), {
            access: "public",
            contentType: "application/json",
            addRandomSuffix: false,
        });

        return NextResponse.json({ success: true, url: blob.url });
    } catch (error) {
        console.error("Error saving admin data:", error);
        return NextResponse.json(
            { success: false, error: "Failed to save data" },
            { status: 500 }
        );
    }
}
