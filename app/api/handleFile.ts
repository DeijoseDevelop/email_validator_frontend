import axios, { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handleFile(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {

        const file = req.body.get('file');
        const formData = new FormData();
        formData.append('excel', file);

        if (file) {
            const response: AxiosResponse = await axios.post(`
                ${process.env.BACKEND_URL}/email/validate/file/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'x-api-key': process.env.BACKEND_API_KEY,
                    }
                }
            );
            const data = await response.data;
            return res.status(response.status).json(data);

        } else {
            return res.status(404).json({"message": "File not found"})
        }

    }

    return res.status(405);

}