import React, { useEffect, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import Header from "../../Components/Dashboard/Header";
import BillingCard from "../../Components/Dashboard/BillingCard";
import { BASE_URL } from "../../Constants";
import useUserData from "../../hooks/useUserData";
import userState from "../../atoms/userState";
import { useRecoilValue } from "recoil";

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [plans, setPlans] = useState([]);
  const userContext = useRecoilValue(userState);

  useEffect(() => {
    setSelectedPlan(userContext?.subscriptionTier);
  }, [userContext]);

  const fetchPlans = async () => {
    try {
      const response = await fetch(`${BASE_URL}/payments/get_plans`);
      if (response.ok) {
        const data = await response.json();
        setPlans(data.plans);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const selectPlanHandling = async (plan) => {
    try {
      const localId = localStorage.getItem("localId");
      const response = await fetch(`${BASE_URL}/payments/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: plan,
          userId: localId,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        window.open(data.id, '_blank');
        // window.location.href=data.id
        console.log(data); // Handle the response or redirect to the checkout URL if needed
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box p={{ base: 4, md: 6 }}>
      <Box mt={5}>
        <Header title="Plans" />
      </Box>

      <SimpleGrid
        mt={12}
        columns={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 4, md: 6 }}
        p={4}
      >
        {plans?.map((plan) => (
          <BillingCard
            key={plan.id}
            title={plan.name}
            price={plan.price}
            features={plan.features}
            selected={selectedPlan === plan.value}
            onClick={() => selectPlanHandling(plan.value)} // Pass the plan value to handle subscription
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Plans;
