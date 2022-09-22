// import "./App.css"
import { API } from "aws-amplify";

const { useState } = require("react");

const myAPI = "apid3de601f";
const path = "/customers";

const App = () => {
  const [input, setInput] = useState("");
  const [customers, setCustomers] = useState([]);

  const getCustomer = (e) => {
    let customerId = e.input;
    API.get(myAPI, path + "/" + customerId)
      .then((res) => {
        console.log(res);
        let newCustomers = [...customers];
        newCustomers.push(res);
        setCustomers(newCustomers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Super Simple React App</h1>
      <div>
        <input
          placeholder="customer id"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <br />
      <button onClick={() => getCustomer({ input })}>
        Get Customer from Backend
      </button>
      <h2 style={{ visibility: customers.length > 0 ? "visible" : "hidden" }}>
        Response
      </h2>
      {customers.map((customer, index) => {
        return (
          <div key={customer.customerId}>
            <span>
              <b>CustomerId:</b> {customer.customerId} - <b>CustomerName</b>:{" "}
              {customer.customerId}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default App;
