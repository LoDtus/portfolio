import type {
    ContactChannelFacts,
    ContactChannelText,
} from "@/features/portfolio/types/portfolio.types";

// Kênh liên hệ theo ngôn ngữ đang xem: nếu nội dung có giá trị riêng (ví dụ địa chỉ không dấu ở bản tiếng Anh)
// thì thay cả chữ hiển thị lẫn chuỗi được sao chép; liên kết (`href`) giữ nguyên.
export function localizeContactChannel(
    channel: ContactChannelFacts,
    text: ContactChannelText,
): ContactChannelFacts {
    if (text.value === undefined) return channel;
    return {
        ...channel,
        value: text.value,
        copyText: channel.copyText === null ? null : text.value,
    };
}
