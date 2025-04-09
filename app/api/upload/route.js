
import nextConnect from 'next-connect';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../../lib/cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'next_uploads', // optional
    allowed_formats: ['jpg', 'png', 'pdf'],
  },
});

const upload = multer({ storage });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Something went wrong: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post((req, res) => {
  res.status(200).json({
    url: req.file.path,
    public_id: req.file.filename,
  });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
