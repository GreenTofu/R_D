import { isEmpty } from "lodash";
import React from "react";

import loadingIcon from "assets/icons/ic-loading.svg";
import MessageIcon from "assets/icons/message.png";
import useGoalDiscussion from "hooks/useGoalDiscussion";

import GoalMessage from "./goalMessage";

const GoalDiscussion = ({ goalID }) => {
  const {
    discussionList,
    inputMessage,
    discussionListRef,
    newListLength,
    lastViewMessageRef,
    bottomRef,
    isLoading,
    setInputMessage,
    handleGetNewMessages,
    submitMessage,
  } = useGoalDiscussion(goalID, { limit: 5 });

  return (
    <div className="relative h-full pt-6">
      {isLoading && (
        <div className="absolute top-0.5 w-full flex justify-center">
          <img
            className="w-7 opacity-30"
            src={loadingIcon}
            alt="loading"
          />
        </div>
      )}

      <div
        className="h-2/3 px-5 overflow-y-scroll"
        ref={discussionListRef}
        onScroll={handleGetNewMessages}
      >
        {discussionList.map((message, index) => (
          <div
            key={message.id}
            ref={
              index === newListLength.current
                ? lastViewMessageRef
                : null
            }
          >
            <GoalMessage messageData={message} />
          </div>
        ))}

        {!isLoading && isEmpty(discussionList) && (
          <div className="flex justify-center mt-5">
            <p className="text-neutral-500 text-xs text-center">
              No goal discussion.
              <br />
              Send your first message!
            </p>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
      <form className="mt-5 px-5" onSubmit={submitMessage}>
        <div className="relative flex items-center">
          <input
            name="message"
            type="text"
            placeholder="Type your message here..."
            className="w-full rounded-md border bg-neutral-150 text-sm pl-3 pr-10 py-2.5 text-[11px]"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button type="submit" className="absolute right-3">
            <img className="w-4 h-4" src={MessageIcon} alt="icon" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default GoalDiscussion;
