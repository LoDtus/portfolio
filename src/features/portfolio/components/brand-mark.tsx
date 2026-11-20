import Image from "next/image";
import { PROFILE } from "@/features/portfolio/constants/profile.constants";

// Logo của trang (public/logo/longvi.svg). Trang trí: tên đã nằm cạnh logo nên không cần alt.
export default function BrandMark({ className }: { className: string }) {
    return (
        <Image
            src={PROFILE.logo}
            alt=""
            width={512}
            height={512}
            className={className}
        />
    );
}
