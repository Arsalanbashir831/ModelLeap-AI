import React, { useState } from "react";
import { Box, SimpleGrid, Heading, Switch, Flex, Text } from "@chakra-ui/react";
import Header from "../../Components/Dashboard/Header";
import BillingCard from "../../Components/Dashboard/BillingCard";

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState("free"); 

  const plans = [
    {
      id: "free",
      title: "Free-Tier",
      price: "Free",
      features: [
        "Limited access to over 100 AI Models over API",
        "Limited token usage",
        "Limited AI Playground model selection",
      ],
    },
    {
      id: "startup",
      title: "Start-Up",
      price: "$4.99 / week",
      features: [
        "10 Million AI/ML Tokens or 1K images",
        "Pro models available in the AI playground",
        "Serverless access to over 100 AI Models",
      ],
    },
    {
      id: "custom",
      title: "Custom",
      price: "$14.70 / week",
      features: [
        "Serverless access to over 100 AI Models",
        "Pro models available in the AI playground",
        "30 million tokens or 3K images",
      ],
    },
  ];

  return (
    <Box p={6}>
        <Box mt={5}>

      <Header title={"Plans"} />
        </Box>

      <SimpleGrid mt={12} columns={{ base: 1, md: 3 }} spacing={6}>
        {plans.map((plan) => (
          <BillingCard
            key={plan.id}
            title={plan.title}
            price={plan.price}
            features={plan.features}
            selected={selectedPlan === plan.id}
            onClick={() => setSelectedPlan(plan.id)}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Plans;
