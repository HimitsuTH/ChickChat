import { useEffect, useState } from "react";
import { baseUrl } from "@/lib/service";
import axios from "axios";
import { TUser } from "@/context/AuthContext";
import { TUserChat } from "@/context/ChatContext";

export const useFetchRecipient = (chat: TUserChat, user: TUser) => {
  const [recipient, setRecipient] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const recipientUser = chat?.members?.find(
    (member) => member.userId !== user?.id
  );

  useEffect(() => {
    const getRecipientUser = async () => {
      try {
        if (!recipientUser) {
          return null;
        } else {
          setIsLoading(true);
          const res = await axios.get(
            `${baseUrl}/user/find/${recipientUser.userId}`
          );

          //   console.log(res)

          setRecipient(res.data);

        }
      } catch (err) {
        // setError("Error fetching recipient data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getRecipientUser();
  }, [recipientUser]);

  return { recipient,isLoading };
};
