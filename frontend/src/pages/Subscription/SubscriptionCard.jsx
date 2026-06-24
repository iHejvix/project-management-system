import {Button} from "@/components/ui/button.jsx";

export function SubscriptionCard({data}) {
    return (
        <div className="rounded-xl bg-[1b1b1b] bg-opacity-20 shadow-[#14173b] shadow-2xl card p-5 space-y-5 w-[18rem]">
            <p>{data.planName}</p>
            <p>
                <span>{data.price} </span>
                <span>{data.planType}</span>
            </p>

            <Button className="w-full">
                {data.buttonName}
            </Button>
        </div>
    )
}

export default SubscriptionCard;