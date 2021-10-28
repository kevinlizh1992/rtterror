import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "../../styles/service.module.css";
import {useState} from "react";
import ServiceCard from "./serviceCard";
import {CardHeader} from "@mui/material";

const ServiceCardRow = (props) => {
  const { item } = props;
  const [serviceCard, setServiceCard] = useState(false );
  const toggleServiceCard =()=>{
      setServiceCard(!serviceCard);
  }
  const blocked = (id) => {
    alert("service id  " + id);
  };

  return (
    <div className={styled.flexAlignContainer}>
      <Card
          // disabled={item["status"] == "blocked"}
        className={styled.cardWrapper}
        onClick={() => {
            toggleServiceCard();
        }}
      >
          <CardHeader>
              {item['name']}
          </CardHeader>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Service Code:<div className={styled.separateVDiv}></div> {item['code']}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Date
          </Typography>
        </CardContent>
      </Card>
      <Button
        className={styled.buttonContainer}
        // disabled={item["status"] == "blocked"}
        //   if we make disable cannot even click to unblock
        variant={item["status"] == "blocked" ? "contained" : "outlined"}
        onClick={() => blocked(item["serviceId"])}
      >
        {item["status"]}
      </Button>
        {serviceCard && <ServiceCard closeServiceCard={toggleServiceCard} open={serviceCard} item={item} />}
    </div>
  );
};
export default ServiceCardRow;