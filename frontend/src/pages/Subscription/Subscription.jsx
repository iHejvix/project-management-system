import {Sub} from "@radix-ui/react-dropdown-menu";
import SubscriptionCard from "@/pages/Subscription/SubscriptionCard.jsx";

function Subscription() {

    return (
        <div className="p-10">
            <h1 className="text-5xl font-semibold py-5 pb-16 text-center">Pricing</h1>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-9">

                {[["free", "FREE"], ["Monthly Paid Plan", "MONTHLY"],
                    ["Annual Paid Plan", "ANNUALLY"]].map((item) => (
                    <SubscriptionCard key={item} data={{
                        planName: item[0],
                        planType: item[1],
                        price: 0,
                        buttonName: true ? "Current Plan" : "Get Started"
                    }
                    } />
                ))}
            </div>
        </div>
    )
}

export default Subscription