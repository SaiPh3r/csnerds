// app/api/upload/route.js
import { NextResponse } from 'next/server';
import cloudinary from '@/claudinary.js';
import { Readable } from 'stream';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const title = formData.get('title') || "";
    const fileType = formData.get('fileType') || "";
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    
    console.log('Processing file:', file.name, 'Type:', fileType);
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Determine if it's a PDF file
    const isPdf = fileType === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: '403notes', // custom folder for CS403 uploads
          allowed_formats: ['jpg', 'png', 'pdf'],
          resource_type: isPdf ? 'raw' : 'image', // Use raw for PDFs, image for images
          context: `title=${title}`, // Store the title as metadata in Cloudinary
          public_id: `${Date.now()}_${title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}`, // Create a unique URL-friendly public_id
          // Add flags for content disposition
          ...(isPdf && { 
            access_mode: 'public',
            display_name: title,
            // Setting attachment: false tells Cloudinary to display in browser rather than download
            attachment: false 
          })
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      
      Readable.from(buffer).pipe(uploadStream);
    });
    
    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      title: title, // Include the title in the response
      type: isPdf ? 'pdf' : 'image', // to help when rendering on feed
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}