import React, { useEffect, useState } from "react";
import { Box, Flex, Button, ButtonGroup, useBreakpointValue } from "@chakra-ui/react";
import Header from "../../Components/Dashboard/Header";
import BillingCard from "../../Components/Dashboard/BillingCard";
import { BASE_URL } from "../../Constants";
import userState from "../../atoms/userState";
import { useRecoilValue } from "recoil";
import { useTheme } from "../../Themes/ThemeContext";
import { primaryColorOrange } from "../../colorCodes";

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [billingCycle, setBillingCycle] = useState("Monthly"); // Track selected billing cycle
  const userContext = useRecoilValue(userState);
  const isMobile = useBreakpointValue({ base: true, md: false });
   const {theme}=useTheme()
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

  // Update filtered plans based on selected billing cycle
  useEffect(() => {
    const filtered = plans.filter((plan) =>
      billingCycle === "Monthly"
        ? plan.value.includes("Monthly") || plan.value === "free"
        : plan.value.includes("Yearly") || plan.value === "free"
    );
    setFilteredPlans(filtered);
  }, [plans, billingCycle]);

  const selectPlanHandling = async (plan) => {
    try {
      const localId = localStorage.getItem("localId");
      const response = await fetch(`${BASE_URL}/payments/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planType: plan,
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
    <Box p={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
      <Box mt={5}>
        <Header title="Plans" />
      </Box>

      {/* Toggle Button for Monthly and Yearly */}
      <Flex justify="center" mt={8}>
        <ButtonGroup isAttached variant="outline">
          <Button
          color={billingCycle === "Monthly"?primaryColorOrange:theme.textColor}
            colorScheme={billingCycle === "Monthly" ? "purple" : "gray"}
            onClick={() => setBillingCycle("Monthly")}
          >
            Monthly
          </Button>
          <Button
           colorScheme={billingCycle === "Yearly" ? "purple" : "gray"}
            color={billingCycle === "Yearly"?primaryColorOrange:theme.textColor}
            onClick={() => setBillingCycle("Yearly")}
          >
            Yearly
          </Button>
        </ButtonGroup>
      </Flex>

      {isMobile ? (
        // For mobile screens, stack items vertically in a scrollable view
        <Flex
          mt={12}
          overflowX="auto"
          whiteSpace="nowrap"
          gap={4}
          p={4}
          pb={8}
          flexDirection="column"
        >
          {filteredPlans?.map((plan) => (
            <Box key={plan.value} minW="250px" mx="auto">
              <BillingCard
                title={plan.name}
                price={plan.price}
                features={plan.features}
                selected={selectedPlan?.toLowerCase() === plan.value?.toLowerCase()}
                onClick={() => selectPlanHandling(plan.value)}
              />
            </Box>
          ))}
        </Flex>
      ) : (
        // For desktop screens, use centered Flex layout with proper spacing
        <Flex
          mt={12}
          gap={8}
          justifyContent="center"
          wrap="wrap"
          px={4}
        >
          {filteredPlans?.map((plan) => (
            <Box key={plan.value} flex="1 1 300px" maxW="300px" mx="auto">
              <BillingCard
                title={plan.name}
                price={plan.price}
                features={plan.features}
                selected={selectedPlan?.toLowerCase() === plan.value?.toLowerCase()}
                onClick={() => selectPlanHandling(plan.value)}
              />
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default Plans;
