import React,{useState,useEffect} from 'react';
import millify from 'millify';
import { Link } from "react-router-dom";
import { Collapse, Row, Col, Typography, Avatar, Button } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/cryptoApi';
import { useGetCryptosQuery } from "../services/cryptoApi";

import Loader from './Loader';
const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = ({simplified}) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  console.log(cryptos)

  if (isFetching) return "Loading....";
  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
         {cryptos?.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange?.uuid}
                showArrow={false}
                header={(
                  <Row key={exchange?.uuid}>
                    <Col span={6}>
                      <Text><strong>{exchange?.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange?.iconUrl} />
                      <Text><strong>{exchange?.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchange?.["24hVolume"])}</Col>
                    <Col span={6}>{millify(exchange?.rank)}</Col>
                    <Col span={6}>{millify(exchange?.change)}%</Col>
                  </Row>
                  )}
              >
                1 {exchange?.name} = {HTMLReactParser(exchange?.btcPrice || '')} BTC
                <Link to={`crypto/${exchange.uuid}`} style={{marginLeft: "10px"}} > Show More</Link>
              </Panel>
            </Collapse>
          </Col>
        ))} 
      </Row>
    </>
  );
};

export default Exchanges;