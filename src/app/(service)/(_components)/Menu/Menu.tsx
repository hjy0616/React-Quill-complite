import Link from "next/link";
import { BiFile, BiConversation } from "react-icons/bi";
import { RiHome2Line } from "react-icons/ri";
import { HiOutlineUser } from "react-icons/hi2";

export default function MenuBar() {
  return (
    <div>
      <button>
        <Link href="/">
          <RiHome2Line />홈
        </Link>
      </button>
      <button>
        <Link href="/boards/contents">
          <BiFile />
          콘텐츠
        </Link>
      </button>
      <button>
        <Link href="/chat">
          <BiConversation />
          채팅
        </Link>
      </button>
      <button>
        <Link href="/mypage">
          <HiOutlineUser />내 페이지
        </Link>
      </button>
    </div>
  );
}
