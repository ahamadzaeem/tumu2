import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const seoFilePath = path.join(process.cwd(), "src/data/seoContent.json");
const contentFilePath = path.join(process.cwd(), "src/data/siteContent.json");

export async function GET() {
  try {
    let seoData = { pages: [] };
    let contentData = {};

    if (fs.existsSync(seoFilePath)) {
      const seoRaw = fs.readFileSync(seoFilePath, "utf-8");
      seoData = JSON.parse(seoRaw);
    }

    if (fs.existsSync(contentFilePath)) {
      const contentRaw = fs.readFileSync(contentFilePath, "utf-8");
      contentData = JSON.parse(contentRaw);
    }

    return NextResponse.json({
      success: true,
      seo: seoData,
      content: contentData,
    });
  } catch (error: any) {
    console.error("Error reading CMS data:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to load CMS data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { seo, content } = body;

    if (seo) {
      fs.writeFileSync(seoFilePath, JSON.stringify(seo, null, 2), "utf-8");
    }

    if (content) {
      fs.writeFileSync(contentFilePath, JSON.stringify(content, null, 2), "utf-8");
    }

    return NextResponse.json({
      success: true,
      message: "CMS content and SEO updated successfully!",
    });
  } catch (error: any) {
    console.error("Error saving CMS data:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to save CMS data" },
      { status: 500 }
    );
  }
}

