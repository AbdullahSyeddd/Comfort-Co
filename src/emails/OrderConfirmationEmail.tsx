interface EmailOrderItem {
  title: string;
  price: number;
  quantity: number;
  size: string;
  imageUrl: string;
}

interface OrderConfirmationEmailProps {
  orderId: number;
  items: EmailOrderItem[];
  total: number;
  shippingName: string;
  shippingAddress: string;
  shippingApartment: string | null;
  shippingCity: string;
  shippingState: string | null;
  shippingZip: string;
  shippingCountry: string;
}

export default function OrderConfirmationEmail({
  orderId,
  items,
  total,
  shippingName,
  shippingAddress,
  shippingApartment,
  shippingCity,
  shippingState,
  shippingZip,
  shippingCountry,
}: OrderConfirmationEmailProps) {
  return (
    <div style={{ backgroundColor: "#fdfcfa", padding: "40px 0", fontFamily: "Georgia, 'Times New Roman', serif" }}>
      <div style={{ maxWidth: 560, margin: "0 auto", backgroundColor: "#ffffff", borderRadius: 16, overflow: "hidden", border: "1px solid #e7e5e4" }}>
        <div style={{ padding: "32px 40px", borderBottom: "1px solid #e7e5e4" }}>
          <p style={{ margin: 0, fontSize: 22, color: "#1c1917" }}>
            Comfort <em style={{ color: "#ab7333" }}>and Co</em>
          </p>
        </div>

        <div style={{ padding: "32px 40px" }}>
          <p style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#ab7333", margin: "0 0 8px" }}>
            Order Confirmed
          </p>
          <h1 style={{ fontSize: 24, color: "#1c1917", margin: "0 0 16px", fontWeight: 500 }}>
            Thank you for your order, {shippingName.split(" ")[0]}!
          </h1>
          <p style={{ fontSize: 14, color: "#78716c", lineHeight: 1.6, margin: "0 0 24px", fontFamily: "Arial, sans-serif" }}>
            We&apos;ve received order <strong>#{orderId}</strong> and it&apos;s being prepared. You&apos;ll pay via
            Cash on Delivery when it arrives.
          </p>

          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Arial, sans-serif" }}>
            <tbody>
              {items.map((item, i) => (
                <tr key={i} style={{ borderTop: "1px solid #f5f5f4" }}>
                  <td style={{ padding: "12px 0", fontSize: 14, color: "#1c1917" }}>
                    {item.title}
                    <br />
                    <span style={{ fontSize: 12, color: "#a8a29e" }}>
                      {item.size} &middot; Qty {item.quantity}
                    </span>
                  </td>
                  <td style={{ padding: "12px 0", fontSize: 14, color: "#1c1917", textAlign: "right" }}>
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
              <tr style={{ borderTop: "2px solid #e7e5e4" }}>
                <td style={{ padding: "12px 0", fontSize: 15, fontWeight: "bold", color: "#1c1917" }}>Total</td>
                <td style={{ padding: "12px 0", fontSize: 15, fontWeight: "bold", color: "#1c1917", textAlign: "right" }}>
                  Rs. {total.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>

          <div style={{ marginTop: 28, padding: 20, backgroundColor: "#fbf5ec", borderRadius: 12, fontFamily: "Arial, sans-serif" }}>
            <p style={{ margin: "0 0 6px", fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "#8f5c29" }}>
              Shipping to
            </p>
            <p style={{ margin: 0, fontSize: 14, color: "#44403c", lineHeight: 1.6 }}>
              {shippingName}
              <br />
              {shippingAddress}
              {shippingApartment ? `, ${shippingApartment}` : ""}
              <br />
              {shippingCity}
              {shippingState ? `, ${shippingState}` : ""} {shippingZip}
              <br />
              {shippingCountry}
            </p>
          </div>
        </div>

        <div style={{ padding: "20px 40px", backgroundColor: "#fafaf9", fontFamily: "Arial, sans-serif" }}>
          <p style={{ margin: 0, fontSize: 12, color: "#a8a29e" }}>
            &copy; {new Date().getFullYear()} Comfort and Co. Questions? Reply to this email.
          </p>
        </div>
      </div>
    </div>
  );
}
