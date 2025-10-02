// import { AccessKeyType } from "@/constants/enum/configCommonType";
// import { util } from "@/utils/util";

// type Method = "GET" | "POST" | "PUT" | "DELETE";

// interface RequestOptions {
//     body?: any;
//     headers?: Record<string, string>;
// }

// const REQUEST_URL = process.env.NEXT_PUBLIC_API_IMACHINE_URL;

// async function request<T>(
//     endpoint: string,
//     method: Method,
//     options: RequestOptions = {}
// ): Promise<T> {
//     const ACCESS_KEY_TYPE = AccessKeyType.IMACHINE;
//     const { accessKey, signature, timestamp } = util.api.createKey( method, ACCESS_KEY_TYPE, endpoint );
    
//     const res = await fetch(`${REQUEST_URL}${endpoint}`, {
//         method,
//         headers: {
//             "Content-Type": "application/json; charset=UTF-8",
//             "Charset": "UTF-8",
//             "x-ejapi-access-key": accessKey,
//             "x-ejapi-signature": signature,
//             "x-ejapi-timestamp": timestamp,
//             // ...(options.headers || {}),
//         },
//         body: options.body ? JSON.stringify(options.body) : undefined,
//     });
    
//     console.log(`${ method } 호출 결과: `, `${ res }`)
//     if (!res.ok) {
//         const text = await res.text();
//         throw {
//             message: `외부 API 실패: ${res.status}`,
//             data: text,
//             statusCode: res.status,
//         };
//     }

//     return (await res.json()) as T;
// }

// export const serverClient = {
//     get: <T>(endpoint: string, headers?: Record<string, string>) =>
//         request<T>(endpoint, "GET", { headers }),
//     post: <T>(endpoint: string, body: any, headers?: Record<string, string>) =>
//         request<T>(endpoint, "POST", { body, headers }),
//     put: <T>(endpoint: string, body: any, headers?: Record<string, string>) =>
//         request<T>(endpoint, "PUT", { body, headers }),
//     delete: <T>(endpoint: string, headers?: Record<string, string>) =>
//         request<T>(endpoint, "DELETE", { headers }),
// };