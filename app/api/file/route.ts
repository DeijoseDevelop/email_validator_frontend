import axios, { AxiosResponse } from "axios";
import { NextResponse } from "next/server";

export const POST = async (req: Request): Promise<NextResponse> => {
    try {
        const formData: FormData = await req.formData();

        const response: AxiosResponse = await axios.post(
            `${process.env.BACKEND_URL}/email/validate/file/`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-api-key': process.env.BACKEND_API_KEY,
                }
            }
        );

        return NextResponse.json(response.data, {
            status: response.status,
        });
    } catch (error) {
        throw error;
    }
}
