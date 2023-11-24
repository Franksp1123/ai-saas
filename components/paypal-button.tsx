import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface ProductProps {
  hanldeApprove: Function;
  handleError: Function;
}

export const PaypalButton = ({ hanldeApprove, handleError }: ProductProps) => {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test";

  const createSubscription = (data: any, actions: any) => {
    return actions.subscription.create({
      plan_id: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID,
    });
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        // components: "buttons",
        intent: "subscription",
        vault: true,
      }}
    >
      <PayPalButtons
        className="w-full"
        style={{
          layout: "vertical",
          height: 38,
          tagline: false,
          shape: "pill",
        }}
        createSubscription={createSubscription}
        onApprove={(data) => hanldeApprove(data.subscriptionID)}
        onError={(err: any) => {
          handleError(err);
          console.error("PayPal Checkout onError", err);
        }}
      />
    </PayPalScriptProvider>
  );
};
