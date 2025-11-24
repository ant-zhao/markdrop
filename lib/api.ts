import { RemoveType } from "@/types/remove";
import { get, post, put } from "@/lib/request";
import { BizCode, PointChangeTypeEnum, TaskState } from "@/lib/type";

/**
 * 请求支付接口
 */
interface PayApiParams {
  packageId: number; // 套餐ID
}
interface PayApiResData {
  payLink: string; // 支付链接
}

export const payApi = async (data: PayApiParams) => {
  return post<PayApiResData>("/pay/v1/stripe/pay", data);
};

/**
 * stripe支付事件监听
 */
interface StripeEventApiParams {
  
}
interface StripeEventApiResData {
  
}

export const stripePayEventApi = async (data: StripeEventApiParams) => {
  return post<StripeEventApiResData>("/pay/v1/stripe/webhook", data);
};


/**
 * 文件上传
 */
interface UploadFileApiParams {
  file: File; // 文件
  bizCode: BizCode; // 业务类型
  fileSuffix?: string; // 文件类型
}
interface UploadFileApiResData {
  url: string; // 文件url
}

export const uploadFileApi = async (params: UploadFileApiParams) => {
  const signRes = await post<{signedUrl: string}>("/file/v1/gen_pre_signed_url", {
    bizCode: params.bizCode,
    fileSuffix: params.fileSuffix,
  });
  if (signRes.code !== 10000) {
    return {
      code: signRes.code,
      message: "Image uploaded failed",
    };
  }
  try {
    await put<UploadFileApiResData>(
      signRes.data.signedUrl,
      params.file,
      {
        headers: {
          "Content-Type": "application/octet-stream",
        },
      }
    );
    return {
      code: 10000,
      url: signRes.data.signedUrl.split("?")[0],
      message: "Image uploaded successfully",
    }
  } catch (error) {
    return {
      code: 500,
      message: "Image uploaded failed",
    }
  }
};


/**
 * 提交去水印任务
 */
type SubmitRemoveApiParamsAuto = {
  type: RemoveType.AUTO;
  imageUrl: string;
}
type SubmitRemoveApiParamsManual = {
  type: RemoveType.MANUAL;
  imageUrl: string;
  maskUrl: string;
}
type SubmitRemoveApiParams = SubmitRemoveApiParamsAuto | SubmitRemoveApiParamsManual;
interface SubmitRemoveApiResData {
  taskId: string;
}

export const submitRemoveApi = async ({bizCode, ...params}: SubmitRemoveApiParams & {bizCode: BizCode}) => {
  return post<SubmitRemoveApiResData>("/task/v1/submit", {
    bizCode,
    taskParam: params
  });
};

/**
 * 获取任务状态
 */
type GetTaskStatusApiParams = {
  taskId: string;
}
type GetTaskStatusApiResData = {
  id: string;
  state: TaskState;
  result: string;
}
export const getTaskStatusApi = async (params: GetTaskStatusApiParams) => {
  return get<GetTaskStatusApiResData>("/task/v1/query_task", params);
};


/**
 * 登录接口
 */
type LoginApiParams = {
  idToken: string;
}
type LoginApiResData = {
  accessToken: string;
}
export const loginApi = async (data: LoginApiParams) => {
  return post<LoginApiResData>("/user/v1/login", data);
};


/**
 * 获取用户信息
 */
type GetUserInfoApiResData = {
  id: string;
  googleId: string;
  name: string;
  email: string;
  avatarUrl: string;
  pointBalance: number;
}
export const getUserInfoApi = async () => {
  return get<GetUserInfoApiResData>("/user/v1/get_user_info");
};


/**
 * 获取套餐列表
 */
export type GetPackageListApiResData = {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  credit: number;
}
export const getPackageListApi = async () => {
  return get<GetPackageListApiResData[]>("/package/v1/list");
};


/**
 * 获取积分消耗记录
 */
type GetPointConsumptionRecordApiParams = {
  pageNum: number;
  pageSize: number;
  pointChangeTypeEnum?: PointChangeTypeEnum;
  bizCode?: BizCode;
}
export type PointConsumptionRecordData = {
  id: string;
  bizCode: BizCode;
  usedPoint: number;
  createTime: string;
};
export type GetPointConsumptionRecordApiResData = {
  pageNum: number;
  pageSize: number;
  total: number;
  list: PointConsumptionRecordData[];
}
export const getPointConsumptionRecordApi = async (data: GetPointConsumptionRecordApiParams) => {
  return post<GetPointConsumptionRecordApiResData>("/point_change_log/v1/list_point_change_log", data);
};
