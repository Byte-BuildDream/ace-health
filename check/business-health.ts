import axios from "axios"
import { sendFeishuCard } from '../src/utils/sendCard';
import { createNotifyCard } from '../src/cards/notify';
interface resbody {
    "status": string
    "health_score": number,
    "response_time_ms": number,
    "failed_functions": null
}




export async function sendCardForBusinessHealth(res : string) {
     const card = createNotifyCard({
                title: '⚠️警告',
                content: `前端与数据库CRUD出现异常错误: **${res}**\n时间 ${new Date().toLocaleString()} `,
                atMobiles: ['<at id=all>'], // 替换为你想@的人手机号
                color: 'red',
    });

    await sendFeishuCard(card);
}


export async function health(url: string): Promise<resbody> {

    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            sendCardForBusinessHealth("获取数据失败");
            console.error("Axios 请求失败:", error.message);
            throw new Error(`请求失败: ${error.message}`);
        }
        sendCardForBusinessHealth("获取数据失败");
        console.error("未知错误:", error);
        throw error;
    }
}




export async function main() {
    try {
        const result = await health('http://playace.cn/api/business-health');
        console.log("获取到的数据:", result);
        if (result.status === "healthy") {
            console.log("业务健康状态正常");
        } else {
            sendCardForBusinessHealth("无法访问业务API");
        
        }
    } catch (e) {
        console.error("主函数错误:", e.message);
    }


}

main();