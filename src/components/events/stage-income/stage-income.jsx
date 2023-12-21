import React, { useState, useEffect } from "react";
import "./stage-income.css";
import Moralis from "moralis";
// require("dotenv").config();
// import dotenv from "dotenv";
// dotenv.config(); // Load environment variables
const ENV = require("./../../../utils/data");
function StageIncome({ ...props }) {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const runApp = async () => {
      if (!Moralis.Core.isStarted)
        await Moralis.start({
          apiKey: ENV.binanceKey,
        });
      const address = ENV.contractAddress; //"0xe184a68428072f0102f073a098af8ee7705519dc";
      const chain = ENV.chainID;
      const topic =
        "0xe655a13ddd4b7f0f56febd549e2d4818002460dad585dd4f7af4ab1d231fa553";
      const abi = {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "_user",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "_partner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "_stage",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_time",
            type: "uint256",
          },
        ],
        name: "stageIncome",
        type: "event",
      };
      let limit = 10000;
      const response = await Moralis.EvmApi.events.getContractEvents({
        address,
        chain,
        limit,
        topic,
        abi,
      });
      console.log(" response.toJSON().result:", response.toJSON().result);
      let datas = response.toJSON().result.map((transaction) => ({
        user: transaction.data._user,
        referrer: transaction.data._partner,
        date: new Date(transaction.data._time * 1000)
          .toISOString()
          .split("T")[0], // Adjust the format as needed
        time: new Date(transaction.data._time * 1000)
          .toTimeString()
          .split(" ")[0],
        level: transaction.data._stage,
        transactionHash: transaction.transaction_hash,
      }));
      setTransactions(datas);
    };
    runApp();
  }, [props.account]);

  const handleLinkClick = (url) => {
    window.open(ENV.baseUrl + url, "_blank");
  };
  const [filter, setFilter] = useState("all");
  const filteredTransactions =
    filter === "all"
      ? transactions.filter(
          (transaction) =>
            transaction.user.toLowerCase() === props.account.toLowerCase()
        )
      : transactions.filter(
          (transaction) =>
            transaction.user === props.account.toLowerCase() &&
            transaction.level == filter
        );
  console.log("Filter Transaction:", filteredTransactions);
  return (
    <div className="PoolIncome-Stage">
      <h1>Transaction History Of Stage Income</h1>
      <div>
        <label>
          Filter by Level:
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </label>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Referrer</th>
              <th>Time</th>
              <th>Level</th>
              <th>Transaction Hash</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.user}>
                <td>{transaction.referrer}</td>
                <td>
                  {transaction.date} <br />
                  {transaction.time}
                </td>
                <td>{transaction.level}</td>
                <td className="scrollable-column">
                  <a
                    onClick={() => handleLinkClick(transaction.transactionHash)}
                    className="transaction-link"
                  >
                    {transaction.transactionHash}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default StageIncome;
