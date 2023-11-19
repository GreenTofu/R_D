import { concat, first, isEmpty } from "lodash";
import { useState, useEffect, useLayoutEffect, useRef } from "react";

import goalAPI from "api/goalAPI";

const useGoalDiscussion = (goalID, { limit }) => {
  const discussionListRef = useRef(null);
  const lastViewMessageRef = useRef(null);
  const bottomRef = useRef(null);

  const isSentMessage = useRef(false);
  const isLastMessage = useRef(false);
  const newListLength = useRef(null);

  const [discussionList, setDiscussionList] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollToMessage = (ref) => {
    ref.current?.scrollIntoView();
  };

  const fetchMessages = async () => {
    setIsLoading(true);

    const lastViewMessageTimestamp = first(discussionList)?.createdAt;
    const lastViewMessageID = first(discussionList)?.id;

    const response = await goalAPI.getDiscussionList(goalID, {
      limit,
      lastViewMessageTimestamp,
      lastViewMessageID,
    });
    const { rows } = response.data.discussion;

    if (isEmpty(rows)) {
      isLastMessage.current = true;
      setIsLoading(false);
      return;
    }

    const newList = rows.reverse();
    const newDiscussionList = concat(newList, discussionList);

    newListLength.current = newList.length;

    setDiscussionList(newDiscussionList);
  };

  const submitMessage = async (e) => {
    e.preventDefault();

    if (isEmpty(inputMessage)) return;

    const response = await goalAPI.sendMessage(goalID, inputMessage);
    const { rows } = response.data.discussion;

    const newDiscussionList = concat(discussionList, rows);

    isSentMessage.current = true;

    setDiscussionList(newDiscussionList);
    setInputMessage("");
  };

  const handleGetNewMessages = () => {
    const { scrollTop } = discussionListRef.current;

    if (scrollTop !== 0 || isLastMessage.current) return;

    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useLayoutEffect(() => {
    const isInitialFetch = discussionList.length <= limit;

    if (isInitialFetch || isSentMessage.current) {
      scrollToMessage(bottomRef);
      isSentMessage.current = false;
    } else {
      scrollToMessage(lastViewMessageRef);
    }

    setIsLoading(false);
  }, [discussionList]);

  return {
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
  };
};

export default useGoalDiscussion;
