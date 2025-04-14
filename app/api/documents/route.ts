// app/api/docs/route.js
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const searchResult = await cloudinary.search
      .expression("resource_type:image OR resource_type:raw OR resource_type:video")
      .with_field("context")
      .sort_by("created_at","desc")
      .max_results(50)
      .execute();

    const formatted = searchResult.resources.map(r => {
      // Extract title from context if available
      let title;
      if (r.context && r.context.custom && r.context.custom.title) {
        title = r.context.custom.title;
      } else {
        title = r.public_id.split('_').pop();
      }
        
      return {
        public_id: r.public_id,
        filename: r.public_id.split('_').pop(),
        title: title,
        created_at: r.created_at,
        secure_url: r.secure_url,
      };
    });

    return NextResponse.json(formatted);
  } catch (err) {
    console.error('Cloudinary search error:', err);
    return NextResponse.json([], { status: 200 });
  }
}