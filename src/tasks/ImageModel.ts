import { ImageType } from "./ImageType";

/**
 * 图片结构
 *
 * @author caizhitao
 * @created 2021-01-07 18:37:01
 */
export interface ImageModel {
    /**
     * 图片类型
     */
    type: ImageType;

    /**
     * 图片路径
     */
    filePath: string;
}
