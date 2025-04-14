import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Define CloudinaryResource type for better type safety
type CloudinaryResource = {
  public_id: string;
  created_at: string;
  secure_url: string;
  [key: string]: any; // for other cloudinary properties
};

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    // Use api.resources instead of search to fix the pattern matching error
    const result = await cloudinary.api.resources({
      resource_type: 'raw',
      type: 'upload',
      max_results: 50
    });

    const resources = result.resources as CloudinaryResource[];

    // Format the resources to match your Document type requirements
    const formattedResources = resources.map(resource => ({
      public_id: resource.public_id,
      filename: resource.public_id.split('/').pop() || resource.public_id,
      created_at: resource.created_at,
      secure_url: resource.secure_url
    }));

    return NextResponse.json(formattedResources);
  } catch (error) {
    console.error('Cloudinary fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
  }
}