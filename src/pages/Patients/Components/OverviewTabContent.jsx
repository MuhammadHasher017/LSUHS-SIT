import InfoCard from "@/components/common/InfoCard/InfoCard";
import { MultiUserIcon } from "@/utils/icons";
import React from "react";
const OverviewTabContent = ({ record }) => {

  
  const infoCards = [
    {
      title: "Total Patients",
      value: 1250,
      trendDirection: "up",
      percent: null,
      userCount: '52',
      iconComponent: MultiUserIcon,
      
    },
    {
      title: "Total Result",
      value: 200,
      trendDirection: "up",
      percent: null,
      iconComponent: MultiUserIcon,
    },
    {
      title: "Positive Results",
      value: 40,
      trendDirection: "down",
      percent: null,
      iconComponent: MultiUserIcon,
    },
  ];
  return (

    
    <div>

        {infoCards.map((card) => (
          <div key={card.title}>
            <InfoCard {...card} />
          </div>
        ))}
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
      <br />
      Overview Content for {record?.name || "N/A"}
    </div>
  );
};
export default OverviewTabContent;
