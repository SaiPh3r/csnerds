import { NextResponse } from 'next/server';
import cloudinary from '@/claudinary.js';
import { Readable } from 'stream';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: '403notes', // custom folder for CS403 uploads
          allowed_formats: ['jpg', 'png', 'pdf'],
          resource_type: 'auto', // handles both images and documents
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      Readable.from(buffer).pipe(uploadStream);
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      type: result.format === 'pdf' ? 'pdf' : 'image', // to help when rendering on feed
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}