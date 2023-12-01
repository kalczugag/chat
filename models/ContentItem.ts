import { Schema } from "mongoose";

export interface IContentItem {
    text?: string;
    img?: string;
    file?: any;
    url?: string;
}

export const contentItemSchema = new Schema<IContentItem>({
    text: { required: false, type: String },
    img: { required: false, type: String },
    file: { required: false, type: Schema.Types.Mixed },
    url: { required: false, type: String },
});
