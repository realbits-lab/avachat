"use client";
import React from "react";

import Link from "next/link";
import Image from "next/image";
import Typewriter from "react-ts-typewriter";

import AvatarView from "@/src/app/chat/sample/AvatarView";
import ChatMessage from "@/src/app/chat/sample/ChatMessage";
import BackArrow from "~/assets/svg/BackArrow.svg";
import SendMsg from "~/assets/svg/SendMsg.svg";

export interface ChatHistory {
  id: number;
  nick: string;
  msg: string;
  me: boolean;
  done?: boolean;
}

function getRandomAiMsg(): string {
  const msgs = [
    "저는 100만년 전의 지구로 가고 싶습니다. 그것은 이면의 지구를 보는 것을 포함할 수 있으며, 또한 인간 생명체가 어떤 형태로 존재할 수 있는지 보는 것을 포함할 수 있습니다. 이것은 과학자들이 이를 이해하는 데 매우 유용할 것입니다.",
    `제가 개인적인 경험이나 선호도를 가지고 있지 않기 때문에 이 질문에 대한 정확한 답은 불가능합니다. 그러나 많은 사람들이 그동안 자신의 삶에서 중요하게 여기거나 특별한 순간으로 돌아가고 싶어하는 경향이 있습니다.
어떤 사람들은 자신의 어린 시절로 돌아가서 무엇인가를 다시 경험하고 싶어할 것이고, 다른 사람들은 특별한 순간이나 중요한 결정을 내릴 때로 돌아가서 다른 선택을 해보고 싶어할 수 있습니다. 또는 역사적인 사건이나 유명한 인물들과 만날 수 있는 기회를 가지고 싶어하는 사람도 있을 것입니다.
여러분 스스로에게 이 질문을 던져보고, 어떤 순간이나 경험으로 돌아가고 싶은지에 대해 생각해보는 것도 흥미로울 수 있습니다.`,
    `세계 평화를 위한 노력은 모든 사람의 참여와 협력이 필요한 복잡한 프로세스입니다. 각자가 속한 지역과 사회에서 가능한 작은 규모의 노력부터 시작하여 전 세계적인 차원에서의 노력을 통해 세계 평화를 구축하는 데 기여할 수 있습니다.`,
    "죄송합니다만, 현재는 실시간으로 외부 정보에 접근할 수 있는 능력이 제한되어 있어서 날씨 정보를 제공할 수 없습니다. 날씨 정보는 지역에 따라 다르며, 정확한 정보를 얻으려면 현지 기상청이나 기상 서비스를 확인하는 것이 좋습니다. 인터넷 검색 엔진이나 날씨 앱을 통해서도 간단히 현재 날씨와 내일의 날씨를 확인할 수 있습니다.",
    "하늘에는 구름이 떠다니고, 고양이는 여전히 귀여워 보이며, 바다 소리는 파도 소리처럼 여전히 고요하게 들립니다. 아마도 오늘은 어딘가에서 누군가가 팬케이크를 뒤집으며 조리하고 있을 것이고, 어느 곳에서는 누군가가 무언가를 마스터하려고 노력하고 있을 것입니다. 그리고 혹시나 모르니까, 오늘은 전 세계에서 수많은 물방울이 하늘에서 떨어져 왔을지도 모릅니다. 이런 일상적이고 쓸데없는 이야기가 마음을 가볍게 만들어줄 수 있겠죠?",
    "한 마리 펭귄이 어떤 사업 아이디어를 생각하고 있다고 들었어요. 그 펭귄은 '얼음 파는 회사'를 창업하고자 하는데, 모든 거래를 얼음판에서 진행할 생각이라고 합니다. 고객이 상품을 선택하면 펭귄이 손으로 얼음을 떼어내어 계산대에 놓아주는 식이라고 하더라구요. 어쩌면 차가운 사업이지만, 아이디어의 신선함에 누군가는 끌릴지도 모르겠어요!",
    "길가에 한 마리 다람쥐가 나무에서 내려와서 어떤 비밀 결사를 구성하고 있다는 소문이 있어요. 그 다람쥐들은 푸른 모자를 쓰고 비밀 모임을 열며 어떻게 더 많은 도토리를 확보할지에 대해 논의한다고 합니다. 그들은 다람쥐 사회에 혁명을 일으키려는 듯한데, 정확히 어떤 계획을 세우고 있는지는 아무도 모른다고 해요. 아마도 다람쥐들의 비밀은 계속해서 우리를 궁금하게 만들 것 같아요!",
    '얼룩말은 길게 늘어진 목이 있기 때문에 목욕하기가 꽤나 번거로운 일이라고 합니다. 그래서 얼룩말들은 대개 친구들끼리 모여서 "목욕 차례"를 가지고, 서로의 등을 손으로 긁어 주면서 도움을 주곤 한다고 해요. 그런데 목욕이 끝나면 다들 풀밭에서 함께 편히 눕고 낮잠을 자곤 하는데, 그 모습을 보면 얼룩말들도 또한 인간과 다르지 않은 일상을 즐기는구나 싶어 좀 신기할 것 같아요!',
    "인어들이 바닷속에서 음악을 즐긴다고 합니다. 바닷속에서는 물속을 통해 소리가 더 잘 전달되기 때문에 인어들은 특별한 음악 회사를 만들어 해저에서 콘서트를 열고 있다고 하더라구요. 물고기들이 리듬에 맞춰 춤추고, 조개들이 자연스럽게 리듬 악기 역할을 하는 것으로 전해져요. 심지어는 해저 도시에서는 음악 장르도 다양하게 존재하는데, 클래식 해바라기, 레게 물고기, 심해펑크 등이 유명하다고 하더라고요!",
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
est laborum.`,
    "웹 서핑을 하다보면, 그래픽 디자인이나 타이포그래피 그리고 웹 템플릿 등을 통해 흔히 만나볼 수 있습니다. 하지만 로렘입숨의 의미나 용도를 정확히 알지는 못했는데, 갑자기 궁금하더라구요.",
  ];

  return msgs[Math.floor(Math.random() * msgs.length)];
}

const defaultChatHistory: ChatHistory[] = [
  {
    id: 1,
    nick: "AI Avatar 123",
    msg: `Hi, I’m Elon. I’m interested in saving humans from themselves.`,
    me: false,
    done: false,
  },
];

function OtherBubble(props: { chat: ChatHistory; onFinish: () => void }) {
  return (
    <div className="yu">
      <div className="body">
        <div className="nick max1line">{props.chat.nick}</div>
        <div className="arw"></div>
        <div className="flex">
          <div className="msg">
            {props.chat.done ? (
              props.chat.msg
            ) : (
              <Typewriter
                text={props.chat.msg}
                speed={5}
                random={3}
                onFinished={props.onFinish}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MyBubble(props: { chat: ChatHistory }) {
  return (
    <div className="me flex flex-row justify-end">
      <div className="body flex flex-col">
        <div className="nick">{props.chat.nick}</div>
        <div className="flex flex-row">
          <div className="flex">
            <div className="msg">{props.chat.msg}</div>
          </div>
          <div className="arw"></div>
        </div>
      </div>
      <div className="Avt flex justify-center items-center">PH</div>
    </div>
  );
}

enum ChatReduces {
  AddUserMsg,
  AddAiMsg,
  AiTypeDone,
}

type ChatReduceAct = {
  cmd: ChatReduces;
  msg?: string;
  id?: number;
};

function reducer(state: ChatHistory[], action: ChatReduceAct): ChatHistory[] {
  //console.log("reducerChat:", action);
  switch (action.cmd) {
    case ChatReduces.AddUserMsg:
      return [
        ...state,
        {
          id: state.length + 1,
          nick: "Guest 1234",
          msg: action.msg!,
          me: true,
        } as ChatHistory,
      ];

    case ChatReduces.AddAiMsg:
      return [
        ...state,
        {
          id: state.length + 1,
          nick: "AI Avatar 123",
          msg: action.msg!,
          me: false,
          done: false,
        } as ChatHistory,
      ];

    case ChatReduces.AiTypeDone:
      return state.map((c) => {
        if (c.id === action.id) {
          c.done = true;
        }
        return c;
      });

    default:
      console.error("Invalid ChatReduces", action.cmd);
  }

  console.error("reducer not handled.");
  return state;
}

export default function ChatHome() {
  const refBottom = React.useRef<HTMLDivElement>(null);
  const [inputMsg, setInputMsg] = React.useState("");
  const [isBlocked, setIsBlocked] = React.useState(false);
  const [chatHist, dispatch] = React.useReducer(reducer, defaultChatHistory);

  const onSendMsg = React.useCallback(() => {
    if (inputMsg && !isBlocked) {
      setIsBlocked(true);
      dispatch({ cmd: ChatReduces.AddUserMsg, msg: inputMsg });
      setTimeout(() => {
        dispatch({ cmd: ChatReduces.AddAiMsg, msg: getRandomAiMsg() });
      }, 700);
      setInputMsg("");
    }
  }, [inputMsg, isBlocked]);

  const scrollBottom = () => {
    refBottom.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  React.useEffect(() => {
    if (chatHist.length) {
      scrollBottom();
      setTimeout(scrollBottom, 750);
    }
  }, [chatHist.length]);

  const setAvatarExpressionFuncRef = React.useRef();
  const setTalkFuncRef = React.useRef();
  const getImageDataUrl = React.useRef();
  const getMediaStreamFuncRef = React.useRef();
  const setAvatarPositionFuncRef = React.useRef();
  const AVACHAT_MODE = "avachat";
  const avatarUrl =
    "https://dulls-nft.s3.ap-northeast-2.amazonaws.com/vrm/1.vrm";
  const THOTHY_SAMPLE_BOT_ID = "00249ecb-5322-4278-af01-c3ddc10f2971";

  return (
    <div className="talk absolute inset-0 flex flex-col">
      <div className="head flex items-center px-4 bg-white flex-shrink-0">
        <Link href="/chat/home">
          <BackArrow className="mx-4" />
        </Link>
        <div className="text-3xl">AI Character 123</div>
      </div>

      <div className="flex flex-grow">
        <ChatMessage
          setAvatarExpressionFuncRef={setAvatarExpressionFuncRef}
          setTalkFuncRef={setTalkFuncRef}
          botId={THOTHY_SAMPLE_BOT_ID}
        />
        <AvatarView
          showGuideCanvas={false}
          showFrameStats={false}
          useMotionUpdate={false}
          inputGltfDataUrl={avatarUrl}
          getImageDataUrlFunc={getImageDataUrl}
          // VideoChat -> AvatarView call for new Remon.
          // TakeVideo -> AvatarView call for recording video.
          getMediaStreamFunc={getMediaStreamFuncRef}
          // VideoChat -> AvatarView call for changing avatar canvas position.
          // ScreenView -> AvatarView call for changing avatar canvas position.
          setAvatarPositionFunc={setAvatarPositionFuncRef}
          setAvatarExpressionFuncRef={setAvatarExpressionFuncRef}
          setTalkFuncRef={setTalkFuncRef}
          serviceMode={AVACHAT_MODE}
        />
        {/* <div className="overflow-hidden w-[20vw]">
          <Image
            src="/img/avatar_full.png"
            width={315}
            height={855}
            alt="Avatar 123"
            className=""
          />
        </div>
        <div className="flex flex-col flex-grow">
          <div className="flex-grow relative overflow-y-scroll overflow-x-hidden">
            <div className="absolute inset-0 pr-2">
              {chatHist.map((chat, i) => (
                <div className="hst" key={i}>
                  {chat.me ? (
                    <MyBubble chat={chat} />
                  ) : (
                    <OtherBubble
                      key={`o${i}`}
                      chat={chat}
                      onFinish={() => {
                        dispatch({ cmd: ChatReduces.AiTypeDone, id: chat.id });
                        scrollBottom();
                        setIsBlocked(false);
                      }}
                    />
                  )}
                </div>
              ))}
              <div ref={refBottom} className="h-16" />
            </div>
          </div>
          <div className="input-area p-2 flex gap-2">
            <input
              type="text"
              id="chatInput"
              className="flex-grow border rounded-md text-xl p-1"
              placeholder="메세지 입력"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onSendMsg();
                }
              }}
            />
            <button className="" disabled={isBlocked} onClick={onSendMsg}>
              <SendMsg />
            </button>
          </div>
        </div>
        */}
      </div>
    </div>
  );
}
