import React, { useEffect, useState } from "react";
import { Box, Flex, Button, ButtonGroup, useBreakpointValue , useToast, Heading ,Text } from "@chakra-ui/react";
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

   const toast = useToast();


  useEffect(() => {
    setSelectedPlan(userContext?.subscriptionTier);
  }, [userContext]);


  const fetchPlans = async () => {
    try {
      const response = await fetch(`${BASE_URL}/payments/get_plans`);
      if (response.ok) {
        const data = await response.json();
        console.log(data.plans);
        
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


  const cancelPlanHandling = async () => {
    try {
      const localId = localStorage.getItem("localId");
      const response = await fetch(`${BASE_URL}/payments/cancel-subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localId,
        }),
      });
  
      if (response.ok) {
        // setSelectedPlan("free"); 
        // fetchPlans();
        toast({
          title: "Subscription Canceled",
          description: "Your subscription has been canceled successfully. It will automatically sets to free subscription until your usage is completed for premium or after few days",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Cancellation Failed",
          description: "Failed to cancel the subscription. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while canceling your subscription.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  };
  

  const handlePlanSelection = (plan) => {
    
    if (selectedPlan?.toLowerCase() === plan.toLowerCase()) {
      cancelPlanHandling(); // Call cancel function if the selected plan is already active
    } 
    else {
      selectPlanHandling(plan); 
    }
  };

  return (
    <Box p={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
      <Box mt={0}>
        <Header  />
        <Heading textAlign="center" mt={0} color={theme.textColor}>Unlock the Full Potential of Model Leap</Heading>
        <Text textAlign="center" mt={2} color={theme.textColor}>Ready to elevate your AI experience? Choose the plan that fits your needs and gain access to advanced models, publishable smart bots, and powerful tools. Whether you're scaling your projects or running a business, Model Leap has the perfect plan to help you succeed. 


</Text>
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
                data= {plan.description}
                selected={selectedPlan?.toLowerCase() === plan.value?.toLowerCase()}
                onClick={() => handlePlanSelection(plan)}
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
                description= {plan.description}
                selected={selectedPlan?.toLowerCase() === plan.value?.toLowerCase()}
                onClick={() => handlePlanSelection(plan.value)}
              />
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default Plans;
