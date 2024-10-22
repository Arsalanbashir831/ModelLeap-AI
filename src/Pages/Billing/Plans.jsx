import React, { useEffect, useState } from "react";
import { Box, SimpleGrid, Flex, useBreakpointValue } from "@chakra-ui/react";
import Header from "../../Components/Dashboard/Header";
import BillingCard from "../../Components/Dashboard/BillingCard";
import { BASE_URL } from "../../Constants";
import userState from "../../atoms/userState";
import { useRecoilValue } from "recoil";

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [plans, setPlans] = useState([]);
  const userContext = useRecoilValue(userState);
  const isMobile = useBreakpointValue({ base: true, md: false }); // Check if it's mobile

  useEffect(() => {
    setSelectedPlan(userContext?.subscriptionTier);
  }, [userContext]);
// console.log(userContext.subscriptionTier);

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
        window.open(data.id, "_blank");
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

      {isMobile ? (
        // For mobile screens, make it horizontally scrollable
        <Flex
          mt={12}
          overflowX="auto"
          whiteSpace="nowrap"
          gap={4}
          p={4}
          pb={8} // Adds extra space for touch scrolling
        >
          {plans?.map((plan) => (
            <Box
              key={plan.id}
              display="inline-block"
              minW={['auto',"250px"]}
              mr={4} // Adds spacing between cards
            >
              <BillingCard
                title={plan.name}
                price={plan.price}
                features={plan.features}
                selected={selectedPlan === plan.value}
                onClick={() => selectPlanHandling(plan.value)}
              />
            </Box>
          ))}
        </Flex>
      ) : (
        // For larger screens, use the grid layout
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
              selected={  selectedPlan?.toLowerCase() === plan.value?.toLowerCase()}
              onClick={() => selectPlanHandling(plan.value)}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Plans;
