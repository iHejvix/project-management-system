import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import {Button} from "@/components/ui/button.jsx";
import {TrashIcon} from "@radix-ui/react-icons";
import {useDispatch} from "react-redux";
import {deleteComment, fetchComments} from "@/redux/commentSlice.js";
import {useParams} from "react-router-dom";
import {useEffect} from "react";

export function CommentCard({commentDetails}) {
    const {issueId} = useParams();
    const dispatch = useDispatch();
    function handleDelete() {
        dispatch(deleteComment(commentDetails.id));
    }
    
    return (
        <div className="flex justify-between">
            <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarFallback>H</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <p>{commentDetails.user?.fullName}</p>
                    <p>{commentDetails?.content}</p>
                </div>

                <div>
                    <Button variant="ghost" size="icon" className="rounded-full" onClick={handleDelete}>
                        <TrashIcon/>
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default CommentCard;
