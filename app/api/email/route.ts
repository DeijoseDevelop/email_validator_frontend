import axios, { AxiosResponse } from "axios";
import { NextResponse } from "next/server";

export const POST = async (req: Request): Promise<NextResponse> => {
    try {
        const data = await req.json();

        const response: AxiosResponse = await axios.post(
            `${process.env.BACKEND_URL}/email/validate/email/`,
            JSON.stringify(data),
            {
                headers: {
                    'Content-Type': 'application/json',
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
