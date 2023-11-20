import Link from "next/link";
import { ChildrenProps } from "~/lib/types";

import MenuHome from "~/assets/svg/MenuHome.svg";
import MenuAvatarList from "~/assets/svg/MenuAvatarList.svg";
import MenuChatList from "~/assets/svg/MenuChatList.svg";
import MenuNftMarket from "~/assets/svg/MenuNftMarket.svg";
import MenuAvatarMake from "~/assets/svg/MenuAvatarMake.svg";
import CircleUser from "~/assets/svg/CircleUser.svg";

export default function ChatLayout(props: ChildrenProps) {
  return (
    <div className="chat">
      <header className="flex justify-between items-center px-4">
        <div className="text-4xl font-extrabold">AI 3D Avatar Chat</div>
        <div>
          <CircleUser />
        </div>
      </header>
      <aside className="text-center">
        <Link href="/chat/home" className="active">
          <button>
            <MenuHome />
          </button>
          <label>홈</label>
        </Link>

        <Link href="#" className="disabled">
          <button>
            <MenuAvatarList />
          </button>
          <label>아바타 리스트</label>
        </Link>

        <Link href="#" className="disabled">
          <button>
            <MenuChatList />
          </button>
          <label>챗팅 리스트</label>
        </Link>

        <Link href="#" className="disabled">
          <button>
            <MenuNftMarket />
          </button>
          <label>NFT 마켓</label>
        </Link>

        <Link href="#" className="disabled">
          <button>
            <MenuAvatarMake />
          </button>
          <label>아바타 만들기</label>
        </Link>
      </aside>
      <main className="relative">{props.children}</main>
    </div>
  );
}
