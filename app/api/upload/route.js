// app/api/upload/route.js
import { NextResponse } from 'next/server';
import cloudinary from '@/cloudinary.js';
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
    
    // Create a unique, URL-friendly ID
    const fileId = `${Date.now()}_${(title || file.name).replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}`;
    
    // Basic upload options
    const uploadOptions = {
      folder: '403notes',
      public_id: fileId,
      context: `title=${title || file.name}`
    };
    
    // For PDFs, we need special handling
    if (isPdf) {
      uploadOptions.resource_type = 'raw'; // Use raw for PDFs
      uploadOptions.format = 'pdf';
      uploadOptions.type = 'upload';
    }
    
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
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
      title: title || file.name,
      type: isPdf ? 'pdf' : 'image',
      created_at: new Date().toISOString()
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
}