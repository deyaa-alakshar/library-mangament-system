import React from "react";
import { Badge, Button } from "@radix-ui/themes";
import { SlBasket } from "react-icons/sl";
import { useRouter } from "next/navigation";

interface IconButtonWithBadgeProps {
  count: number;
}

const Basket: React.FC<IconButtonWithBadgeProps> = ({ count }) => {
  const router = useRouter();
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <Button
        variant="ghost"
        size="2"
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          position: "relative",
          cursor: "pointer",
        }}
        onClick={() => router.push("/dashboard/cart")}
      >
        <SlBasket className="cursor-pointer" size={"25"} color="#937DC299" />
      </Button>
      {count > 0 && (
        <Badge
          style={{
            backgroundColor: "red",
            color: "white",
            borderRadius: "50%",
            width: "18px",
            height: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "bold",
            position: "absolute",
            top: "-5px",
            right: "-5px",
            cursor: "pointer",
          }}
        >
          {count}
        </Badge>
      )}
    </div>
  );
};

export default Basket;
