import { RemoveType } from "@/types/remove";
import { get, post, put } from "@/lib/request";
import { BizCode, PointChangeTypeEnum, TaskState } from "@/lib/type";

/**
 * 请求支付接口
 */
interface PayApiParams {
  packageId: string; // 套餐ID
}
interface PayApiResData {
  payLink: string; // 支付链接
}

export const payApi = async (params: PayApiParams) => {
  const res = await post<PayApiResData>("/pay", params);
  return res.data;
};

/**
 * stripe支付事件监听
 */
interface StripeEventApiParams {
  
}
interface StripeEventApiResData {
  
}

export const stripePayEventApi = async (params: StripeEventApiParams) => {
  return post<StripeEventApiResData>("/pay/v1/stripe/webhook", params);
};


/**
 * 文件上传
 */
interface UploadFileApiParams {
  file: File; // 文件
  bizCode: BizCode; // 业务类型
  fileType?: string; // 文件类型
}
interface UploadFileApiResData {
  url: string; // 文件url
}

export const uploadFileApi = async (params: UploadFileApiParams) => {
  const signRes = await post<{signedUrl: string}>("/file/v1/gen_pre_signed_url", {bizCode: params.bizCode, fileType: params.fileType});
  if (signRes.code !== 0) {
    return signRes;
  }
  return put<UploadFileApiResData>(
    signRes.data.signedUrl,
    params.file,
    {
      headers: {
        "Content-Type": "application/octet-stream",
      },
    }
  );
};


/**
 * 提交去水印任务
 */
type SubmitRemoveApiParamsAuto = {
  type: RemoveType.AUTO;
  fileUrl: string;
}
type SubmitRemoveApiParamsManual = {
  type: RemoveType.MANUAL;
  fileUrl: string;
  maskUrl: string;
}
type SubmitRemoveApiParams = SubmitRemoveApiParamsAuto | SubmitRemoveApiParamsManual;
interface SubmitRemoveApiResData {
  taskId: string;
}

export const submitRemoveApi = async (params: SubmitRemoveApiParams) => {
  return post<SubmitRemoveApiResData>("/task/v1/submit/drop_mark", params);
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
  result: any;
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
export const loginApi = async (params: LoginApiParams) => {
  return post<LoginApiResData>("/user/v1/login", params);
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
type GetPackageListApiResData = {
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
  pointChangeTypeEnum: PointChangeTypeEnum;
  bizCode: BizCode;
}
type GetPointConsumptionRecordApiResData = {
  pageNum: number;
  pageSize: number;
  total: number;
  list: {
    id: string;
    bizCode: BizCode;
    usedPoint: number;
    createTime: string;
  }[];
}
export const getPointConsumptionRecordApi = async (params: GetPointConsumptionRecordApiParams) => {
  return get<GetPointConsumptionRecordApiResData>("/point_change_log/v1/list_point_change_log", params);
};
