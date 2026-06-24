
import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import {ScrollArea} from "@/components/ui/scroll-area.jsx";
import {Button} from "@/components/ui/button.jsx";
import {PaperPlaneIcon} from "@radix-ui/react-icons";
import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchChatByProjectId, fetchChatMessages, sendMessage} from "@/redux/chatSlice.js";
import {useParams} from "react-router-dom";
import {selectCurrentUser} from "@/redux/authSlice.js";

const ChatBox = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const messages = useSelector((state) => state.chat.messages);
    const userId = useSelector(state=> selectCurrentUser(state).id);
    const {id} = useParams();

    useEffect(() => {
        dispatch(fetchChatMessages(id))
        dispatch(fetchChatByProjectId(id))
    }, [dispatch, id])

    function handleMessageChange(e) {
        setMessage(e.target.value);
    }

    function handleSendMessage() {
        dispatch(sendMessage({
            content: message,
            senderId: userId,
            projectId: id
        }));
        setMessage("");
    }


    return (
        <div className="sticky">
            <div className="border rounded-lg">
                <h1 className="border-b p-5">Chat box</h1>
                <ScrollArea className="h-[40rem] w-full p-5 flex gap-3 flex-col">
                    {messages.map((item, index) => (
                        item.sender.id !== userId ?
                            <div className="flex gap-2 mb-2 justify-start" key={index}>
                                <Avatar>
                                    <AvatarFallback>{item?.sender?.fullName.at(0)}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2 py-2 px-5 border rounded-ss-2xl rounded-e-xl">
                                    <p>{item?.sender?.fullName}</p>
                                    <p className="text-gray-300">{item?.content}</p>
                                </div>
                            </div>
                            :
                            <div className="flex gap-2 mb-2 justify-end" key={index}>
                                <Avatar>
                                    <AvatarFallback>{item?.sender?.fullName.at(0)}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2 px-5 border rounded-se-2xl rounded-s-xl">
                                    <p>{item?.sender?.fullName}</p>
                                    <p className="text-gray-300">{item?.content}</p>
                                </div>
                            </div>
                    ))}
                </ScrollArea>
                <div className="relative py-0">
                    <Input placeholder="What would you like today?" className="py-7 border-t outline-none
                    focus:outline-none focus:ring-0 rounded-none border-b-0 border-x-0" value={message} onChange={handleMessageChange}/>
                    <Button onClick={handleSendMessage} className="absolute right-2 top-3 rounded-full"
                            variant="ghost" size="icon">
                        <PaperPlaneIcon/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

 export default ChatBox