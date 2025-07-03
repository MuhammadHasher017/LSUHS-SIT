import InfoCard from "@/components/common/InfoCard/InfoCard";
import { MultiUserIcon } from "@/utils/icons";
import React from "react";
const OverviewTabContent = ({ record }) => {

  
  const infoCards = [
    {
      title: "Total Patients",
      value: 1250,
      iconComponent: MultiUserIcon,
      
    },
    {
      title: "Total Result",
      value: 200,
      percent: null,
      iconComponent: MultiUserIcon,
    },
    {
      title: "Positive Results",
      value: 40,
      iconComponent: MultiUserIcon,
    },
  ];
  return (

    
    <div>

<div className="info-card-wrapper-patients">
        {infoCards.map((card) => (
            <InfoCard {...card} />
        ))}
      Overview Content for {record?.name || "N/A"}

</div>
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
